//Importing the ActionRowBuilder, SelectMenuBuilder, and EmbedBuilder functions from discord.js
const {
  ActionRowBuilder,
  SelectMenuBuilder,
  EmbedBuilder,
} = require("discord.js");

// SUPPORT FUNCTIONS
async function getNameFromDiscordId(interaction, packages) {
  // Deconstruct "packages" Dictionary Object from index.js
  const {notionDatabase, ClubInfoDatabase, UserRegistryDatabase} = packages;
  
  // UserRegistry Collection Function
  user_info = UserRegistryDatabase.queries.get.user();
}

// Declaring getdeadlines() as an async function that takes an interaction argument
async function getdeadlines(interaction, packages) {
  
  // Creating a new EmbedBuilder component and adding properties to it
  const embed = new EmbedBuilder()
    .setColor("Blue")
    .setTitle(`All Deadlines for ${interaction.user.username}`)
    .setURL("https://www.simple.ink/integrations/discord-in-notion")
    .setAuthor({
      name: "Notion Deadline Reminder Bot",
      iconURL:
        "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
      url: "https://discord.js.org",
    })
    .setTimestamp()
    .setFooter({
      text: "Courtesy of the GDSC Development Team",
      iconURL:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Kg2FF2wpIK_HLyo8Q56ycAHaFj%26pid%3DApi&f=1&ipt=903b969ee37fcf7030b3b98b6b053ba7b2e31ca8f1478f60f135f1c5a5a5796a&ipo=images",
    });
  //Replying to the interaction with the embed and row
  await interaction.reply({
    ephemeral: true,
    embeds: [embed]
  });
}

//Exporting the getdeadlines() function
module.exports = getdeadlines; 