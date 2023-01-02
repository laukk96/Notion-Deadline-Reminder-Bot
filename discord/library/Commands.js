// This code is importing several libraries that will be needed
const chalk = require("chalk");
const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const INTERACTIONS_PATH = "./interactions/commands/";

// This function is used to generate commands
const generate_commands = (Commands) => {
  // An array to store the created slash commands
  let SlashCommands = [];
  console.log(chalk.yellow("Discord: Loading commands..."));
  // Iterating over each command in the Commands object
  Object.entries(Commands).forEach(([command_name, data]) => {
    // Creating a SlashCommandBuilder instance for the current command
    const SlashCommand = new SlashCommandBuilder()
      .setName(command_name)
      .setDescription(data.description);

    try {
      // Checking if the command file exists
      if (fs.existsSync(INTERACTIONS_PATH + command_name + ".js")) {
        // Requiring the command file if it exists
        const interaction = require("../interactions/commands/" +
          command_name +
          ".js");
        // Adding the SlashCommand to the array
        SlashCommands.push(SlashCommand);

        // Adding the interaction to the Commands object
        Commands[command_name].interaction = interaction;
        // Logging a success message to the console
        console.log(chalk.blue(`Discord: Loaded command ${command_name}✅`));
      }
      // Throwing an error if the command file does not exist
      else
        throw Error(
          `There is no ${command_name}.js under the commands folder. Please add the aforementioned file along with the command's handler.`
        );
    } catch (error) {
      // Logging the error to the console
      console.log(chalk.red(error));
    }
  });
  // Returning the SlashCommands array and the Commands object
  console.log(chalk.green("Discord: Commands successfully loaded ✅"));
  return {
    Array: SlashCommands,
    Object: Commands,
  };
};

// Exporting the generate_commands function
module.exports = {
  generate_commands,
};
