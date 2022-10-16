const {
  DeadlineMetaSchema,
  DeadlineSchema,
  DeadlineRequestSchema,
} = require("../../../schemas/deadlines");

const get_recent_deadline = (DeadlineHistory) =>
  async function () {
    const result = {
      status: null,
      error: null,
      payload: null,
    };
    try {
      result.status = 1;
      result.payload = await DeadlineHistory.find()
        .limit(1)
        .sort({ $natural: -1 })
        .toArray();
      return result;
    } catch (error) {
      result.status = 0;
      result.error = error; //TODO: Replace error
      return result;
    }
  };
module.exports = { get_recent_deadline };
