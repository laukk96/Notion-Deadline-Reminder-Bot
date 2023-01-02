// This code is used to initialize the application commands
const { REST, Routes } = require("discord.js"); // Importing the REST and Routes from the Discord.js library
const commands = require("../command_list"); // Importing the command list from a separate file
const { TOKEN, CLIENT_ID } = require("../config"); // Importing the token and the client ID from the config file
const chalk = require("chalk");
module.exports.initialize = async function () {
  // Exporting the initialize function
  const rest = new REST({
    // Setting up the REST
    version: "10",
  }).setToken(TOKEN); // Setting the token for the REST

  try {
    console.log(
      chalk.yellow("Discord: Started refreshing application (/) commands.")
    ); // Logging that the application commands are being refreshed

    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      // Sending a PUT request to the applicationCommands route with the client ID
      body: commands.Array, // Setting the body of the request to the commands array
    });

    console.log(
      chalk.green("Discord: Successfully reloaded application (/) commands.")
    ); // Logging that the application commands were successfully refreshed
    console.log(chalk.green("Discord: Discord bot is live! 🤖"));
  } catch (error) {
    // Handling any errors
    console.error(error); // Logging the error
  }
};
