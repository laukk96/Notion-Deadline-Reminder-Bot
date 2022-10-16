const { Schema } = require("../lib/Schema");
//Represents the abstract structure
const NAME_LENGTH = 12;
let User = {
  name: null,
  notion_id: null,
  email: null,
  discord_id: null,
  uid: null,
};

//Represents the data type for each property of the User. You can think of this as the method we verify fields.
User.name = (name) => {
  if (typeof name === "string") {
    if (name.length <= NAME_LENGTH) {
      return name;
    } else {
      throw "Name is too long.";
    }
  } else {
    throw "Wrong type.";
  }
};
User.notion_id = (notion_id) => {
  if (typeof notion_id === "string") {
    return notion_id;
  } else {
    throw "Wrong type.";
  }
};
User.email = (email) => {
  if (typeof email === "string") {
    return email;
  } else {
    throw "Wrong type.";
  }
};
User.discord_id = (discord_id) => {
  if (typeof discord_id === "string") {
    return discord_id;
  } else {
    throw "Wrong type.";
  }
};
User.uid = (uid) => {
  if (typeof uid === "string") {
    return uid;
  } else {
    throw "Wrong type.";
  }
};
const UserSchema = new Schema(User);
module.exports = { UserSchema };
