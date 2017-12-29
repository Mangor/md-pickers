/* global moment, angular */

function compareValidator(value, format, otherDate, comparator) {
  // take only the date part, not the time part
  if (angular.isDate(otherDate)) {
    otherDate = moment(otherDate).format(format);
  }
  otherDate = moment(otherDate, format, true);
  var date = angular.isDate(value) ? moment(value) : moment(value, format, true);

  return !value ||
    angular.isDate(value) ||
    !otherDate.isValid() ||
    comparator(date, otherDate);
}
