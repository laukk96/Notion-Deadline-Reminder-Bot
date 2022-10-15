const { user } = require("../schemas/user");
const create_user = (UserRegistry) =>
  async function (data) {
    let result = {
      status: null,
      error: null,
      payload: null,
    };
    try {
      const user_data = user(data);
      result.payload = await UserRegistry.insertOne(user_data);
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
