const { Schema } = require("../lib/Schema");

const DeadlineHistory = {
  guild_id: null,
};

DeadlineHistory.guild_id = (context) => {
  if (typeof context === "string") {
    return context;
  } else {
    throw "Guild Id has to be a string.";
  }
};
module.exports = { DeadlineHistorySchema };
