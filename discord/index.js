// Importing the Client, GatewayIntentBits and Events objects from the discord.js library
const { Client, GatewayIntentBits, Events } = require("discord.js");

const {
  ready,
  interactionCreate,
  guildCreate,
  guildDelete,
} = require("./events");

// Importing the initialize function from the Discord library
const { initialize } = require("./library/Discord");

// Importing the token from the config.js file
const { TOKEN } = require("./config");
const { NotionDatabase } = require("../notion.js");

// Creating a new client object with the specified intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

// Initializing the client
initialize(client);

// Logging in to the client using the stored token
client.login(TOKEN);

// Create the 

// Adding event listeners passing the client object to each one
client.on(Events.ready, ready(client));
client.on(Events.InteractionCreate, interactionCreate(client));
client.on(Events.GuildCreate, guildCreate(client));
client.on(Events.GuildDelete, guildDelete(client));
