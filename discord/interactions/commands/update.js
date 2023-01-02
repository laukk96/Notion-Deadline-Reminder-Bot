// Imports ActionRowBuilder and ButtonBuilder from discord.js
const { 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle 
} = require("discord.js");


// Asynchronous function that takes an interaction as an argument
async function update(interaction) {
  // Creates an ActionRowBuilder and adds a button component
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      // Sets a custom id to the button
      .setCustomId("primary")
      // Sets a label to the button
      .setLabel("Notification Update!")
      // Sets a style to the button
      .setStyle(ButtonStyle.Primary)
  );

  // Sends a reply to the interaction with a content and the button component
  await interaction.reply({
    content: "Are you sure you want to update all users?",
    components: [row],
  });
}

// Exports the function
module.exports = update;
