require("dotenv").config(); //client_id, client_secret, and access_token saved here
const axios = require("axios"); //JS library

// IGDB setup
const IGDB_CONFIG = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  base_url: "https://api.igdb.com/v4",
};

// Indie genre ID
const INDIE_GENRE_ID = 32;

// platform IDs of base platforms
const platformIds = {
  "PlayStation 5": 167,
  PC: 6,
  "Xbox Series X": 169,
  "Nintendo Switch": 130,
  Mobile: [34, 39], // IOS and Android
};

// Genre groupings
const genreGroups = {
  "Action & Adventure": [4, 5], // Action & Adventure
  "RPG & Strategy": [12, 15], // RPG & Strategy
  "Shooter & Fighting": [5, 6], // Shooter & Fighting
  "Puzzle & Casual": [9, 36], // Puzzle & Casual
};

// Individual genre IDs
const genreIds = {
  // Action & Adventure group
  Action: 4,
  Adventure: 5,
  "Hack and Slash": 25,

  // RPG & Strategy group
  RPG: 12,
  Strategy: 15,
  MOBA: 36,
  Tactical: 24,

  // Shooter & Fighting group
  Shooter: 5,
  "First-Person Shooter": 5,
  "Battle Royale": 5,
  Fighting: 6,

  // Puzzle & Casual group
  Puzzle: 9,
  "Board Game": 26,
  "Card Game": 16,
  Racing: 10,
  Platform: 8,
  Casual: 36,
};

// Function to place bias on indie games
function createIndieQuery() {
  return `& (genres = (${INDIE_GENRE_ID}) | (rating_count < 500 & total_rating > 75))`;
}

// Get games based on platform selection
async function getGamesByPlatform(platformName) {
  try {
    // Handler for mobile which has both IOS and Android
    let platformQuery;
    if (platformName === "Mobile") {
      platformQuery = `platforms = (${platformIds[platformName].join()})`;
    } else {
      platformQuery = `platforms = (${platformIds[platformName]})`;
    }

    // Add indie bias to the query
    const indieQuery = createIndieQuery();

    const response = await axios.post(
      `${IGDB_CONFIG.base_url}/games`,
      `fields name, platforms.name, genres.name, total_rating, summary, cover.url;
       where ${platformQuery} ${indieQuery} & total_rating != null;
       sort total_rating desc;
       limit 30;`,
      {
        headers: {
          "Client-ID": IGDB_CONFIG.client_id,
          Authorization: `${IGDB_CONFIG.access_token}`,
        },
      }
    );

    // Test to see if function properly works
    if (response.data && response.data.length > 0) {
      console.log("Games:");
      response.data.forEach((game, i) => {
        console.log(`${i + 1}. ${game.name}`);
      });
    }

    return response.data;
  } catch (error) {
    console.error(`Error getting games for ${platformName}:`, error.message);
    return [];
  }
}

// getGamesByPlatform("PC");

// Get games based on genre group selection
async function getGamesByGenreGroup(platformName, genreGroupName) {
  try {
    const genreGroupIds = genreGroups[genreGroupName];

    // Handler for mobile which has both IOS and Android
    let platformQuery;
    if (platformName === "Mobile") {
      platformQuery = `platforms = (${platformIds[platformName].join()})`;
    } else {
      platformQuery = `platforms = (${platformIds[platformName]})`;
    }

    // Add indie bias to the query
    const indieQuery = createIndieQuery();

    const response = await axios.post(
      `${IGDB_CONFIG.base_url}/games`,
      `fields name, genres.name, platforms.name, total_rating, summary, cover.url;
       where ${platformQuery} & genres = (${genreGroupIds.join()}) ${indieQuery} & total_rating != null;
       sort total_rating desc;
       limit 30;`,
      {
        headers: {
          "Client-ID": IGDB_CONFIG.client_id,
          Authorization: `${IGDB_CONFIG.access_token}`,
        },
      }
    );

    // Test to see if function properly works
    if (response.data && response.data.length > 0) {
      console.log("Games:");
      response.data.forEach((game, i) => {
        console.log(`${i + 1}. ${game.name}`);
      });
    }

    return response.data;
  } catch (error) {
    console.error(`Error getting games for ${genreGroupName}:`, error.message);
    return [];
  }
}

// getGamesByGenreGroup("PC", "Action & Adventure");

// Test function to check the indie bias in results
async function testIndieGameBias(platformName = "PlayStation 5") {
  try {
    const indieQuery = createIndieQuery();

    const response = await axios.post(
      `${IGDB_CONFIG.base_url}/games`,
      `fields name, genres.name, platforms.name, total_rating, involved_companies.company.name;
       where platforms = (${platformIds[platformName]}) ${indieQuery} & total_rating != null;
       sort total_rating desc;
       limit 20;`,
      {
        headers: {
          "Client-ID": IGDB_CONFIG.client_id,
          Authorization: `${IGDB_CONFIG.access_token}`,
        },
      }
    );

    console.log(`Top 20 Indie Games for ${platformName}:`);
    response.data.forEach((game, i) => {
      const genres = game.genres
        ? game.genres.map((g) => g.name).join(", ")
        : "N/A";
      console.log(
        `${i + 1}. ${game.name} (Rating: ${
          game.total_rating
        }) - Genres: ${genres}`
      );
    });

    return response.data;
  } catch (error) {
    console.error(`Error in indie game test:`, error.message);
    return [];
  }
}
// testIndieGameBias();

