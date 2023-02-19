const { EmbedBuilder } = require("discord.js");
const ErrorHandler = require("../../../../common/Error");

module.exports = async (interaction, packages) => {
  try {
    var clubNameInput = interaction.fields.getTextInputValue("clubNameInput");
    var clubDescriptionInput = interaction.fields.getTextInputValue(
      "clubDescriptionInput"
    );
    var notionIntegrationKeyInput = interaction.fields.getTextInputValue(
      "notionIntegrationKeyInput"
    );
    var databaseIdInput =
      interaction.fields.getTextInputValue("databaseIdInput");
    var agreementInput = interaction.fields.getTextInputValue("agreementInput");
  } catch (error) {
    const Error = ErrorHandler({
      object: error,
      message: `Oops! You were missing a field or two. Please try again!`,
    });
    return await interaction.reply({
      embeds: [Error.getEmbed()],
    });
  }
  if ((agreementInput.toLowerCase() === "agree") == false) {
    const Error = ErrorHandler({
      object: error,
      message: `You did not type \`"Agree"\`! \n\n This is an **End User License Agreement** which legally gives us permission to store your data on our MongoDB Cloud Database managed by the Development Team.`,
    });
    return await interaction.reply({
      embeds: [Error.getEmbed()],
    });
  } else {
    const today = new Date();
    const date = `${
      today.getMonth() + 1
    }/${today.getDay()}/${today.getFullYear()}`;

    const data = {
      initiated_date: date,
      club_name: clubNameInput,
      club_description: clubDescriptionInput,
      notion_integration_key: notionIntegrationKeyInput,
      database_id: databaseIdInput,
      deadline_property_name: null,
      task_property_name: null,
    };
    const mongo_query = {
      server_id: interaction.guild.id,
      data: data,
    };
    try {
      let response = await ClubInfoDatabase.queries.create.club(mongo_query);
      response = await UserRegistryDatabase.queries.create.user_registry(
        mongo_query
      );
      response = await DeadlineHistoryDatabase.queries.create.deadline_history(
        mongo_query
      );
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("✅ Success!")
            .setDescription(
              `Your Club \`${clubNameInput}\` has been successfully initiated in the MongoDB Database!\nPlease run the command \`/setupnotion\` to continue.`
            )
            .setColor("02f933"),
        ],
      });
    } catch (error) {
      const Error = ErrorHandler({
        object: error,
        message: `Failed to update our records.`,
      });
      return await interaction.reply({
        embeds: [Error.getEmbed()],
      });
    }
  }
};
