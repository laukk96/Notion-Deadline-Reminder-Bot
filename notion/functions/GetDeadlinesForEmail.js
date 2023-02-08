module.exports = async function (email) {
  console.log("in notion.js : GetDeadinesForEmail called! =", email);
  const response = await this.notion.databases.query({
    database_id: this.connectDatabase,
  });

  var allUserDeadlines = [];
  // createSortFunction(allUserDeadlines);

  outerloop: for (let i = 0; i < response.results.length; i++) {
    const properties = response.results[i]["properties"];
    const task = properties["Task"];
    const deadline = properties["Deadline"];

    if (deadline["date"] != null) {
      const peopleArray = properties["Taskee"]["people"];
      let j = 0;
      while (j < peopleArray.length) {
        // Make sure the object has a person and email property
        if ("person" in peopleArray[j] && "email" in peopleArray[j]["person"]) {
          const theEmail = peopleArray[j]["person"]["email"].toUpperCase();
          if (theEmail.includes(email)) {
            // Create a deadline dictionary, with name / Date object
            var deadline_dict = {
              name: task["title"][0]["plain_text"],
              date: new Date(deadline["date"]["start"]),
            };

            // Add it to the array of deadlines
            allUserDeadlines.push(deadline_dict);
            continue outerloop;
          }
        }
        j++;
      }
    }
  }
  //console.log(response.results[deadLineIndex]['properties']['Taskee'][personIndex]['people']['id']);
  // SOURCE Date Sort: https://masteringjs.io/tutorials/fundamentals/sort-by-date#:~:text=Similarly%2C%20sorting%20an%20array%20of,in%20the%20sort()%20callback.
  allUserDeadlines.sort((a, b) => b.date - a.date);
  console.log(allUserDeadlines);
  return allUserDeadlines;
};
