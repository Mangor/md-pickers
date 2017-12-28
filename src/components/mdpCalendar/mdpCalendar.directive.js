var mdpCalendarDirective = function($animate) {
  return {
    restrict: 'E',
    bindToController: {
      "date": "=",
      "minDate": "=",
      "maxDate": "=",
      "dateFilter": "="
    },
    templateUrl: 'mdpcalendar.directive.html',
    controller: ["$scope", CalendarCtrl],
    controllerAs: "calendar",
    link: function(scope, element, attrs, ctrl) {
      var animElements = [
        element[0].querySelector(".mdp-calendar-week-days"),
        element[0].querySelector('.mdp-calendar-days'),
        element[0].querySelector('.mdp-calendar-monthyear')
      ].map(function(a) {
        return angular.element(a);
      });

      scope.$watch(function() {
        return ctrl.date.format("YYYYMM");
      }, function(newValue, oldValue) {
        var direction = null;

        if (newValue > oldValue)
          direction = "mdp-animate-next";
        else if (newValue < oldValue)
          direction = "mdp-animate-prev";

        if (direction) {
          for (var i in animElements) {
            animElements[i].addClass(direction);
            $animate.removeClass(animElements[i], direction);
          }
        }
      });
    }
  };
};
module.directive("mdpCalendar", ["$animate", mdpCalendarDirective]);
