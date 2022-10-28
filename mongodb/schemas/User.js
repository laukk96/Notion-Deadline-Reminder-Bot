const { Schema } = require("../lib/Schema");

const User = {
  name: null,
  notion_id: null,
  email: null,
  discord_id: null,
};
User.name = (value) => {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    throw "⛔ Wrong datatype";
  }
};
User.notion_id = (value) => {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    throw "⛔ Wrong datatype";
  }
};
User.email = (value) => {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    throw "⛔ Wrong datatype";
  }
};
User.discord_id = (value) => {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    throw "⛔ Wrong datatype";
  }
};

const UserSchema = new Schema(User);
module.exports = { UserSchema };
