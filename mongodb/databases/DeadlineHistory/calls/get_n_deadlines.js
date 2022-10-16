const {
  DeadlineMetaSchema,
  DeadlineSchema,
  DeadlineRequestSchema,
} = require("../../../schemas/deadlines");

const get_n_deadlines = (DeadlineHistory) =>
  async function (n) {
    const result = {
      status: null,
      error: null,
      payload: null,
    };
    try {
      result.status = 1;
      result.payload = await DeadlineHistory.find().limit(n).toArray();
      return result;
    } catch (error) {
      result.status = 0;
      result.error = error; //TODO: Replace error
      return result;
    }
  };
module.exports = { get_n_deadlines };
