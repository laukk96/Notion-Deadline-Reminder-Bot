const { ClubSchema } = require("../../../schemas/ClubInfo");

const get_info = ({ ClubInfo }) =>
  async function ({ server_id, data }) {
    let result = {
      status: null,
      error: null,
      payload: null,
    };
    try {
      let Club_Data = ClubSchema.exclude(data);
      const guild_data = await ClubInfo.findOne({ _id: server_id });

      Club_Data._id = server_id;
      // Club not found:
      if (!guild_data) {
        result.status =
          "Could not find the server inside the ClubInfo Collection";
        result.payload = null;
        // Club found, returning all info from ClubInfo
      } else {
        result.payload = guild_data;
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
module.exports = { get_info };
