const { EmbedBuilder, Client } = require("discord.js");
const chalk = require("chalk");
let _client = null;

const codes = {
  [-1]: ["Critical Error", "#d63d1e"],
  [0]: ["Error", "#cf6a1d"],
  [1]: ["Warning Error", "#d6d12d"],
};

// const admins = [
//   "681810649331793920",
//   "263853089419821056",
//   "296496746874404867",
//   "191680573389930497",
// ];
module.exports = function ErrorHandler({ object, message, code = 0 } = {}) {
  if (object && message) {
    console.log(chalk.red(`⚠️\n${message}\n`, object, "\n⚠️"));
    const trace = Error().stack.split("\n").slice(2).join("\n\n>");
    sendReport(object, message, codes[code], trace)();
  }

  return {
    getEmbed: () => {
      return new EmbedBuilder()
        .setTitle("⛔ Error!")
        .setDescription(`${message}`)
        .setColor("fc3c32");
    },
    code: code,
    message: message,
    initiate: (client) => {
      if (client) _client = client;
    },
  };
};

var sendReport = (object, message, code, trace) =>
  function () {
    const reportLog = new EmbedBuilder()
      .setTitle(`${new Date()}`)
      .setDescription(
        `**${message}**\n**Error Object:\n**\`${JSON.stringify(
          object
        )}\`\n**Trace:**\n>${trace}`
      )
      .setColor(code[1]);
    if (_client === undefined) return;

    _client.channels.cache.get("1077279638419685376").send({
      embeds: [reportLog],
    });
  };
