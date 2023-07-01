function getDatesBetween(startDate, endDate) {
  var start = new Date(startDate);
  var end = new Date(endDate);
  var dates = [];

  while (start <= end) {
    dates.push(start.toISOString().split('T')[0]);
    start.setDate(start.getDate() + 1);
  }

  return dates;
}

function getCurrentDate() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
  
module.exports = {
  getDatesBetween,
  getCurrentDate
}