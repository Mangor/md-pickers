/* global moment, angular */

function minTimeValidator(value, format, minTime) {
  return compareTimeValidator(value, format, minTime, function(t, mt) {
    return t.isSameOrAfter(mt);
  });
}
