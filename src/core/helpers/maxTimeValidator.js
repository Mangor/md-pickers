/* global moment, angular */

function maxTimeValidator(value, format, maxTime) {
  return compareTimeValidator(value, format, maxTime, function(t, mt) {
    return t.isSameOrBefore(mt);
  });
}
