require("dotenv").config({ path: "../.env" });
const fs = require("fs");

async function create_path_object(path) {
  let directory_tree = {
    _root: {},
  };
  await traverse(fs.readdirSync(path), path, directory_tree._root);

  return directory_tree;
}
let Errors = [];
async function traverse(children_array, path, root) {
  for (const element of children_array) {
    if (element === "node_modules" || element === ".git") continue;

    try {
      let children = fs.readdirSync(path + element + "/");
      root[`${element}`] = {};
      await traverse(children, path + element + "/", root[`${element}`]);
    } catch (error) {
      if (element.search(".js") !== -1 && element.search(".json") === -1) {
        let summary = {};
        try {
          summary = JSON.parse(
            await summarizeFunctions(
              fs.readFileSync(path + element, { encoding: "utf8" })
            )
          );
        } catch (error) {
          console.log("could not get prompt", error.message, summary);
          Errors.push(summary);
        }
        root[element] = {
          file_type: ".js",
          functions: summary,
        };
      }
    }
  }
}
//-----------------------------------//
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);
let n = 1;
let total_queries = 0;
async function query(text) {
  total_queries += 100;
  console.log("query " + n++);
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Summarize the following code:\n${text}\nSummary:\n`,
    max_tokens: 100,
  }); //
  return completion.data.choices[0].text;
}

async function summarizeFunctions(text) {
  total_queries += 100;
  console.log("query " + n++);
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Code:\n${text}\nSummarize all the functions and follow the format strictly:\n{
      "create_path_object": {
        "function": "Creates a directory tree object with summaries of the files found in the given path",
        "parameters": ["path"],
      }
    }\nJSON Object:`,
    max_tokens: 1000,
    temperature: 0,
    presence_penalty: -1.5,
  }); //
  console.log(completion.data.choices[0].text);
  return completion.data.choices[0].text;
}

create_path_object("../").then((directory) => {
  console.log(directory);
  fs.writeFileSync(
    "./documentation/documentation_tree2.json",
    JSON.stringify(directory)
  );
  fs.writeFileSync("./documentation/errors.json", JSON.stringify(Errors));
});
