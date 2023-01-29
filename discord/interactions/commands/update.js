// Imports ActionRowBuilder and ButtonBuilder from discord.js
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  ComponentType,
} = require("discord.js");
const TABLE_DEADLINES_ID = "f944e134b0584cc289d0a97775384d76";
// Asynchronous function that takes an interaction as an argument
async function update(interaction, { notionDatabase }) {
  // Creates an ActionRowBuilder and adds a button component

  const NotionData = await notionDatabase.getTask("Afraz");
  const Selections = toSelectOption(NotionData);
  console.log(NotionData);
  const SelectMenu = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("SelectTask")
      .setPlaceholder(Selections[0].label)
      .addOptions(Selections)
  );
  const SubmitButton = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      // Sets a custom id to the button
      .setCustomId("UpdateTaskDone")
      // Sets a label to the button
      .setLabel("Update Users")
      // Sets a style to the button
      .setStyle(ButtonStyle.Primary)
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
