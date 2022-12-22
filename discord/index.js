// Importing the Client, GatewayIntentBits and Events objects from the discord.js library
const { Client, GatewayIntentBits, Events } = require("discord.js");

// Importing the ready and interactionCreate events from the events.js file
const { ready, interactionCreate } = require("./events");

// Importing the initialize function from the Discord library
const { initialize } = require("./library/Discord");

// Importing the token from the config.js file
const { TOKEN } = require("./config");

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

// Adding event listeners for the ready and InteractionCreate events, passing the client object to each one
client.on(Events.ready, ready(client));
client.on(Events.InteractionCreate, interactionCreate(client));
