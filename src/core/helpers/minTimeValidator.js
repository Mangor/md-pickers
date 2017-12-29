/* global moment, angular */

function minTimeValidator(value, format, minTime) {
  return compareValidator(value, format, minTime, function(t, mt) {
    return t.isSameOrAfter(mt);
  });
}
