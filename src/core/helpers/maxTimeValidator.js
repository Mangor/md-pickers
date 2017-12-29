/* global moment, angular */

function maxTimeValidator(value, format, maxTime) {
  return compareValidator(value, format, maxTime, function(t, mt) {
    return t.isSameOrBefore(mt);
  });
}
