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

// Import collections
const { ClubInfo } = require("../mongodb/collections/ClubInfo/ClubInfo.js");
const { UserRegistry } = require("../mongodb/collections/UserRegistry/UserRegistry.js");


// Creating a new client object with the specified intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

// Create the NotionDatabase for use in the functions
const TABLE_DEADLINES_ID = "beb4f1b15ec1443c87e16bd138832d06";
const notionDatabase = new NotionDatabase(TABLE_DEADLINES_ID);
// Create the ClubInfoDatabase Collection Variable
const ClubInfoDatabase = new ClubInfo();
ClubInfoDatabase.connect();
// Create the UserRegistryDatabase Collection Variable
const UserRegistryDatabase = new UserRegistry();
UserRegistryDatabase.connect();

// Send a package of necessary Collections / Notion Databases
const packages = {
  notionDatabase: notionDatabase,
  ClubInfoDatabase: ClubInfoDatabase,
  UserRegistryDatabase: UserRegistryDatabase
}

// Initializing the client
initialize(client, packages);

// Logging in to the client using the stored token
client.login(TOKEN);

// Adding event listeners passing the client object to each one
client.on(Events.ready, ready(client));
client.on(Events.InteractionCreate, interactionCreate(client, packages));
client.on(Events.GuildCreate, guildCreate(client));
client.on(Events.GuildDelete, guildDelete(client));