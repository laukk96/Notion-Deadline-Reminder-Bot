const { UserSchema } = require("../../../schemas/user");
const create_user = ({ UserRegistry }) =>
  async function ({ server_id, data }) {
    let result = {
      status: null,
      error: null,
      payload: null,
    };
    try {
      const User = UserSchema.exclude(data);
      const server = await UserRegistry.findOne({ _id: server_id });

      if (!server) {
        const payload = await UserRegistry.insertOne({
          _id: server_id,
          [User.discord_id]: User,
        });
        result.payload = payload;
      } else {
        const payload = await UserRegistry.updateOne(
          { _id: server_id },
          { $set: { [User.discord_id]: User } }
        );
        result.payload = payload;
      }

      result.status = 1;
    } catch (error) {
      result.error = error; //TODO: replace error
      result.status = 0;
    } finally {
      return result;
    }
    //TODO: Validate Strings
  };
module.exports = { create_user };
