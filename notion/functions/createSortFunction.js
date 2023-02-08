module.exports = function (arr) {
  arr.insert = function (newDeadline) {
    arr.push(newDeadline);
  };
};
