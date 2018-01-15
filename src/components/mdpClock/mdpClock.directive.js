/* global moment, angular */

var mdpClockDirective = function($animate, $timeout) {
  return {
    restrict: "E",
    bindToController: {
      "type": "@?",
      "time": "=",
      "autoSwitch": "=?",
      "ampm": "=?"
    },
    replace: true,
    templateUrl: "mdpClock.directive.html",
    controller: "ClockCtrl",
    controllerAs: "clock",
    link: function(scope, element, attrs, ctrl) {
      var pointer, timepickerCtrl, onEvent, containerCoords, x, y, deg;

      pointer = angular.element(element[0].querySelector(".mdp-pointer"));

      timepickerCtrl = scope.$parent.timepicker;
      scope.raised = false;

      onEvent = function(event) {
        containerCoords = event.currentTarget.getClientRects()[0];
        x = ((event.currentTarget.offsetWidth / 2) - (event.pageX - containerCoords.left));
        y = ((event.pageY - containerCoords.top) - (event.currentTarget.offsetHeight / 2));
        deg = Math.round((Math.atan2(x, y) * (180 / Math.PI)));

        $timeout(function() {
          ctrl.setTimeByDeg(deg + 180);
          if (ctrl.autoSwitch && ["mouseup", "click"].indexOf(event.type) !== -1 && timepickerCtrl) {
            timepickerCtrl.switchView();
          }
        });
      };

      element.on("mousedown", function() {
        element.on("mousemove", onEvent);
      });

      element.on("mouseup", function(e) {
        element.off("mousemove");
      });

      element.on("click", onEvent);
      scope.$on("$destroy", function() {
        element.off("click", onEvent);
        element.off("mousemove", onEvent);
      });
    }
  };
};

mdpClockDirective.$inject = [
  "$animate",
  "$timeout"
];

module.directive("mdpClock", mdpClockDirective);
