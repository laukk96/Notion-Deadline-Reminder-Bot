const { EmbedBuilder } = require("discord.js");
const chalk = require("chalk");
module.exports = function ErrorHandler({ object, message, code }) {
  console.log(chalk.red(`⚠️\n${message}\n`, object, "\n⚠️"));
  return {
    getEmbed: () => {
      return new EmbedBuilder()
        .setTitle("⛔ Error!")
        .setDescription(`${message}`)
        .setColor("fc3c32");
    },
    code: code,
    message: message,
    sendReport: sendReport(object, message, code),
  };
};

var sendReport = (object, message, code) => function () {};
