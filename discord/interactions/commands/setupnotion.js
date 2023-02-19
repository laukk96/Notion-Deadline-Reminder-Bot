const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
try {
  const initiateModal = new ModalBuilder()
    .setCustomId("configureNotionModal")
    .setTitle("Configure Notion Properties");
  const deadlinePropertyNameInput = new ActionRowBuilder().addComponents(
    new TextInputBuilder()
      .setCustomId("deadlinePropertyNameInput")
      .setLabel("What is your Deadline property name?")
      .setStyle(TextInputStyle.Short)
      .setMaxLength(200)
      .setRequired(false)
  );

  const taskPropertyNameInput = new ActionRowBuilder().addComponents(
    new TextInputBuilder()
      .setCustomId("taskPropertyNameInput")
      .setLabel("What is your Task property name?")
      .setStyle(TextInputStyle.Short)
      .setMaxLength(200)
      .setRequired(false)
  );
  async function setupnotion(interaction, packages) {
    initiateModal.addComponents([
      deadlinePropertyNameInput,
      taskPropertyNameInput,
    ]);
    await interaction.showModal(initiateModal);
  }
  module.exports = setupnotion;
} catch (error) {
  console.error(error);
}
