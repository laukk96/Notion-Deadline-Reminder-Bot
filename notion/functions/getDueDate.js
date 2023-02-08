module.exports = async function (deadline) {
  const response = await this.notion.databases.query({
    database_id: this.connectDatabase,
  });

  for (let i = 0; i < response.results.length; i++) {
    // console.log(response.results[i]['properties']['Person']['people'][0]['name']);
    if (response.results[i]["properties"]["Deadline"]["date"] != null) {
      if (
        response.results[i]["properties"]["Task"]["title"][0][
          "plain_text"
        ].includes(deadline)
      ) {
        console.log(
          "Finish Date: ",
          response.results[i]["properties"]["Deadline"]["date"]["start"]
        );
      }
    }
  }
};
