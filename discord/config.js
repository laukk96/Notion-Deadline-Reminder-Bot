// Require the dotenv module and configure it to the .env file in the parent directory
require("dotenv").config({ path: "../.env" });

// Create a constant for the Discord client ID and set it to the value of the DISCORD_CLIENT_ID key in the .env file
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;

// Create a constant for the Discord token and set it to the value of the DISCORD_TOKEN key in the .env file
const TOKEN = process.env.DISCORD_TOKEN;

// Export the CLIENT_ID and TOKEN constants so they can be accessed outside this file
module.exports.CLIENT_ID = CLIENT_ID;
module.exports.TOKEN = TOKEN;
