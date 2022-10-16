const { UserSchema } = require("../schemas/user");
const get_user = (UserRegistry) =>
  async function (data) {
    const result = {
      status: null,
      error: null,
      payload: null,
    };
    const user_data = UserSchema.exclude(data); //Apply a user schema to object
    const { uid, name } = user_data;
    //TODO: Validate Strings
    if (uid) {
      //Put Precedence in checking by id.
      try {
        result.status = 1;
        const payload = await UserRegistry.findOne(user_data);
        result.payload = UserSchema.intersect(payload);
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
