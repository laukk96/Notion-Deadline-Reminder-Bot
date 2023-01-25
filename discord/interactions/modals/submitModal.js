const { makeConsoleLogger } = require("@notionhq/client/build/src/logging");
const { EmbedBuilder } = require("discord.js");

const {
  ClubInfo,
  UserRegistry,
  DeadlineHistory,
} = require("../../../mongodb/collections");

const ClubInfoDatabase = new ClubInfo();
const UserRegistryDatabase = new UserRegistry();
const DeadlineHistoryDatabase = new DeadlineHistory();
ClubInfoDatabase.connect();
UserRegistryDatabase.connect();
DeadlineHistoryDatabase.connect();

async function submitModal(interaction, packages) {
  console.log("Received a Modal: ", interaction.customId);

  // adduser Modal
  if (interaction.customId == "initiateModal") {
    const clubNameInput = interaction.fields.getTextInputValue("clubNameInput");
    const clubDescriptionInput = interaction.fields.getTextInputValue(
      "clubDescriptionInput"
    );
    const notionIntegrationKeyInput = interaction.fields.getTextInputValue(
      "notionIntegrationKeyInput"
    );
    const databaseIdInput =
      interaction.fields.getTextInputValue("databaseIdInput");
    const agreementInput =
      interaction.fields.getTextInputValue("agreementInput");

    console.log(agreementInput, agreementInput === "agree");
    if ((agreementInput.toLowerCase() === "agree") == false) {
      initiateEmbed = new EmbedBuilder()
        .setTitle("⛔ No Agreement!")
        .setDescription(
          `You did not type \`"Agree"\`! \n\n This is an **End User License Agreement** which legally gives us permission to store your data on our MongoDB Cloud Database managed by the Development Team.`
        )
        .setColor("fc3c32");
        
      interaction.reply({
        embeds: [initiateEmbed],
      });
    }
    // If they typed "agree":
    else {
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
      };
      const mongo_packet = {
        server_id: interaction.guild.id,
        data: data,
      };
      console.log(data);
      ClubInfoDatabase.queries.create.club(mongo_packet);
      // Send in the data packet with the server_id, data will be ignored by TemplateSchema
      UserRegistryDatabase.queries.create.user_registry(mongo_packet);
      DeadlineHistoryDatabase.queries.create.deadline_history(mongo_packet);

      initiateEmbed = new EmbedBuilder()
        .setTitle("✅ Success!")
        .setDescription(
          `Your Club \`${clubNameInput}\` has been successfully initiated in the MongoDB Database!`
        )
        .setColor("02f933");

      interaction.reply({
        embeds: [initiateEmbed],
      });
    }
  } else if (interaction.customId == "adduserModal") {
    const name = interaction.fields.getTextInputValue("nameInput");
    const discord_id = interaction.fields.getTextInputValue("discordInput");
    const email = interaction.fields.getTextInputValue("emailInput");

    // Has to match the Schema provided in UserSchema
    const data = {
      name: name,
      email: email,
      discord_id: discord_id,
      notion_id: null,
    };

    // Destructure packages
    const {notionDatabase, ClubInfoDatabase, UserRegistryDatabase} = packages;
    // parse the Notion ID from the dashboard (DEPRECATED)
    // data.notion_id = await notionDatabase.parseNotionId(email);
    data.notion_id = "undefined";
    console.log(`>> Parsed Notion Id: ${data.notion_id}, \n\t>> Using this email: ${data.email}`);

    const mongo_packet = {
      server_id: interaction.guild.id,
      data: data,
    };
    
    // TODO: Get the Notion ID from NotionClient.parseNotionId()
    let UserInfoEmbed = new EmbedBuilder()
      .setColor("Green")
      .setTitle(`\`Deadlines for:\` **${user_name}**`)
      .setAuthor({ name: "New User Added", iconURL: imageUrl, url: 'https://www.notion.so/Overall-Task-List-beb4f1b15ec1443c87e16bd138832d06' })
      .setThumbnail(imageUrl)
      .setTimestamp()
    
    interaction.reply({
      embeds: [UserInfoEmbed],
    });
    // TODO: Add the user to the UserRegistry and DeadlineHistory
    UserRegistryDatabase.queries.create.user(mongo_packet);
  }
}

module.exports = submitModal;
