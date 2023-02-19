// Imports ActionRowBuilder and ButtonBuilder from discord.js
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  ComponentType,
} = require("discord.js");
const { Client } = require("@notionhq/client");
const ErrorHandler = require("../../../common/Error");
const SubmitButton = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    // Sets a custom id to the button
    .setCustomId("UpdateTaskDone")
    // Sets a label to the button
    .setLabel("Update Users")
    // Sets a style to the button
    .setStyle(ButtonStyle.Primary)
);

// Asynchronous function that takes an interaction as an argument
async function update(interaction, { notionDatabase, ClubInfoDatabase }) {
  // Creates an ActionRowBuilder and adds a button component
  //IMPORTANT
  const ClubInfo = (
    await ClubInfoDatabase.queries.get.info({
      server_id: interaction.guildId,
      data: interaction.guildId,
    })
  )?.payload;
  if (ClubInfo === undefined) {
    const Error = ErrorHandler({
      object: {},
      message: `Try running /initiate to register your club.`,
    });
    return await interaction.reply({
      embeds: [Error.getEmbed()],
    });
  }
  notionDatabase.notion = new Client({
    auth: ClubInfo.notion_integration_key,
  });
  //IMPORTANT The above code makes this compatible with multiple servers
  try {
    var NotionData = await notionDatabase.getTask("Afraz", ClubInfo);
  } catch (error) {
    const Error = ErrorHandler({
      object: {},
      message: `Could not retrieve tasks. Please contact administrator.`,
    });
    return await interaction.reply({
      embeds: [Error.getEmbed()],
    });
  }

  const Selections = toSelectOption(NotionData);
  const SelectMenu = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("SelectTask")
      .setPlaceholder(Selections[0].label)
      .addOptions(Selections)
  );

  // Sends a reply to the interaction with a content and the button component
  await interaction.reply({
    content: "Which task have you finished?",
    components: [SelectMenu, SubmitButton],
  });
  const message = await interaction.fetchReply();
  const collector = message.createMessageComponentCollector({
    componentType: ComponentType.StringSelect,
    time: 15000,
  });

  collector.on("collect", (i) => {
    i.message.SelectedValue = i.values[0];
  });

  collector.on("end", (collected) => {
    console.log(`Collected ${collected.size} interactions.`);
  });
}

function toSelectOption(NotionData) {
  const SelectOptions = NotionData.map((Task, i) => {
    return {
      label: Task.task_name,
      description: Task.task_due,
      value: `${Task.task_name}`,
    };
  });
  return SelectOptions;
}

// Exports the function
module.exports = update;
