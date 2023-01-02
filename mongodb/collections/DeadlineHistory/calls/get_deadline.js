const { DeadlineSchema } = require("../../../schemas/Deadline");
const get_deadline = ({ DeadlineHistory }) =>
  async function (data) { 
    const result = {
      status: null,
      error: null,
      payload: null,
    }; //This object will notify the end user the result of their query
    const Deadline = DeadlineSchema.intersect(data); //Only allow properties that are also in DeadlineSchema and are not null.
    //TODO: Validate Strings
    //Put Precedence in checking by id.
    try {
      result.status = 1;
      const payload = await DeadlineHistory.findOne(Deadline);
      result.payload = DeadlineSchema.exclude(payload); //Force all the properties of DeadlineSchema
      return result;
    } catch (error) {
      result.status = 0;
      result.error = error; //TODO: Replace error
      return result;
    }
  };
module.exports = { get_deadline };
