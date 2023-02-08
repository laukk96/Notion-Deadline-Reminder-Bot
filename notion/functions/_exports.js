const GetDeadlinesForEmail = require("./GetDeadlinesForEmail");
const getDueDate = require("./getDueDate");
const getPerson = require("./getPerson");
const getTask = require("./getTask");
const checkDataBase = require("./checkDatabase");
const PushDeadlines = require("./PushDeadlines");
const AddUser = require("./AddUser");
const createSortFunction = require("./createSortFunction");
module.exports = {
  GetDeadlinesForEmail,
  getDueDate,
  getPerson,
  getTask,
  checkDataBase,
  PushDeadlines,
  AddUser,
  createSortFunction,
};
