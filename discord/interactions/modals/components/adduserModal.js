const { EmbedBuilder } = require("discord.js");
const ErrorHandler = require("../../../../common/Error");
module.exports = async (interaction, packages) => {
  const { UserRegistryDatabase } = packages;
  const imageUrl =
    "https://discord.com/assets/212e30e47232be03033a87dc58edaa95.svg";

  try {
    var name = interaction.fields.getTextInputValue("nameInput");
    var discord_id = interaction.fields.getTextInputValue("discordInput");
    var email = interaction.fields.getTextInputValue("emailInput");
  } catch (error) {
    let Error = ErrorHandler({
      object: error,
      message: "You were missing a couple of fields! Please try again.",
    });

    return await interaction.reply({
      embeds: [Error.getEmbed()],
    });
  }
  // Has to match the Schema provided in UserSchema
  const data = {
    name: name,
    email: email,
    discord_id: discord_id,
    notion_id: null,
  };

  data.notion_id = "undefined";

  const mongo_query = {
    server_id: interaction.guild.id,
    data: data,
  };

  // Fetch the discord user with the provided id
  // If unsuccessful, catch and send an error message
  var UserInfoEmbed = null;
  interaction.guild.members
    .fetch(data.discord_id)
    .then(async (discord_user) => {
      UserInfoEmbed = new EmbedBuilder()
        .setColor("Green")
        .setTitle(`\`New User Added\`: ${data.name}`)
        // .setAuthor({ name: "New User Added", iconURL: imageUrl, url: 'https://www.notion.so/Overall-Task-List-beb4f1b15ec1443c87e16bd138832d06' })
        .setThumbnail(imageUrl)
        .addFields({
          name: `\`Discord Id\`: ${data.discord_id}`,
          value: `\`Email\`: ${data.email}`,
        });

      let result = UserRegistryDatabase.queries.create.user(mongo_query);
      if (result?.error) {
        let Error = ErrorHandler({
          object: result.error,
          message: "Failed to update our records.",
        });
        return await interaction.reply({
          embeds: [Error.getEmbed()],
        });
      }

      return await interaction.reply({
        embeds: [UserInfoEmbed],
        content: `:white_check_mark: ${discord_user} You have been added to the User-Registry!`,
      });
    })
    .catch((error) => {
      // TODO: Add the user to the UserRegistry and DeadlineHistory
      const Error = ErrorHandler({
        object: error,
        message: `Could not find a user of id: \`${data.discord_id}\`!`,
      });
      interaction.reply({
        embeds: [Error.getEmbed()],
      });
    });
};
