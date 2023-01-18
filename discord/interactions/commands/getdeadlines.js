//Importing the ActionRowBuilder, SelectMenuBuilder, and EmbedBuilder functions from discord.js
const {
  ActionRowBuilder,
  SelectMenuBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const chalk = require('chalk');

// SUPPORT FUNCTIONS
async function getNameFromDiscordId(interaction) {
  // Deconstruct "packages" Dictionary Object from index.js
  
  // UserRegistry Collection Function
  const data_packet = {discord_id: interaction.user.id};
  user_info = await UserRegistryDatabase.queries.get.user(data_packet);
  return user_info;
}

// Exporting the getdeadlines() function
async function getdeadlines(interaction, packages) {
  // Destructure Packages
  const {notionDatabase, ClubInfoDatabase, UserRegistryDatabase} = packages;

  // Get the email of the user
  const data_packet = {discord_id: interaction.user.id};
  user_info = await UserRegistryDatabase.queries.get.user(data_packet);
  const user_email = user_info['email']
  console.log(user_email);

  // Get the deadlines of the user  by sending in the email
  const allDeadlines = await notionDatabase.GetDeadlinesForEmail(user_email).then(response => {console.log("Response has been awaited")});

  const imageUrl = interaction.user.avatarURL()
  const nameUrl = interaction.user.username
  
  const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setLabel('GDSC Notion Page')
        .setURL('https://www.notion.so/Overall-Task-List-beb4f1b15ec1443c87e16bd138832d06')
        .setStyle(ButtonStyle.Link),
      );

  const taskEmbed = new EmbedBuilder()
    .setColor("Red")
    .setTitle(`All Deadlines for ${nameUrl}`)
    .setAuthor({ name: "Get Deadlines", iconURL: imageUrl, url: 'https://www.notion.so/Overall-Task-List-beb4f1b15ec1443c87e16bd138832d06' })
    .setThumbnail(imageUrl)
    .addFields(
        { name: 'Task 1', value: allDeadlines[0][name], inline: true },
        { name: 'Task 2', value: allDeadlines[1][name] },
        { name: 'Task 3', value: allDeadlines[2][name] },
        { name: 'Task 4', value: allDeadlines[3][name] },
    )
    .setTimestamp()
    .setFooter({
    text: "Courtesy of the GDSC Development Team",
    iconURL:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Kg2FF2wpIK_HLyo8Q56ycAHaFj%26pid%3DApi&f=1&ipt=903b969ee37fcf7030b3b98b6b053ba7b2e31ca8f1478f60f135f1c5a5a5796a&ipo=images",
  });

  await interaction.reply({
    embeds: [taskEmbed], components: [row]
  });
}

module.exports = getdeadlines;