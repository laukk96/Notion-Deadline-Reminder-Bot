// const { get_deadline } = require("./calls/get_deadline");
// const { create_deadline } = require("./calls/create_deadline");

const { rate_limiter } = require("../../lib/ratelimiter");
const { create_guild_key } = require("./calls/create_guild_key");
const { get_info } = require("./calls/get_info");


const queries = (Dependencies) => {
  return {
    get: {
      // deadline: rate_limiter(() => get_deadline(Dependencies)),
      info: rate_limiter(() => get_info(Dependencies)),
    },
    create: {
      // deadline: rate_limiter(() => create_deadline(Dependencies)),
      club: rate_limiter(() => create_guild_key(Dependencies)),
    },  
    update: {},
  };
};
module.exports = { queries };