// Get games based on specific genre selection
async function getGamesBySpecificGenre(platformName, genreName) {
  try {
    const genreId = genreIds[genreName];

    // Handler for mobile which has both IOS and Android
    let platformQuery;
    if (platformName === "Mobile") {
      platformQuery = `platforms = (${platformIds[platformName].join()})`;
    } else {
      platformQuery = `platforms = (${platformIds[platformName]})`;
    }

    // Add indie bias to the query
    const indieQuery = createIndieQuery();

    const response = await axios.post(
      `${IGDB_CONFIG.base_url}/games`,
      `fields name, genres.name, platforms.name, total_rating, summary, cover.url;
       where ${platformQuery} & genres = (${genreId}) ${indieQuery} & total_rating != null;
       sort total_rating desc;
       limit 30;`,
      {
        headers: {
          "Client-ID": IGDB_CONFIG.client_id,
          Authorization: `${IGDB_CONFIG.access_token}`,
        },
      }
    );

    // Test to see if function properly works
    if (response.data && response.data.length > 0) {
      console.log("Games:");
      response.data.forEach((game, i) => {
        console.log(`${i + 1}. ${game.name}`);
      });
    }

    return response.data;
  } catch (error) {
    console.error(`Error getting games for genre ${genreName}:`, error.message);
    return [];
  }
}

// getGamesBySpecificGenre("PC", "Racing");

async function getGamesByMultiplayerPreference(
  platformName,
  genreName,
  isMultiplayer
) {
  try {
    const genreId = genreIds[genreName];

    // Handler for mobile which has both IOS and Android
    let platformQuery;
    if (platformName === "Mobile") {
      platformQuery = `platforms = (${platformIds[platformName].join()})`;
    } else {
      platformQuery = `platforms = (${platformIds[platformName]})`;
    }

    // Query for multiplayer or single player games
    let multiplayerQuery = "";
    if (isMultiplayer) {
      multiplayerQuery = `& (multiplayer_modes.onlinecoop = true | multiplayer_modes.onlinecoopmax > 0 | multiplayer_modes.campaigncoop = true)`;
    }

    // Add indie bias to the query
    const indieQuery = createIndieQuery();

    const response = await axios.post(
      `${IGDB_CONFIG.base_url}/games`,
      `fields name, genres.name, platforms.name, total_rating, summary, cover.url, multiplayer_modes.*;
       where ${platformQuery} & genres = (${genreId}) ${multiplayerQuery} ${indieQuery} & total_rating != null;
       sort total_rating desc;
       limit 30;`,
      {
        headers: {
          "Client-ID": IGDB_CONFIG.client_id,
          Authorization: `${IGDB_CONFIG.access_token}`,
        },
      }
    );

    // Test to see if function properly works
    if (response.data && response.data.length > 0) {
      console.log("Games:");
      response.data.forEach((game, i) => {
        console.log(`${i + 1}. ${game.name}`);
      });
    }

    return response.data;
  } catch (error) {
    console.error(
      `Error getting ${isMultiplayer ? "multiplayer" : "single player"} games:`,
      error.message
    );
    return [];
  }
}
// getGamesByMultiplayerPreference("PC", "Action", false);

// Export functions for use in other files
module.exports = {
  getGamesByPlatform,
  getGamesByGenreGroup,
  getGamesBySpecificGenre,
  getGamesByMultiplayerPreference,
  platformIds,
  genreGroups,
  genreIds,
  INDIE_GENRE_ID,
  getRandomIndieGame,
  testRandomizer,
};

async function getRandomIndieGame() {
  try {
    // counts matching games
    const countResp = await axios.post(
      `${IGDB_CONFIG.base_url}/games/count`,
      `where genres = (${INDIE_GENRE_ID}) & total_rating > 70;`,
      {
        headers: {
          "Client-ID": IGDB_CONFIG.client_id,
          Authorization: `${IGDB_CONFIG.access_token}`,
        },
      }
    );
    const total = countResp.data.count;

    // random offset added into list of games
    const offset = Math.floor(Math.random() * Math.max(1, total - 1));

    // Fetch only 1 game at that offset
    const resp = await axios.post(
      `${IGDB_CONFIG.base_url}/games`,
      `
        fields name, total_rating, summary, cover.url;
        where genres = (${INDIE_GENRE_ID}) & total_rating > 70;
        limit 1;
        offset ${offset};
      `,
      {
        headers: {
          "Client-ID": IGDB_CONFIG.client_id,
          Authorization: `${IGDB_CONFIG.access_token}`,
        },
      }
    );

    // Extracts game from response data and formats it
    const game = resp.data[0];
    if (!game) return null;

    return {
      name: game.name,
      rating: Math.round(game.total_rating),
      summary: game.summary || "No summary available",
      cover: game.cover
        ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.url
            .split("/")
            .pop()}`
        : null,
    };
  } catch (err) {
    console.error("Error fetching random indie game:", err.message);
    return null;
  }
}

//Test function to log random game
async function testRandomizer() {
  const game = await getRandomIndieGame();
  console.log("Random Indie Game:", game);
}
testRandomizer();
