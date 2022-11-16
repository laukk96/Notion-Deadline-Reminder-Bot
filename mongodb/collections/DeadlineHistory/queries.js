const { get_deadline } = require("./calls/get_deadline");
const { create_deadline } = require("./calls/create_deadline");
const { rate_limiter } = require("../../lib/ratelimiter");
const { RateLimitError } = require("discord.js");
const { create_guild_key } = require("./calls/create_guild_key");
const queries = (Dependencies) => {
  return {
    get: {
      deadline: rate_limiter(() => get_deadline(Dependencies)),
    },
    create: {
      deadline: rate_limiter(() => create_deadline(Dependencies)),
      deadline_history: rate_limiter(() => create_guild_key(Dependencies)),
    },
    update: {},
  };
};
module.exports = { queries };
