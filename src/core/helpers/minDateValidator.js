/* global moment, angular */

function minDateValidator(value, format, minDate) {
  var currentMinDate = moment(minDate, "YYYY-MM-DD", true);
  var date = angular.isDate(value) ? moment(value) : moment(value, format, true);

  return !value ||
    angular.isDate(value) ||
    !currentMinDate.isValid() ||
    date.isSameOrAfter(currentMinDate);
}
