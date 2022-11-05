const { DeadlineSchema } = require("../../../schemas/Deadline");

const create_deadline = ({ DeadlineHistory }) =>
  async function (data, server_id) {
    let result = {
      status: null,
      payload: null,
      error: null,
    };
    try {
      const Deadline = DeadlineSchema.intersect(data);
      const server = await DeadlineHistory.findOne({ _id: server_id });

      if (!server) {
        const payload = await DeadlineHistory.insertOne({
          _id: server_id,
          [Deadline.discord_id]: Deadline,
        });
        result.payload = payload;
      } else {
        const payload = await DeadlineHistory.updateOne(
          { _id: server_id },
          { $set: { [Deadline.discord_id]: Deadline } }
        );
        result.payload = payload;
      }

      result.status = 1;
    } catch (error) {
      result.error = error; //TODO: replace error
      result.status = 0;
    } finally {
      return result;
    }
  };

module.exports = { create_deadline };
