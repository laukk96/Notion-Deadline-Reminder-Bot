// This code requires the ModalBuilder, TextInputBuilder, and ActionRowBuilder classes from the discord.js library.
const {
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
} = require("discord.js");

const {
  NotionDatabase
} = require("../../../notion.js");

// This is an async function used to add users
async function addusers(interaction, packages) {
  console.log('Inside addusers: ', packages);
  // Create the modal which will be used to collect the user's input
  const modal = new ModalBuilder()
    .setCustomId("adduserModal")
    .setTitle("Add User");

  // Create the text input components which will be used to collect the user's input
  const nameInput = new TextInputBuilder()
    .setCustomId("nameInput")
    .setLabel("What is your full name?")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const discordInput = new TextInputBuilder()
    .setCustomId("discordInput")
    .setLabel("What is this user's Discord UID?")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const emailInput = new TextInputBuilder()
    .setCustomId("emailInput")
    .setLabel("What is the user's Email on the Notion page?")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  // Create the action rows which will contain the text input components
  const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
  const secondActionRow = new ActionRowBuilder().addComponents(discordInput);
  const thirdActionRow = new ActionRowBuilder().addComponents(emailInput);

  // Add the action rows to the modal
  modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

  // Show the modal to the user and await their response
  await interaction.showModal(modal);
  //await interaction.reply({c: 'Your submission was received successfully!'});
}

// Export the addusers function so it can be used by other files
module.exports = addusers;
