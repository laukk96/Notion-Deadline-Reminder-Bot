const commands = require("../command_list");
const submitModal = require("../interactions/modals/submitModal");
const selectMenu = require("../interactions/menu/selectMenu");
const chalk = require("chalk");

module.exports = (client, packages) =>
  async function interactionCreate(interaction) {
    if (interaction.isChatInputCommand()) {
      if (commands.Object[interaction.commandName]) {
        commands.Object[interaction.commandName].interaction(interaction, packages);
      } else {

      }
    } else if (interaction.isModalSubmit() || interaction.isButton()) {
      submitModal(interaction, packages);
    } else if (interaction.isSelectMenu()) {
      selectMenu(interaction, packages);
    }
  };
