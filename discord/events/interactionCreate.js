const commands = require("../command_list");
const modalSubmitHandler = require("../interactions/modals/modalSubmitHandler");
const selectMenu = require("../interactions/menu/selectMenu");
const chalk = require("chalk");

module.exports = (client, packages) =>
  async function interactionCreate(interaction) {
    if (interaction.isChatInputCommand()) {
      if (commands.Object[interaction.commandName]) {
        commands.Object[interaction.commandName].interaction(
          interaction,
          packages
        );
      } else {
      }
    } else if (interaction.isModalSubmit() || interaction.isButton()) {
      modalSubmitHandler(interaction, packages);
    } else if (interaction.isSelectMenu()) {
      selectMenu(interaction, packages);
    }
  };
