require("dotenv").config(); //client_id, client_secret, and access_token saved here
const axios = require("axios"); //JS library

// IGDB setup
const IGDB_CONFIG = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  base_url: "https://api.igdb.com/v4",
};

// platform IDs of base platforms
const platformIds = {
  "PlayStation 5": 167,
  PC: 6,
  IOS: 34,
  Android: 39,
  "Xbox Series X": 169,
  "Nintendo Switch": 130,
};

//Test function with axios to display top 10 games
async function getGames() {
  try {
    const response = await axios.post(
      `${IGDB_CONFIG.base_url}/games`,
      "fields name; total_rating; where total_rating != null; sort total_rating desc;  limit 10;",
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

// Test function to get top 10 games for PS5
async function getGamesWithPlatform(platformName, platformId) {
  try {
    const response = await axios.post(
      `${IGDB_CONFIG.base_url}/games`,
      `fields name, platforms.name, total_rating; where platforms = (${platformId}) & total_rating != null; sort total_rating desc; limit 10;`,
      {
        headers: {
          "Client-ID": IGDB_CONFIG.client_id,
          Authorization: `${IGDB_CONFIG.access_token}`,
        },
      }
    );

    if (response.data && response.data.length > 0) {
      console.log(`Top 10 Games for ${platformName}:`);
      response.data.forEach((game, i) => {
        console.log(`${i + 1}. ${game.name}`);
      });
    } else {
      console.log(`No games found for ${platformName}.`);
    }
  } catch (error) {
    console.error("Error getting games", error.message);
  }
}

const selectedPlatform = "PlayStation 5"; // Should be selected by user
const selectedId = platformIds[selectedPlatform];

getGamesWithPlatform(selectedPlatform, selectedId);
