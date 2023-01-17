//Importing the ActionRowBuilder, SelectMenuBuilder, and EmbedBuilder functions from discord.js
const {
  ActionRowBuilder,
  SelectMenuBuilder,
  EmbedBuilder,
} = require("discord.js");

//Declaring help() as an async function that takes an interaction argument
async function help(interaction) {
  //Creating a new ActionRowBuilder and adding components to it
  const row = new ActionRowBuilder().addComponents(
    new SelectMenuBuilder()
      //Setting the custom ID for the new SelectMenuBuilder component
      .setCustomId("select")
      //Setting the placeholder for the new SelectMenuBuilder component
      .setPlaceholder("Select something for Help!")
      //Setting the minimum values to 1
      .setMinValues(1)
      //Setting the maximum values to 1
      .setMaxValues(1)
      //Adding 3 options to the new SelectMenuBuilder component
      .addOptions([
        {
          label: "Find your UID",
          description: "This is how to find your UID",
          value: "first_option",
        },
        {
          label: "Guide to using Notion",
          description: "Documentation to using the Notion Dashboard",
          value: "second_option",
        },
        {
          label: "GitHub Documentation",
          description: "Technical Documentation of Notion Bot",
          value: "third_option",
        },
      ])
  );

  //Creating a new EmbedBuilder component and adding properties to it
  const embed = new EmbedBuilder()
    .setColor("White")
    .setTitle("This is a guide to for the Notion Deadline Reminder Bot")
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
    embeds: [embed],
    components: [row],
  });
}

//Exporting the help() function
module.exports = help;
