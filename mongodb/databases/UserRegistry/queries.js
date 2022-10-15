const get_user = require("./calls/get_user");
export const queries = (MongoDBClient) => {
  return {
    get: {
      user: get_user(MongoDBClient),
    },
    create: {},
    update: {},
  };
};
