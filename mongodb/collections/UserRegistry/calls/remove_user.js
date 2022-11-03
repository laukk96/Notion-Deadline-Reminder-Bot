const { UserSchema } = require("../../../schemas/User");

const remove_user = ({ UserRegistry }) =>
  function (user, server_id) {
    const result = {
      payload: null,
      status: null,
      error: null,
    };
    try {
      const user_query_data = UserSchema.intersect(user);
      const payload = UserRegistry.remove(user_query_data, { justOne: true });
      result.payload = payload;
      result.status = 1;
    } catch (error) {
      result.status = 0;
      result.error = error;
    } finally {
      return result;
    }
  };

module.exports = { remove_user };
