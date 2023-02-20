// Importing the Client, GatewayIntentBits and Events objects from the discord.js library
require("dotenv").config("/.env");
const {
  Client,
  GatewayIntentBits,
  Events,
  EmbedBuilder,
} = require("discord.js");

const {
  ready,
  interactionCreate,
  guildCreate,
  guildDelete,
} = require("./events");
const ErrorHandler = require("../common/Error");

// Importing the initialize function from the Discord library
const { initialize } = require("./library/Discord");

// Importing the token from the config.js file
const { TOKEN } = require("./config");
const { NotionDatabase } = require("../notion/notion");

// Import collections
const { ClubInfo } = require("../mongodb/collections/ClubInfo/ClubInfo.js");
const {
  UserRegistry,
} = require("../mongodb/collections/UserRegistry/UserRegistry.js");

// Creating a new client object with the specified intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});
ErrorHandler().initiate(client);
// Create the NotionDatabase for use in the functions
const TABLE_DEADLINES_ID = "f944e134b0584cc289d0a97775384d76";
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
  UserRegistryDatabase: UserRegistryDatabase,
  client: client,
};

// packet = {
//   server_id: 682646740364427313,
//   data: {discord_id: 263853089419821056}
// }
// console.log('>> INDEX.JS: ', UserRegistryDatabase.queries.get.user(packet));

// Initializing the client
initialize(client, packages);

// Logging in to the client using the stored token
client.login(TOKEN);
// Adding event listeners passing the client object to each one
client.once(Events.ClientReady, async () => {
  onProcess(true);
  return ready(client);
});
client.on(Events.InteractionCreate, interactionCreate(client, packages));
client.on(Events.GuildCreate, guildCreate(client));
client.on(Events.GuildDelete, guildDelete(client));

[
  `exit`,
  `SIGINT`,
  `SIGUSR1`,
  `SIGUSR2`,
  `uncaughtException`,
  `SIGTERM`,
].forEach((eventType) => {
  process.on(eventType, () => onProcess(false));
});

let debounce = true;
async function onProcess(isLoggedOn) {
  if (debounce) {
    debounce = false;
    const user = await client.users
      .fetch(process.env.DEVELOPER, false)
      .then((user) => user);
    console.log(user.tag);
    const LogEmbed = new EmbedBuilder()
      .setTitle(`**BOT ${isLoggedOn ? "STARTED" : "TERMINATED"}**`)
      .setAuthor({
        name: user.tag,
        iconURL: user.avatarURL(),
        url: "https://www.notion.so/Overall-Task-List-beb4f1b15ec1443c87e16bd138832d06",
      })
      .setDescription(`${new Date()}`)
      .setColor(isLoggedOn ? "Green" : "Red");
    client.channels.cache.get("1077290810699173919").send({
      embeds: [LogEmbed],
    });
    if (isLoggedOn) debounce = true;
  }
}
