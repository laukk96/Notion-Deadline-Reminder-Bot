const { makeConsoleLogger } = require("@notionhq/client/build/src/logging");
const { EmbedBuilder, Client } = require("discord.js");

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
    const imageUrl = "https://discord.com/assets/212e30e47232be03033a87dc58edaa95.svg"

    const mongo_packet = {
      server_id: interaction.guild.id,
      data: data,
    };
    
    // Fetch the discord user with the provided id
    // If unsuccessful, catch and send an error message
    interaction.guild.members.fetch(data.discord_id).then(discord_user => {
      // Input error check
      console.log(`submitModal.js: The discord user: ${discord_user}\ntype: ${typeof(discord_user)}`);
      console.log(`submitModal.js: user name: ${discord_user.name}`);
      console.log(`submitModal.js: TAG: ${discord_user.tag}`);

      let UserInfoEmbed = new EmbedBuilder()
      .setColor("Green")
      .setTitle(`\`New User Added\`: ${data.name}`)
      // .setAuthor({ name: "New User Added", iconURL: imageUrl, url: 'https://www.notion.so/Overall-Task-List-beb4f1b15ec1443c87e16bd138832d06' })
      .setThumbnail(imageUrl)
      .addFields(
        {
          name: `\`Discord Id\`: ${data.discord_id}`,
          value: `\`Email\`: ${data.email}`
        });
      UserRegistryDatabase.queries.create.user(mongo_packet);
      interaction.reply({
          embeds: [UserInfoEmbed],
          content: `:white_check_mark: ${discord_user} You have been added to the User-Registry!`
      });
    }).catch(() => {
      // TODO: Add the user to the UserRegistry and DeadlineHistory
      interaction.reply({
        embeds: [UserInfoEmbed],
      });
      interaction.reply(`>${interaction.user} :no_entry: Could not find a user of id: \`${data.discord_id}\`!`);
      return;
    });
  }
}

module.exports = submitModal;
