const { Schema } = require("../lib/Schema");

const Server = {
  mongodb_database_name: null,
  discord_guild_id: null,
};
Server.mongodb_database_name = (value) => {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    throw "⛔ Wrong datatype";
  }
};
Server.discord_guild_id = (value) => {
  if (typeof value === "string") {
    return value;
  } else {
    throw "⛔ Wrong datatype";
  }
};
const ServerSchema = new Schema(Server);
module.exports = { ServerSchema };
