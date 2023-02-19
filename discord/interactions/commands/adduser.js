// This code requires the ModalBuilder, TextInputBuilder, and ActionRowBuilder classes from the discord.js library.
const {
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
} = require("discord.js");

// Create the modal which will be used to collect the user's input
const modal = new ModalBuilder()
  .setCustomId("adduserModal")
  .setTitle("Add User");

// Create the text input components which will be used to collect the user's input
const nameInput = new TextInputBuilder()
  .setCustomId("nameInput")
  .setLabel("What is their full name?")
  .setStyle(TextInputStyle.Short)
  .setRequired(true);

const discordInput = new TextInputBuilder()
  .setCustomId("discordInput")
  .setLabel("What is their Discord UID?")
  .setStyle(TextInputStyle.Short)
  .setRequired(true);

const emailInput = new TextInputBuilder()
  .setCustomId("emailInput")
  .setLabel("What is their Email on Notion?")
  .setStyle(TextInputStyle.Short)
  .setRequired(true);

// Create the action rows which will contain the text input components
const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
const secondActionRow = new ActionRowBuilder().addComponents(discordInput);
const thirdActionRow = new ActionRowBuilder().addComponents(emailInput);
modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

async function addusers(interaction, packages) {
  // Add the action rows to the modal

  // Show the modal to the user and await their response
  await interaction.showModal(modal);
  //await interaction.reply({c: 'Your submission was received successfully!'});
}

// Export the addusers function so it can be used by other files
module.exports = addusers;
