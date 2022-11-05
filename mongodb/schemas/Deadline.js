const { Schema } = require("../lib/Schema");

const Deadline = {
  context: null,
  finish_date: null,
  status: null,
  deadline_id: null,
  discord_id: null,
};

Deadline.context = (context) => {
  if (typeof context === "string") {
    return context;
  } else {
    throw "context has to be a string.";
  }
};
Deadline.finish_date = (finish_date) => {
  if (typeof finish_date === "string") {
    return finish_date;
  } else {
    throw "finish_date has to be a string.";
  }
};
Deadline.status = (status) => {
  if (typeof status === "string") {
    return status;
  } else {
    throw "status has to be a string.";
  }
};

Deadline.deadline_id = (deadline_id) => {
  if (typeof deadline_id === "string") {
    return deadline_id;
  } else {
    throw "deadline_id has to be a string.";
  }
};

Deadline.discord_id = (discord_id) => {
  if (typeof discord_id === "string") {
    return discord_id;
  } else {
    throw "discord_id has to be a string.";
  }
};
const DeadlineSchema = new Schema(Deadline);

module.exports = { DeadlineSchema };
