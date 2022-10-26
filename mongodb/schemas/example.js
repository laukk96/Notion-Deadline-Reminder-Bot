const { Schema } = require("../lib/Schema");

const Collection = {
  database_name: null,
  collection_name: null,
};
Collection.database_name = (value) => {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    throw "⛔ Wrong datatype";
  }
};
Collection.collection_name = (value) => {
  if (typeof value === "string") {
    return value;
  } else {
    throw "⛔ Wrong datatype";
  }
};
const CollectionSchema = new Schema(Collection);
module.exports = { CollectionSchema };
