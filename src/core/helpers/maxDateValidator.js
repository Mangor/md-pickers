/* global moment, angular */

function maxDateValidator(value, format, maxDate) {
  var currentMaxDate = moment(maxDate, "YYYY-MM-DD", true);
  var date = angular.isDate(value) ? moment(value) : moment(value, format, true);

  return !value ||
    angular.isDate(value) ||
    !currentMaxDate.isValid() ||
    date.isSameOrBefore(currentMaxDate);
}
