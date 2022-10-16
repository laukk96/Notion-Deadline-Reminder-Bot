const { rate_limiter } = require("../../lib/ratelimiter");
const { create_deadline } = require("./calls/create_deadline");
const { get_deadline } = require("./calls/get_deadline");
const { get_n_deadlines } = require("./calls/get_n_deadlines");
const { update_deadline } = require("./calls/update_deadline");
const { get_recent_deadline } = require("./calls/get_recent_deadline");
const queries = (DeadlineHistory) => {
  return {
    get: {
      deadline: rate_limiter(() => get_deadline(DeadlineHistory)),
      n_deadlines: rate_limiter(() => get_n_deadlines(DeadlineHistory)),
      recent_deadline: rate_limiter(() => get_recent_deadline(DeadlineHistory)),
    },
    create: {
      deadline: rate_limiter(() => create_deadline(DeadlineHistory)),
    },
    update: {
      deadline: rate_limiter(() => update_deadline(DeadlineHistory)),
    },
  };
};
module.exports = { queries };
