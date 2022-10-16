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
  return date;
};
Deadline.finish_date = (date) => {
  return date;
};
Deadline.text = (text) => {
  return text;
};

//DeadlineMeta filters
DeadlineMeta.user_id = (id) => {
  return id;
};
DeadlineMeta.all_deadlines = (text) => {
  return text;
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
