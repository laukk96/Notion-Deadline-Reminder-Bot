const { Schema } = require("../lib/Schema");

const DeadlineHistory = {
  context: null,
  finish_date: null,
  status: null,
  deadline_id: null,
};

DeadlineHistory.context = (context) => {
  if (typeof context === "string") {
    return context;
  } else {
    throw "context has to be a string.";
  }
};
DeadlineHistory.finish_date = (finish_date) => {
  if (typeof finish_date === "string") {
    return finish_date;
  } else {
    throw "finish_date has to be a string.";
  }
};
DeadlineHistory.status = (status) => {
  if (typeof status === "string") {
    return status;
  } else {
    throw "status has to be a string.";
  }
};

DeadlineHistory.deadline_id = (deadline_id) => {
  if (typeof deadline_id === "string") {
    return deadline_id;
  } else {
    throw "deadline_id has to be a string.";
  }
};

const DeadlineHistorySchema = new Schema(DeadlineHistory);
module.exports = { DeadlineHistorySchema };
