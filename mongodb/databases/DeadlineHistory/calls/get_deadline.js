const {
  DeadlineMetaSchema,
  DeadlineSchema,
  DeadlineRequestSchema,
} = require("../../../schemas/deadlines");

const get_deadline = (DeadlineHistory) =>
  async function (data) {
    const result = {
      status: null,
      error: null,
      payload: null,
    };
    const request_data = DeadlineRequestSchema.intersect(data); //Apply a user schema to object
    //TODO: Validate Strings

    try {
      result.status = 1;
      const payload = await DeadlineHistory.findOne(request_data);
      result.payload = DeadlineMetaSchema.exclude(payload);
      result.payload.all_deadlines = result.payload.all_deadlines.map(
        (deadline) => DeadlineSchema.exclude(deadline)
      );
      return result;
    } catch (error) {
      result.status = 0;
      result.error = error; //TODO: Replace error
      return result;
    }
  };
module.exports = { get_deadline };
