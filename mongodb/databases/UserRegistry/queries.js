const { get_user } = require("./calls/get_user");
const { create_user } = require("./calls/create_user");
const queries = (UserRegistry) => {
  return {
    get: {
      user: get_user(UserRegistry),
    },
    create: {
      user: create_user(UserRegistry),
    },
    update: {},
  };
};
module.exports = { queries };
