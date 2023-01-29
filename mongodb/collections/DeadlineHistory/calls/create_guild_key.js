const { TemplateSchema } = require("../../../schemas/Template");
const create_guild_key = ({ DeadlineHistory }) =>
  async function ({ server_id, data }) {
    let result = {
      status: null,
      error: null,
      payload: null,
    };
    try {
      let Template = TemplateSchema.exclude(data);
      const guild_key = await DeadlineHistory.findOne({ _id: server_id });
      Template._id = server_id;
      // Initiate command starts
      if (!guild_key) {
        const payload = await DeadlineHistory.insertOne(
           Template
        );
        result.payload = payload;
      // If they run the initiate command AGAIN (test)
      } else { 
        const payload = await DeadlineHistory.updateOne(
          { _id: server_id },
          { $set: Template }
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
    //TODO: Validate Strings
  };
module.exports = { create_guild_key };
