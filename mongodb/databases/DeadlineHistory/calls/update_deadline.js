const {
  DeadlineMetaSchema,
  DeadlineSchema,
  DeadlineRequestSchema,
} = require("../../../schemas/deadlines");

const update_deadline = (DeadlineHistory) =>
  async function (request, data) {
    const result = {
      status: null,
      error: null,
      payload: null,
    };
    let query_data = DeadlineMetaSchema.intersect(request);
    let update_data = DeadlineRequestSchema.exclude(data);
    let deadline = DeadlineSchema.exclude({
      date_assigned: update_data.date_assigned,
      finish_date: update_data.finish_date,
      text: update_data.text,
    });
    // let deadline_meta = DeadlineMetaSchema.exclude({
    //   user_id: update_data.user_id,
    //   all_deadlines: [deadline],
    // });
    insert_operation = {
      $push: {
        all_deadlines: deadline,
      },
    };
    try {
      result.status = 1;
      result.payload = await DeadlineHistory.updateOne(
        query_data,
        insert_operation
      );
      return result;
    } catch (error) {
      result.status = 0;
      result.error = error; //TODO: Replace error
      return result;
    }
  };
module.exports = { update_deadline };
