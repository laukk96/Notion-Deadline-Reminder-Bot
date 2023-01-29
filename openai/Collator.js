const merge = require("deepmerge");
const fs = require("fs");
const { isArray } = require("util");
const source = require("./documentation/documentation_tree.json");
const value2 = require("./documentation/documentation_tree2.json");
target = merge(source, value2);
function traverse(jsonObj) {
  if (jsonObj !== null && typeof jsonObj == "object") {
    Object.entries(jsonObj).forEach(([key, value]) => {
      if (
        jsonObj.file_type === undefined &&
        key.search(".js") === -1 &&
        isNaN(key) &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        value.function === undefined
      ) {
        jsonObj[key] = undefined;
        jsonObj[key + `/`] = value;
      }
      // key is either an array index or object key
      traverse(value);
    });
  } else {
    // jsonObj is a number or string
  }
}
traverse(target);
fs.writeFileSync("./documentation/final.json", JSON.stringify(target));
