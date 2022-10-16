const { UserSchema } = require("../schemas/user");
const create_user = (UserRegistry) =>
  async function (data) {
    let result = {
      status: null,
      error: null,
      payload: null,
    };

    try {
      const user_data = UserSchema.exclude(data);
      const payload = await UserRegistry.insertOne(user_data);
      result.payload = payload;
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
