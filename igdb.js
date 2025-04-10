require("dotenv").config(); //client_id, client_secret, and access_token saved here
const axios = require("axios"); //JS library

// IGDB setup
const IGDB_CONFIG = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  base_url: "https://api.igdb.com/v4",
};

//Test function with axios to display top 10 games
async function getGames() {
  try {
    const response = await axios.post(
      `${IGDB_CONFIG.base_url}/games`,
      "fields name; limit 10;",
      {
        headers: {
          "Client-ID": IGDB_CONFIG.client_id,
          Authorization: `${IGDB_CONFIG.access_token}`,
        },
      }
    );

    if (response.data && response.data.length > 0) {
      console.log("Top 10 Games:");
      response.data.forEach((game, i) => {
        console.log(`${i + 1}. ${game.name}`);
      });
    } else {
      console.log("No games found.");
    }
  } catch (error) {
    console.error("Error getting games:", error.message);
  }
}

getGames();
