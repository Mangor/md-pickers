/* global moment, angular */

function formatValidator(value, format) {
  return !value || angular.isDate(value) || moment(value, format, true).isValid();
}
