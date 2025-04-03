require("dotenv").config();

// IGDB Setup
const IGDB_CONFIG = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  base_url: "https://api.igdb.com/v4",
  cors_proxy: "testing for now", // some proxies I have tried are not working.
};
