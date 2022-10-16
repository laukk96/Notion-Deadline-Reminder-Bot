require("dotenv").config();

/* Example interface
const UserRegistryDatabase = new UserRegistry();

UserRegistryDatabase.connect();
let payload = UserRegistryDatabase.queries.get.user({name: "John", id: "H1232"});
if (!payload.error) {

}
UserRegistryDatabase.close();
*/
const {
  REST,
  Routes,
  DiscordjsError,
  IntegrationApplication,
  Embed,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ButtonInteraction,
  MessageComponentInteraction,
  ChatInputCommandInteraction,
} = require("discord.js");

const wait = require("node:timers/promises").setTimeout;

// How to setup .env variables for confidential discord token information
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const TOKEN = process.env.DISCORD_TOKEN;

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "doc",
    description: "Sends a link to the Notion Documentation.",
  },
  {
    name: "button",
    description: "Test with Button Interactions.",
  },
  {
    name: "help",
    description: "If you need help to link your notion to discord!",
  },
  {
    name: "credits",
    description: "The original authors of the bot",
  }, 
  {
    name: "adduser",
    description: "Officer is trying to add a user to the USER_REGISTRY database:",
  }
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Project Notion 2");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName == "ping") {
    await interaction.reply("Pong!");
    await client.channels.cache
      .get(interaction.channelId)
      .send("The pong has been sent!");
  } else if (interaction.commandName == "doc") {
    await interaction.reply(
      "https://www.notion.so/help/guides/category/documentation"
    );
  } else if (interaction.commandName == "button") {
    // [ Embed Message ]
    const button_embed = new EmbedBuilder()
      .setColor("Grey")
      .setTitle("Button Interaction Test")
      .setDescription("Test this message by clicking one of the buttons!")
      .setImage(
        "https://cdn.dribbble.com/users/153131/screenshots/10878981/notion_4x.png"
      )
      .setTimestamp();
    // .setURL()
    // .setAuthor({
    //   name: 'Notion Bot',
    //   iconURL: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
    //   url: 'https://developers.notion.com/reference/intro',
    //   description: 'Test this message by clicking one of the buttons!'
    // })

    // [ Row of Buttons ]
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("Primary")
        .setLabel("Blue")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("Secondary")
        .setLabel("Red")
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId("Green")
        .setLabel("Green")
        .setStyle(ButtonStyle.Success)
    );

    await interaction.reply({ embeds: [button_embed], components: [row] });
  } else if (interaction.commandName == "help") {
    const helpEmbed = new EmbedBuilder()
      .setColor("Yellow")
      .setTitle("Help with Notion")
      .setURL("https://www.simple.ink/integrations/discord-in-notion")
      .setAuthor({
        name: "Notion",
        iconURL:
          "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
        url: "https://discord.js.org",
      })
      .setDescription("This is a guide on how to get started with Notion")
      .setThumbnail(
        "https://cdn.dribbble.com/users/153131/screenshots/10878981/notion_4x.png"
      )
      .addFields({
        name: "Please click on this link to get started with linking your notion to discord!",
        value: "https://www.simple.ink/integrations/discord-in-notion",
      })
      .setImage(
        "https://cdn.dribbble.com/users/153131/screenshots/10878981/notion_4x.png"
      )
      .setTimestamp()
      .setFooter({
        text: "Courtesy of the GDSC Development Team",
        iconURL:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Kg2FF2wpIK_HLyo8Q56ycAHaFj%26pid%3DApi&f=1&ipt=903b969ee37fcf7030b3b98b6b053ba7b2e31ca8f1478f60f135f1c5a5a5796a&ipo=images",
      });

    await interaction.reply({ embeds: [helpEmbed] });
  } else if (interaction.commandName == "credits") {
    const creditsEmbed = new EmbedBuilder()
      .setColor(0x1099ff)
      .setTitle("Credits")
      .setAuthor({
        name: "Google Developer Student Club",
        iconURL:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.g1-tsdPVN-SCgajIwi75MQHaC5%26pid%3DApi&f=1&ipt=8bd00114b7cc9f8ccc54c9b084bb19abf05f20acd2b6f8831f285f3a4c789218&ipo=images",
        url: "https://discord.gg/nxKfjYKFby",
      })
      .setDescription("Credits to the authors!")
      .setThumbnail(
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.g1-tsdPVN-SCgajIwi75MQHaC5%26pid%3DApi&f=1&ipt=8bd00114b7cc9f8ccc54c9b084bb19abf05f20acd2b6f8831f285f3a4c789218&ipo=images"
      )
      .addFields(
        { name: "Project Managers", value: "Kiaran L, Konstantin V" },
        { name: "Discord JS", value: "Jay C" },
        { name: "Notion Api", value: "Richard A" },
        { name: "Security Analysis", value: "Jay C" },
        { name: "Cost Analysis", value: "Richard A" }
      )
      .setFooter({
        text: "Courtesy of the GDSC Development Team",
        iconURL:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Kg2FF2wpIK_HLyo8Q56ycAHaFj%26pid%3DApi&f=1&ipt=903b969ee37fcf7030b3b98b6b053ba7b2e31ca8f1478f60f135f1c5a5a5796a&ipo=images",
      });

    await interaction.reply({ embeds: [creditsEmbed] });
  } else if (interaction.commandName == "adduser") {

  }
});

client.on("messageCreate", (message) => {
  // Check to see if the message created is it's own message
  if (message.author.id == "1018596435320639539") {
    return;
  }
  // message.channel.send(message.content);
  if (message.content == "dm me 4") {
    try {
      console.log(message.author.name, message.author.id);
      message.channel.send(`Sending a message to ${message.author.toString()}`);
      message.author.send("`Sending Direct Message 4`");
    } catch (exception) {
      message.channel.send(
        `Could not send a message to ${message.author.toString()}`
      );
    }
  }
});

console.log("Hello World.");

client.login(TOKEN);
