const { Schema } = require("../lib/Schema");
let Deadline = {
  date_assigned: null,
  finish_date: null,
  text: null,
};
let DeadlineMeta = {
  user_id: null,
  all_deadlines: null,
};
let DeadlineRequest = {
  user_id: null,
  date_assigned: null,
  finish_date: null,
  text: null,
};
//Deadline filters
Deadline.date_assigned = (date) => {
  if (typeof date === "string") {
    return date;
  } else {
    throw "Wrong type.";
  }
};
Deadline.finish_date = (date) => {
  if (typeof date === "string") {
    return date;
  } else {
    throw "Wrong type.";
  }
};
Deadline.text = (text) => {
  if (typeof text === "string") {
    return text;
  } else {
    throw "Wrong type.";
  }
};

//DeadlineMeta filters
DeadlineMeta.user_id = (id) => {
  if (typeof id === "string") {
    return id;
  } else {
    throw "Wrong type.";
  }
};
DeadlineMeta.all_deadlines = (array) => {
  if (array.length > 0) return array;
  else {
    //TODO: parse through array
    return array;
  }
};

//DeadlineRequest filters
DeadlineRequest.user_id = DeadlineMeta.user_id;
DeadlineRequest.text = Deadline.text;
DeadlineRequest.date_assigned = Deadline.date_assigned;
DeadlineRequest.finish_date = Deadline.finish_date;

const DeadlineSchema = new Schema(Deadline);
const DeadlineMetaSchema = new Schema(DeadlineMeta);
const DeadlineRequestSchema = new Schema(DeadlineRequest);
module.exports = { DeadlineMetaSchema, DeadlineSchema, DeadlineRequestSchema }; 
