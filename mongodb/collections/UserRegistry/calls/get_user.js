const { UserSchema } = require("../../../schemas/User");
const get_user = ({ UserRegistry }) =>
  async function ({ server_id, user }) {
    let result = {
      status: null,
      error: null,
      payload: null,
    };
    try {
      result.status = 1;
      let UserList = await UserRegistry.findOne({
        _id: server_id,
      });
      if (UserList[user]) return UserList[user];
      else throw "User not found.";
    } catch (error) {
      result.status = 0;
      result.error = error; //TODO: Replace error
      return result;
    }
  };
module.exports = { get_user };
