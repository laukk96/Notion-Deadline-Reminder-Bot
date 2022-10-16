const { Schema } = require("../../../lib/Schema");

const UserSchema = new Schema({
  name: null,
  notion_id: null,
  email: null,
  discord_id: null,
  uid: null,
});
module.exports = { UserSchema };
