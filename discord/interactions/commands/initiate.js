// This code imports the ActionRowBuilder, EmbedBuilder, ModalBuilder, and TextInputBuilder from the Discord.js library.
const {
  ActionRowBuilder,
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
} = require("discord.js");

// This code is a function that checks if the user has administrator permissions. If not, it sends an embed to the user with an error message.
async function initiate(interaction) {
  if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
    rejectionEmbed = new EmbedBuilder()
      .setTitle("⛔ Permissions Error!")
      .setDescription(`You are not an \`Administrator\`!`)
      .setColor("fc3c32");

    interaction.reply({
      embeds: [rejectionEmbed],
    });
    return;
  }
  // TODO: Check if the server has not been initiated already

  // This code creates a new modal and defines the title for it.
  const initiateModal = new ModalBuilder()
    .setCustomId("initiateModal")
    .setTitle("Initiate your Server");

  // The following lines of code create text input builders with labels, styles, max lengths, and other attributes.
  const clubNameInput = new TextInputBuilder()
    .setCustomId("clubNameInput")
    .setLabel("What is your club name?")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const clubDescriptionInput = new TextInputBuilder()
    .setCustomId("clubDescriptionInput")
    .setLabel("Tell us a brief description about your club!")
    .setStyle(TextInputStyle.Paragraph)
    .setMaxLength(280) // Same as twitter length lol
    .setRequired(false);

  const notionIntegrationKeyInput = new TextInputBuilder()
    .setCustomId("notionIntegrationKeyInput")
    .setLabel("What is your Notion Integration Key?")
    .setStyle(TextInputStyle.Short)
    .setMaxLength(200)
    .setRequired(false);

  const databaseIdInput = new TextInputBuilder()
    .setCustomId("databaseIdInput")
    .setLabel("What is your Notion's Database ID?")
    .setStyle(TextInputStyle.Short)
    .setMaxLength(200)
    .setRequired(false);

  const agreementInput = new TextInputBuilder()
    .setCustomId("agreementInput")
    .setLabel('Do you agree? (Type "Agree")')
    .setStyle(TextInputStyle.Short)
    .setMaxLength(8)
    .setRequired(true);

  // The following lines of code create action rows for the modal.
  const firstActionRow = new ActionRowBuilder().addComponents(clubNameInput);
  const secondActionRow = new ActionRowBuilder().addComponents(
    clubDescriptionInput
  );
  const thirdActionRow = new ActionRowBuilder().addComponents(
    notionIntegrationKeyInput
  );
  const fourthActionRow = new ActionRowBuilder().addComponents(databaseIdInput);
  const fifthActionRow = new ActionRowBuilder().addComponents(agreementInput);

  // This line of code adds the action rows to the modal.
  initiateModal.addComponents([
    firstActionRow,
    secondActionRow,
    thirdActionRow,
    fourthActionRow,
    fifthActionRow,
  ]);

  // This line of code displays the modal to the user.
  await interaction.showModal(initiateModal);
}

// This line of code exports the initiate function so it can be used elsewhere.
module.exports = initiate;
