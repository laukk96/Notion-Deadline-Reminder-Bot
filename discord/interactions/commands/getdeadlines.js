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
  const data_packet = {discord_id: interaction.user.id};
  user_info = await UserRegistryDatabase.queries.get.user(data_packet);
  return user_info;
}

async function getdeadlines(interaction, packages) {
  const imageUrl = interaction.user.avatarURL()
  const nameUrl = interaction.user.username

  const taskEmbed = new EmbedBuilder()
    .setColor("Red")
    .setTitle("All Deadlines for ${nameUrl}")
    .setAuthor({ name: "Get Deadlines", iconURL: imageUrl, url: 'https://www.notion.so/Overall-Task-List-beb4f1b15ec1443c87e16bd138832d06' })
    .setThumbnail(imageUrl)
    .addFields(
        { name: 'Here is your main task', value: 'Task #', inline: true },
        { name: 'Here is task #2', value: 'Task #' },
        { name: 'Here is task #3', value: 'Task #' },
    { name: 'Here is task #4', value: 'Task #' },

    )
    .setImage('https://i.ytimg.com/vi/dnHQn_mpDpk/maxresdefault.jpg%27')
    .setTimestamp()
    .setFooter({
    text: "Courtesy of the GDSC Development Team",
    iconURL:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Kg2FF2wpIK_HLyo8Q56ycAHaFj%26pid%3DApi&f=1&ipt=903b969ee37fcf7030b3b98b6b053ba7b2e31ca8f1478f60f135f1c5a5a5796a&ipo=images",
  });

  await interaction.reply({
    embeds: [taskEmbed]
  });
}

//Exporting the getdeadlines() function
module.exports = getdeadlines; 