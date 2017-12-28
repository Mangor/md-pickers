/* global moment, angular */

function filterValidator(value, format, filter) {
  var date = angular.isDate(value) ? moment(value) : moment(value, format, true);

  return !value ||
    angular.isDate(value) ||
    !angular.isFunction(filter) ||
    !filter(date.toDate());
}
