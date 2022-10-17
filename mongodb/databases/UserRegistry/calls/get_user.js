const { UserSchema } = require("../../../schemas/user");
const get_user = (UserRegistry) =>
  async function (data) {
    const result = {
      status: null,
      error: null,
      payload: null,
    };
    const user_data = UserSchema.intersect(data); //Apply a user schema to object
    const { uid, name } = user_data;
    //TODO: Validate Strings

    //Put Precedence in checking by id.
    try {
      result.status = 1;
      const payload = await UserRegistry.findOne(user_data);
      result.payload = UserSchema.exclude(payload);
      return result;
    } catch (error) {
      result.status = 0;
      result.error = error; //TODO: Replace error
      return result;
    }
  };
module.exports = { get_user };
