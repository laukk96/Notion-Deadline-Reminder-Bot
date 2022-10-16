const { user } = require("../schemas/user");
get_user = (UserRegistry) =>
  async function (data) {
    const result = {
      status: null,
      error: null,
      payload: null,
    };
    const user_data = user(data); //Apply a user schema to object
    const { uid, name } = user_data;
    //TODO: Validate Strings
    if (uid) {
      //Put Precedence in checking by id.
      try {
        result.status = 1;
        result.payload = user(await UserRegistry.findOne(user_data));
        return result;
      } catch (error) {
        result.status = 0;
        result.error = error; //TODO: Replace error
        return result;
      }
    } else if (name) {
      try {
      } catch (error) {}
    }
  };
module.exports = { get_user };
