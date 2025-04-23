const express = require("express");
const path = require("path");
const igdbFunctions = require("./igdb");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});

// API endpoint to get quiz results
app.post("/api/quiz-results", async (req, res) => {
  try {
    const { platform, vibe, genre, multiplayerMode } = req.body;

    const isMultiplayer = multiplayerMode === "Multiplayer";
    const games = await igdbFunctions.getGamesByMultiplayerPreference(
      platform,
      genre,
      isMultiplayer
    );

    // Format results
    const formattedGames = games.map((game) => ({
      name: game.name,
      total_rating: game.total_rating,
      summary: game.summary || "No summary available",
      cover: game.cover
        ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.url
            .split("/")
            .pop()}`
        : null,
    }));

    res.json(formattedGames);
  } catch (error) {
    console.error("Error getting quiz results:", error);
    res.status(500).json({ error: "Failed to fetch game recommendations" });
  }
});

app.get("/api/random-game", async (req, res) => {
  try {
    const randomGame = await igdbFunctions.getRandomIndieGame();

    res.json(randomGame);
  } catch (error) {
    console.error("Error getting random game:", error);
    res.status(500).json({ error: "Failed to fetch random game" });
  }
});
