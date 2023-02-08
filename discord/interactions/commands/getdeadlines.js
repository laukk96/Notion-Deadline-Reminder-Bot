//Importing the ActionRowBuilder, SelectMenuBuilder, and EmbedBuilder functions from discord.js
const {
  ActionRowBuilder,
  SelectMenuBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const chalk = require('chalk');

// Helper Function to reduce all capitalization from MongoDB UserInfo
function correctNameCapitalization(user_name){
  const spaceIndex = user_name.indexOf(" ");
  const first_name = user_name[0].toUpperCase() + user_name.substring(1, spaceIndex+1).toLowerCase();
  const last_name = user_name[spaceIndex+1].toUpperCase() + user_name.substring(spaceIndex+2).toLowerCase();
  return `${first_name} ${last_name}`
}

// Exporting the getdeadlines() function
async function getdeadlines(interaction, packages) {
  // Destructure Packages
  const {notionDatabase, ClubInfoDatabase, UserRegistryDatabase} = packages;
  // Get the email of the user
  const data_packet = {discord_id: interaction.user.id}
  const mongo_packet = {server_id: interaction.guildId, data: data_packet};
  let user_info = await UserRegistryDatabase.queries.get.user(mongo_packet);


  console.log('/getdeadlines.js: Checking UserInfo: ', user_info);
  let user_name = user_info.payload['name'];
  const user_email = user_info.payload['email'];
  
  // Correct capitalization on the user_name
  
  user_name = correctNameCapitalization(user_name)

  // Get the deadlines of the user  by sending in the email
  const allDeadlines = await notionDatabase.GetDeadlinesForEmail(user_email);

  const imageUrl = interaction.user.avatarURL()
  // const nameUrl = interaction.user.username
  
  // Initiate the Task Embeds
  const taskEmbed = new EmbedBuilder()
    .setColor("Red")
    .setTitle(`\`Deadlines for:\` **${user_name}**`)
    .setAuthor({ name: "Get Deadlines", iconURL: imageUrl, url: 'https://www.notion.so/Overall-Task-List-beb4f1b15ec1443c87e16bd138832d06' })
    .setThumbnail(imageUrl)
    .setTimestamp()
    .setFooter({
    text: "Courtesy of the GDSC Development Team",
    iconURL:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Kg2FF2wpIK_HLyo8Q56ycAHaFj%26pid%3DApi&f=1&ipt=903b969ee37fcf7030b3b98b6b053ba7b2e31ca8f1478f60f135f1c5a5a5796a&ipo=images",
  });

  // Add the deadlines to the Task Embed
  for (let i = 0; i < allDeadlines.length; i++){
    // Four deadlines maximum
    if (i+1 > 4){
      break;
    }
    let taskField = {
      name: null,
      value: null,
    };
    // Substring the date in order to remove the time accuracy portion
    let taskDate = allDeadlines[i].date.toString();
    taskDate = taskDate.substring(0, taskDate.indexOf(':')-2); 
    taskField.name = `${i+1}: __${allDeadlines[i].name}__`
    taskField.value = `\t*${taskDate}*`
    taskEmbed.addFields(taskField);
    
  }

  const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setLabel('GDSC Notion Page')
        .setURL('https://www.notion.so/Overall-Task-List-beb4f1b15ec1443c87e16bd138832d06')
        .setStyle(ButtonStyle.Link),
      );

  await interaction.reply({
    embeds: [taskEmbed], components: [row]
  });
}

module.exports = getdeadlines;