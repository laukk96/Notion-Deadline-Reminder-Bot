const { Schema } = require("../lib/Schema");
//Represents the abstract structure
let User = {
  name: null,
  notion_id: null,
  email: null,
  discord_id: null,
  uid: null,
};

//Represents the data type for each property of the User. You can think of this as the method we verify fields.
User.name = (name) => {
  return name;
};
User.notion_id = (notion_id) => {
  return notion_id;
};
User.email = (email) => {
  return email;
};
User.discord_id = (discord_id) => {
  return discord_id;
};
User.uid = (uid) => {
  return uid;
};
const UserSchema = new Schema(User);
module.exports = { UserSchema };
