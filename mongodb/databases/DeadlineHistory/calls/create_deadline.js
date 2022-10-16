const {
  DeadlineMetaSchema,
  DeadlineSchema,
  DeadlineRequestSchema,
} = require("../../../schemas/deadlines");
const create_deadline = (DeadlineHistory) =>
  async function (data) {
    let result = {
      status: null,
      error: null,
      payload: null,
    };

    try {
      let request_data = DeadlineRequestSchema.exclude(data);
      let deadline = DeadlineSchema.exclude({
        date_assigned: request_data.date_assigned,
        finish_date: request_data.finish_date,
        text: request_data.text,
      });
      let deadline_meta = DeadlineMetaSchema.exclude({
        user_id: request_data.user_id,
        all_deadlines: [deadline],
      });
      const payload = await DeadlineHistory.insertOne(deadline_meta);
      result.payload = payload;
      result.status = 1;
    } catch (error) {
      result.error = error; //TODO: replace error
      result.status = 0;
    } finally {
      return result;
    }
    //TODO: Validate Strings
  };
module.exports = { create_deadline };
