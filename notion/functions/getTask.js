module.exports = async function (name, ClubInfo) {
  console.log("Searching for " + name + "'s task...");

  const response = await this.notion.databases.query({
    database_id: ClubInfo.database_id,
  });
  const data = [];
  for (let i = 0; i < response.results.length; i++) {
    // console.log(response.results[i]['properties']['Person']['people'][0]['name']);
    if (response.results[i]["properties"]["Deadline"]["date"] != null) {
      const peopleArray = response.results[i]["properties"]["Taskee"]["people"];

      for (let j = 0; j < peopleArray.length; j++) {
        if (peopleArray[j]["name"] != null) {
          if (peopleArray[j]["name"].includes(name)) {
            data.push({
              task_name:
                response.results[i]["properties"]["Task"]["title"][0][
                  "plain_text"
                ],
              tast_due:
                response.results[i]["properties"]["Deadline"]["date"]["start"],
            });
            console.log(
              "\n======================================================"
            );
            console.log();
            console.log(
              response.results[i]["properties"]["Task"]["title"][0][
                "plain_text"
              ]
            );
            console.log(
              "Finish Date: ",
              response.results[i]["properties"]["Deadline"]["date"]["start"]
            );
          }
        }
      }
    }
  }
  console.log("\n======================================================");
  return data;
};
