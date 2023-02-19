const update_notion_properties = ({ ClubInfo }) =>
  async function ({ server_id, data }) {
    let result = {
      status: null,
      error: null,
      payload: null,
    };
    try {
      const guild_data = await ClubInfo.findOne({ _id: server_id });
      // Club not found:
      console.log(server_id, data);
      if (!guild_data) {
        result.status =
          "Could not find the server inside the ClubInfo Collection";
        result.payload = null;
        // Club found, returning all info from ClubInfo
      } else {
        await ClubInfo.updateOne(
          { _id: server_id },
          {
            $set: {
              deadline_property_name: data.deadline_property_name,
              task_property_name: data.task_property_name,
            },
          }
        );
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
module.exports = { update_notion_properties };
