const { EmbedBuilder } = require("discord.js");
const ErrorHandler = require("../../../../common/Error");
//sucessEmbed is defined outside of the function
//so you don't make a new object everytime you invoke the function.
//Every invocation results in the same sucessEmbed object, so you might as well only make it once and reference
//to it everytime.
let successEmbed = new EmbedBuilder()
  .setTitle("✅ Success!")
  .setDescription(
    `We've successfully integrated your Notion Database to Discord.`
  )
  .setColor("02f933");

module.exports = async (interaction, packages) => {
  let initiateEmbed = null;

  try {
    var deadline_property_name = interaction.fields.getTextInputValue(
      "deadlinePropertyNameInput"
    );

    var task_property_name = interaction.fields.getTextInputValue(
      "taskPropertyNameInput"
    );
  } catch (error) {
    //TODO: Add Error Report Invocation
    const Error = ErrorHandler({
      object: error,
      message: `Oops! We've ran into a bug. Please make sure you've entered the proper fields.`,
    });
    return await interaction.reply({
      embeds: [Error.getEmbed()],
    });
  }

  const data = {
    deadline_property_name: deadline_property_name,
    task_property_name: task_property_name,
  };
  const mongo_packet = {
    server_id: interaction.guild.id,
    data: data,
  };
  // Grab the PropertyNames from another modal

  // Create the data in the ClubInfo Collection
  let result =
    ClubInfoDatabase.queries.update.update_notion_properties(mongo_packet);
  if (result?.error) {
    const Error = ErrorHandler({
      object: result.error,
      message: `Failed to update our records.`,
    });
    return await interaction.reply({
      embeds: [Error.getEmbed()],
    });
  }

  return await interaction.reply({
    embeds: [successEmbed],
  });
};
