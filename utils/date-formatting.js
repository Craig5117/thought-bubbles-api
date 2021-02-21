const { format } = require("date-fns");

function formatDate(date) {
  return `${format(date, "MMM do, yyyy")} at ${format(date, "h:mm aaa")}`;
};


module.exports = formatDate;
