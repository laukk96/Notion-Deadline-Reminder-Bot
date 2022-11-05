// const { get_deadline } = require("./calls/get_deadline");
// const { create_deadline } = require("./calls/create_deadline");

const { rate_limiter } = require("../../lib/ratelimiter");
const queries = (Dependencies) => {
  return {
    get: {
      // deadline: rate_limiter(() => get_deadline(Dependencies)),
    },
    create: {
      // deadline: rate_limiter(() => create_deadline(Dependencies)),
    },
    update: {},
  };
};
module.exports = { queries };
