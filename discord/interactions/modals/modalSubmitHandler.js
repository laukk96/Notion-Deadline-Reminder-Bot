const configureNotionModal = require("./components/configureNotionModal");
const adduserModal = require("./components/adduserModal");
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
  //console.log("Packages:", packages);
  if (interaction.customId == "initiateModal") {
    await adduserModal(interaction, packages);
  } else if (interaction.customId == "adduserModal") {
    await adduserModal(interaction, packages);
  } else if (interaction.customId == "configureNotionModal") {
    await configureNotionModal(interaction, packages);
  }
}

module.exports = submitModal;
