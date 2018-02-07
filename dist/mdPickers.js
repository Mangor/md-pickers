(function() {
"use strict";
angular.module('mdpTemplates', []).run(['$templateCache', function($templateCache) {$templateCache.put('mdpcalendar.directive.html','<div class="mdp-calendar">\r\n  <div\r\n    layout="row"\r\n    layout-align="space-between center">\r\n    <md-button\r\n      aria-label="previous month"\r\n      class="md-icon-button"\r\n      ng-click="calendar.prevMonth()">\r\n      <md-icon class="mdp-nav-icon" md-svg-icon="mdp-chevron-left"></md-icon>\r\n    </md-button>\r\n    <div\r\n      class="mdp-calendar-monthyear"\r\n      ng-show="!calendar.animating"\r\n      ng-bind="calendar.date.format(\'MMMM YYYY\')">\r\n    </div>\r\n    <md-button\r\n      aria-label="next month"\r\n      class="md-icon-button"\r\n      ng-click="calendar.nextMonth()">\r\n      <md-icon class="mdp-nav-icon" md-svg-icon="mdp-chevron-right"></md-icon>\r\n    </md-button>\r\n  </div>\r\n  <div\r\n    layout="row"\r\n    layout-align="space-around center"\r\n    class="mdp-calendar-week-days"\r\n    ng-show="!calendar.animating">\r\n    <div\r\n      layout\r\n      layout-align="center center"\r\n      ng-repeat="d in calendar.weekDays track by $index"\r\n      ng-bind="d">\r\n    </div>\r\n  </div>\r\n  <div\r\n    layout="row"\r\n    layout-align="start center"\r\n    layout-wrap\r\n    class="mdp-calendar-days"\r\n    ng-class="{ \'mdp-animate-next\': calendar.animating }"\r\n    ng-show="!calendar.animating"\r\n    md-swipe-left="calendar.nextMonth()"\r\n    md-swipe-right="calendar.prevMonth()">\r\n    <div\r\n      layout\r\n      layout-align="center center"\r\n      ng-repeat-start="day in calendar.daysInMonth track by $index"\r\n      ng-class="{ \'mdp-day-placeholder\': !day }">\r\n      <md-button\r\n        class="md-icon-button"\r\n        aria-label="Select day"\r\n        ng-mouseenter="raised = true"\r\n        ng-mouseleave="raised = false"\r\n        ng-if="day"\r\n        ng-class="{\r\n          \'md-accent\': calendar.date.date() == day.value,\r\n          \'md-raised\': raised || calendar.date.date() == day.value\r\n        }"\r\n        ng-click="calendar.selectDate(day.value)"\r\n        ng-disabled="!day.enabled"\r\n        ng-bind="day.value">\r\n      </md-button>\r\n    </div>\r\n    <div\r\n      flex="100"\r\n      ng-if="($index + 1) % 7 == 0"\r\n      ng-repeat-end></div>\r\n  </div>\r\n</div>\r\n');
$templateCache.put('mdpDatePickerDialog.component.html','<md-dialog\r\n  aria-label=""\r\n  class="mdp-datepicker"\r\n  ng-class="{ \'portrait\': !$mdMedia(\'gt-xs\') }">\r\n  <md-dialog-content\r\n    layout="row"\r\n    layout-wrap>\r\n    <div\r\n      layout="column"\r\n      layout-align="start center">\r\n      <md-toolbar\r\n        layout-align="start start"\r\n        flex\r\n        class="mdp-datepicker-date-wrapper md-blue md-primary"\r\n        layout="column">\r\n        <span\r\n          class="mdp-datepicker-year"\r\n          ng-click="datepicker.showYear()"\r\n          ng-class="{ \'active\': datepicker.selectingYear }"\r\n          ng-bind="datepicker.date.format(\'YYYY\')">\r\n        </span>\r\n        <span\r\n          class="mdp-datepicker-date"\r\n          ng-click="datepicker.showCalendar()"\r\n          ng-class="{ \'active\': !datepicker.selectingYear }"\r\n          ng-bind="datepicker.date.format(datepicker.displayFormat)"></span>\r\n      </md-toolbar>\r\n    </div>\r\n    <div>\r\n      <div\r\n        class="mdp-datepicker-select-year mdp-animation-zoom"\r\n        layout="column"\r\n        layout-align="center start"\r\n        ng-if="datepicker.selectingYear">\r\n        <md-virtual-repeat-container\r\n          md-auto-shrink\r\n          md-top-index="datepicker.yearTopIndex">\r\n          <div\r\n            flex\r\n            md-virtual-repeat="item in datepicker.yearItems"\r\n            md-on-demand\r\n            class="repeated-year">\r\n            <span\r\n              class="md-button"\r\n              ng-click="datepicker.selectYear(item)"\r\n              md-ink-ripple\r\n              ng-class="{ \'md-primary md-blue current\': item == year }"\r\n              ng-bind="item"></span>\r\n          </div>\r\n        </md-virtual-repeat-container>\r\n      </div>\r\n      <mdp-calendar\r\n        ng-if="!datepicker.selectingYear"\r\n        class="mdp-animation-zoom"\r\n        date="datepicker.date"\r\n        min-date="datepicker.minDate"\r\n        date-filter="datepicker.dateFilter"\r\n        max-date="datepicker.maxDate"></mdp-calendar>\r\n      <md-dialog-actions layout="row">\r\n        <span flex></span>\r\n        <md-button\r\n          ng-click="datepicker.cancel()"\r\n          aria-label="{{datepicker.labels.cancelLabel}}">\r\n          <span ng-bind="datepicker.labels.cancelLabel"></span>\r\n        </md-button>\r\n        <md-button\r\n          ng-click="datepicker.confirm()"\r\n          class="md-primary"\r\n          aria-label="{{datepicker.labels.okLabel}}">\r\n          <span ng-bind="datepicker.labels.okLabel"></span>\r\n        </md-button>\r\n      </md-dialog-actions>\r\n    </div>\r\n  </md-dialog-content>\r\n</md-dialog>\r\n');
$templateCache.put('mdpClock.directive.html','<md-card class="mdp-clock">\r\n  <div class="mdp-clock-container">\r\n    <md-toolbar class="mdp-clock-center md-primary"></md-toolbar>\r\n    <md-toolbar\r\n      ng-style="clock.getPointerStyle()"\r\n      class="mdp-pointer md-primary">\r\n      <span class="mdp-clock-selected md-button md-raised md-primary"></span>\r\n    </md-toolbar>\r\n    <md-button\r\n      ng-class="{\r\n        \'md-primary\': clock.selected == step,\r\n        \'md-raised\': raised || clock.selected == step\r\n      }"\r\n      ng-mouseenter="raised = true"\r\n      ng-mouseleave="raised = false"\r\n      class="md-icon-button mdp-clock-deg{{ ::(clock.STEP_DEG * ($index + 1)) }}"\r\n      aria-label="{{step}}"\r\n      ng-repeat="step in clock.steps"\r\n      ng-click="clock.setTime(step)"\r\n      ng-bind="step"></md-button>\r\n  </div>\r\n</md-card>\r\n');
$templateCache.put('mdpDatePicker.directive.html','<div layout layout-align="start start">\r\n  <md-button\r\n    ng-disabled="{{ disabled }}"\r\n    class="md-icon-button"\r\n    ng-click="showPicker($event)">\r\n    <md-icon class="mdp-nav-icon" md-svg-icon="mdp-event"></md-icon>\r\n  </md-button>\r\n  <md-input-container\r\n    md-no-float="!!noFloat"\r\n    md-is-error="isError()">\r\n    <input\r\n      type="{{ ::type }}"\r\n      name="{{ inputName }}"\r\n      ng-model="model.$viewValue"\r\n      ng-required="required()"\r\n      ng-disabled="{{ disabled }}"\r\n      aria-label="{{ placeholder }}"\r\n      placeholder="{{ placeholder }}"\r\n      ng-click="showPicker($event)"/>\r\n  </md-input-container>\r\n</div>\r\n');
$templateCache.put('mdpTimePicker.directive.html','<div\r\n  layout\r\n  layout-align="start start">\r\n  <md-button\r\n    class="md-icon-button"\r\n    ng-click="showPicker($event)"\r\n    ng-disabled="{{ disabled }}">\r\n    <md-icon class="mdp-nav-icon" md-svg-icon="mdp-access-time"></md-icon>\r\n  </md-button>\r\n  <md-input-container\r\n    md-no-float="!!noFloat"\r\n    md-is-error="isError()">\r\n    <input\r\n      type="{{ ::type }}"\r\n      name="{{ inputName }}"\r\n      ng-model="model.$viewValue"\r\n      ng-required="required()"\r\n      ng-disabled="{{ disabled }}"\r\n      aria-label="{{ placeholder }}"\r\n      placeholder="{{ placeholder }}"\r\n      ng-click="showPicker($event)"/>\r\n  </md-input-container>\r\n</div>\r\n');
$templateCache.put('mdpTimePickerDialog.component.html','<md-dialog\r\n  aria-label=""\r\n  class="mdp-timepicker"\r\n  ng-class="{ \'portrait\': !$mdMedia(\'gt-xs\') }">\r\n  <md-dialog-content\r\n    layout-gt-xs="row"\r\n    layout-wrap>\r\n    <md-toolbar\r\n      layout-gt-xs="column"\r\n      layout-xs="row"\r\n      layout-align="center center"\r\n      flex\r\n      class="mdp-timepicker-time md-blue md-primary">\r\n      <div class="mdp-timepicker-selected-time">\r\n        <span\r\n          ng-class="{ \'active\': timepicker.currentView == timepicker.VIEW_HOURS }"\r\n          ng-click="timepicker.currentView = timepicker.VIEW_HOURS"\r\n          ng-bind="timepicker.time.format(timepicker.hoursFormat)"></span>:\r\n        <span\r\n          ng-class="{ \'active\': timepicker.currentView == timepicker.VIEW_MINUTES }"\r\n          ng-click="timepicker.currentView = timepicker.VIEW_MINUTES"\r\n          ng-bind="timepicker.time.format(timepicker.minutesFormat)"></span>\r\n      </div>\r\n      <div\r\n        layout="column"\r\n        ng-show="timepicker.ampm"\r\n        class="mdp-timepicker-selected-ampm">\r\n        <span\r\n          ng-click="timepicker.setAM()"\r\n          ng-class="{ \'active\': timepicker.time.hours() < 12 }">AM</span>\r\n        <span\r\n          ng-click="timepicker.setPM()"\r\n          ng-class="{ \'active\': timepicker.time.hours() >= 12 }">PM</span>\r\n      </div>\r\n    </md-toolbar>\r\n    <md-content>\r\n      <div\r\n        class="mdp-clock-switch-container"\r\n        ng-switch="timepicker.currentView"\r\n        layout\r\n        layout-align="center center">\r\n        <mdp-clock\r\n          class="mdp-animation-zoom"\r\n          ampm="timepicker.ampm"\r\n          auto-switch="timepicker.autoSwitch"\r\n          time="timepicker.time"\r\n          type="hours"\r\n          ng-switch-when="1"></mdp-clock>\r\n        <mdp-clock\r\n        class="mdp-animation-zoom"\r\n        ampm="timepicker.ampm"\r\n        auto-switch="timepicker.autoSwitch"\r\n        time="timepicker.time"\r\n        type="minutes"\r\n        ng-switch-when="2"></mdp-clock>\r\n      </div>\r\n      <md-dialog-actions layout="row">\r\n        <span flex></span>\r\n        <md-button\r\n          ng-click="timepicker.cancel()"\r\n          class="button button-grey-light"\r\n          aria-label="{{timepicker.labels.cancelLabel}}">\r\n          <span ng-bind="timepicker.labels.cancelLabel"></span>\r\n        </md-button>\r\n        <md-button\r\n          ng-click="timepicker.confirm()"\r\n          class="md-primary button button-grey-light"\r\n          aria-label="{{timepicker.labels.okLabel}}">\r\n          <span ng-bind="timepicker.labels.okLabel"></span>\r\n        </md-button>\r\n      </md-dialog-actions>\r\n    </md-content>\r\n  </md-dialog-content>\r\n</md-dialog>\r\n');}]);
/* global moment, angular */

var module = angular.module("mdPickers", [
  "mdpTemplates",
  "ngMaterial",
  "ngAnimate",
  "ngAria"
]);

module.config(["$mdIconProvider", "mdpIconsRegistry", function($mdIconProvider, mdpIconsRegistry) {
  angular.forEach(mdpIconsRegistry, function(icon, index) {
    $mdIconProvider.icon(icon.id, icon.url);
  });
}]);

module.run(["$templateCache", "mdpIconsRegistry", function($templateCache, mdpIconsRegistry) {
  angular.forEach(mdpIconsRegistry, function(icon, index) {
    $templateCache.put(icon.url, icon.svg);
  });
}]);

/* global moment, angular */

function compareValidator(value, format, otherDate, comparator) {
  // take only the date part, not the time part
  if (angular.isDate(otherDate)) {
    otherDate = moment(otherDate).format(format);
  }
  otherDate = moment(otherDate, format, true);
  var date = angular.isDate(value) ? moment(value) : moment(value, format, true);

  return !value ||
    angular.isDate(value) ||
    !otherDate.isValid() ||
    comparator(date, otherDate);
}

/* global moment, angular */

function filterValidator(value, format, filter) {
  var date = angular.isDate(value) ? moment(value) : moment(value, format, true);

  return !value ||
    angular.isDate(value) ||
    !angular.isFunction(filter) ||
    !filter(date.toDate());
}

/* global moment, angular */

function formatValidator(value, format) {
  return !value || angular.isDate(value) || moment(value, format, true).isValid();
}

/* global moment, angular */

function maxDateValidator(value, format, maxDate) {
  var currentMaxDate = moment(maxDate, "YYYY-MM-DD", true);
  var date = angular.isDate(value) ? moment(value) : moment(value, format, true);

  return !value ||
    angular.isDate(value) ||
    !currentMaxDate.isValid() ||
    date.isSameOrBefore(currentMaxDate);
}

/* global moment, angular */

function maxTimeValidator(value, format, maxTime) {
  return compareValidator(value, format, maxTime, function(t, mt) {
    return t.isSameOrBefore(mt);
  });
}

/* global moment, angular */

function minDateValidator(value, format, minDate) {
  var currentMinDate = moment(minDate, "YYYY-MM-DD", true);
  var date = angular.isDate(value) ? moment(value) : moment(value, format, true);

  return !value ||
    angular.isDate(value) ||
    !currentMinDate.isValid() ||
    date.isSameOrAfter(currentMinDate);
}

/* global moment, angular */

function minTimeValidator(value, format, minTime) {
  return compareValidator(value, format, minTime, function(t, mt) {
    return t.isSameOrAfter(mt);
  });
}

/* global moment, angular */

function requiredValidator(value, ngModel) {
  return value;
}

var mdpDatePickerProvider = function() {
  var LABEL_OK, LABEL_CANCEL, DISPLAY_FORMAT, PARENT_GETTER;

  LABEL_OK = "OK";
  LABEL_CANCEL = "Cancel";
  DISPLAY_FORMAT = "ddd, MMM DD";
  PARENT_GETTER = function() {
    return undefined;
  };

  this.setDisplayFormat = function(format) {
    DISPLAY_FORMAT = format;
  };

  this.setOKButtonLabel = function(label) {
    LABEL_OK = label;
  };

  this.setCancelButtonLabel = function(label) {
    LABEL_CANCEL = label;
  };

  this.setDialogParentGetter = function(fn) {
    PARENT_GETTER = fn;
  };

  this.$get = ["$mdDialog", "$mdpLocale", function($mdDialog, $mdpLocale) {
    var datePicker = function(currentDate, options) {
      if (!moment(currentDate).isValid()) {
        currentDate = moment().valueOf();
      }
      if (!angular.isObject(options)) {
        options = {};
      }

      options.displayFormat = options.displayFormat || $mdpLocale.date.displayFormat || DISPLAY_FORMAT;
      options.labels = {
        okLabel: options.okLabel || $mdpLocale.date.okLabel || LABEL_OK,
        cancelLabel: options.cancelLabel || $mdpLocale.date.cancelLabel || LABEL_CANCEL
      };

      return $mdDialog.show({
        controller: "DatePickerDialogCtrl",
        controllerAs: "datepicker",
        clickOutsideToClose: true,
        templateUrl: "mdpDatePickerDialog.component.html",
        targetEvent: options.targetEvent,
        locals: {
          currentDate: currentDate,
          options: options
        },
        multiple: true,
        parent: PARENT_GETTER()
      });
    };

    return datePicker;
  }];
};

module.provider("$mdpDatePicker", mdpDatePickerProvider);

var mdpTimePickerProvider = function() {
  var LABEL_OK, LABEL_CANCEL, PARENT_GETTER;

  LABEL_OK = "OK";
  LABEL_CANCEL = "Cancel";
  PARENT_GETTER = function() {
    return undefined;
  };

  this.setOKButtonLabel = function(label) {
    LABEL_OK = label;
  };

  this.setCancelButtonLabel = function(label) {
    LABEL_CANCEL = label;
  };

  this.setDialogParentGetter = function(fn) {
    PARENT_GETTER = fn;
  };

  this.$get = ["$mdDialog", "$mdpLocale", function($mdDialog, $mdpLocale) {
    var timePicker = function(time, options) {
      if (!moment(time).isValid()) {
        time = moment().valueOf();
      }
      if (!angular.isObject(options)) {
        options = {};
      }

      options.labels = {
        okLabel: options.okLabel || $mdpLocale.time.okLabel || LABEL_OK,
        cancelLabel: options.cancelLabel || $mdpLocale.time.cancelLabel || LABEL_CANCEL
      };

      return $mdDialog.show({
        controller: "TimePickerDialogCtrl",
        controllerAs: "timepicker",
        clickOutsideToClose: true,
        templateUrl: "mdpTimePickerDialog.component.html",
        targetEvent: options.targetEvent,
        locals: {
          time: time,
          autoSwitch: options.autoSwitch,
          ampm: angular.isDefined(options.ampm) ? options.ampm : $mdpLocale.time.ampm,
          useUtc: options.useUtc,
          options: options
        },
        multiple: true,
        parent: PARENT_GETTER()
      });
    };

    return timePicker;
  }];
};

module.provider("$mdpTimePicker", mdpTimePickerProvider);

module.constant("mdpIconsRegistry", [
    {
        id: 'mdp-chevron-left',
        url: 'mdp-chevron-left.svg',
        svg: '<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
    },
    {
        id: 'mdp-chevron-right',
        url: 'mdp-chevron-right.svg',
        svg: '<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
    },
    {
        id: 'mdp-access-time',
        url: 'mdp-access-time.svg',
        svg: '<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M0 0h24v24H0z" fill="none"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>'
    },
    {
        id: 'mdp-event',
        url: 'mdp-event.svg',
        svg: '<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
    }
]);
/**
 * Created by Robin Thoni on 6/21/17.
 */

module.factory('$mdpLocale', [function () {
    var $mdpLocale = {
        time: {
            minTime: null,
            maxTime: null,
            okLabel: "OK",
            cancelLabel: "Cancel",
            timeFormat: "HH:mm",
            noFloat: false,
            openOnClick: false,
            autoSwitch: false,
            ampm: true,
            clearOnCancel: false
        },
        date: {
            minDate: null,
            maxDate: null,
            okLabel: "OK",
            cancelLabel: "Cancel",
            dateFilter: null,
            dateFormat: "YYYY-MM-DD",
            displayFormat: "ddd, MMM DD",
            noFloat: false,
            openOnClick: false,
            clearOnCancel: false
        }
    };

    return $mdpLocale;
}]);

module.directive("ngMessage", ["$mdUtil", function($mdUtil) {
   return {
        restrict: "EA",
        priority: 101,
        compile: function(element) {
            var inputContainer = $mdUtil.getClosest(element, "mdp-time-picker", true) ||
                                 $mdUtil.getClosest(element, "mdp-date-picker", true);

            // If we are not a child of an input container, don't do anything
            if (!inputContainer) return;

            // Add our animation class
            element.toggleClass('md-input-message-animation', true);

            return {};
        }
    };
}]);

/* global moment, angular */

var CalendarCtrl = function($scope) {
  var self;

  self = this;

  this.getDaysInMonth = function() {
    var days = self.date.daysInMonth(),
      firstDay = moment(self.date).date(1).day() - this.dow;

    if (firstDay < 0) firstDay = this.weekDays.length - 1;

    var arr = [];
    for (var i = 1; i <= (firstDay + days); i++) {
      var day = null;
      if (i > firstDay) {
        day = {
          value: (i - firstDay),
          enabled: self.isDayEnabled(moment(self.date).date(i - firstDay).toDate())
        };
      }
      arr.push(day);
    }

    return arr;
  };

  this.isDayEnabled = function(day) {
    return (!this.minDate || this.minDate <= day) &&
      (!this.maxDate || this.maxDate >= day) &&
      (!self.dateFilter || !self.dateFilter(day));
  };

  this.selectDate = function(dom) {
    self.date.date(dom);
  };

  this.nextMonth = function() {
    self.date.add(1, 'months');
  };

  this.prevMonth = function() {
    self.date.subtract(1, 'months');
  };

  this.updateDaysInMonth = function() {
    self.daysInMonth = self.getDaysInMonth();
  };

  this.$onInit = function() {
    self.daysInMonth = [];
    self.dow = moment.localeData().firstDayOfWeek();
    self.weekDays = [].concat(
      moment.weekdaysMin().slice(self.dow),
      moment.weekdaysMin().slice(0, self.dow)
    );
    $scope.$watch(function() {
      return self.date.unix();
    }, function(newValue, oldValue) {
      if (newValue && newValue !== oldValue)
        self.updateDaysInMonth();
    });
    self.updateDaysInMonth();
  };
};

CalendarCtrl.$inject = [
  "$scope"
];

module.controller("CalendarCtrl", CalendarCtrl);

/* global moment, angular */

var mdpCalendarDirective = function($animate) {
  return {
    restrict: "E",
    bindToController: {
      "date": "=",
      "minDate": "=",
      "maxDate": "=",
      "dateFilter": "="
    },
    templateUrl: "mdpcalendar.directive.html",
    controller: "CalendarCtrl",
    controllerAs: "calendar",
    link: function(scope, element, attrs, ctrl) {
      var animElements = [
        element[0].querySelector(".mdp-calendar-week-days"),
        element[0].querySelector(".mdp-calendar-days"),
        element[0].querySelector(".mdp-calendar-monthyear")
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

mdpCalendarDirective.$inject = [
  "$animate"
];

module.directive("mdpCalendar", mdpCalendarDirective);

/* global moment, angular */

var ClockCtrl = function($scope) {
  var self, TYPE_HOURS, TYPE_MINUTES;

  self = this;
  TYPE_HOURS = "hours";
  TYPE_MINUTES = "minutes";

  this.$onInit = function() {
    var i;
    self.STEP_DEG = 360 / 12;
    self.steps = [];
    this.CLOCK_TYPES = {
      "hours": {
        range: self.ampm ? 12 : 24,
      },
      "minutes": {
        range: 60,
      }
    };
    self.type = self.type || "hours";

    switch (self.type) {
      case TYPE_HOURS:
        var f = self.ampm ? 1 : 2;
        var t = self.ampm ? 12 : 23;
        for (i = f; i <= t; i += f) {
          self.steps.push(i);
        }
        if (!self.ampm) {
          self.steps.push(0);
        }
        self.selected = self.time.hours() || 0;
        if (self.ampm && self.selected > 12) {
          self.selected -= 12;
        }
        break;

      case TYPE_MINUTES:
        for (i = 5; i <= 55; i += 5) {
          self.steps.push(i);
        }
        self.steps.push(0);
        self.selected = self.time.minutes() || 0;
        break;

    }
  };

  this.getPointerStyle = function() {
    var divider = 1;
    switch (self.type) {
      case TYPE_HOURS:
        divider = self.ampm ? 12 : 24;
        break;
      case TYPE_MINUTES:
        divider = 60;
        break;
    }

    var degrees = Math.round(self.selected * (360 / divider)) - 180;
    return {
      "-webkit-transform": "rotate(" + degrees + "deg)",
      "-ms-transform": "rotate(" + degrees + "deg)",
      "transform": "rotate(" + degrees + "deg)"
    };
  };

  this.setTimeByDeg = function(deg) {
    deg = deg >= 360 ? 0 : deg;
    var divider = 0;
    switch (self.type) {
      case TYPE_HOURS:
        divider = self.ampm ? 12 : 24;
        break;
      case TYPE_MINUTES:
        divider = 60;
        break;
    }

    self.setTime(
      Math.round(divider / 360 * deg)
    );
  };

  this.setTime = function(time, type) {
    this.selected = time;

    switch (self.type) {
      case TYPE_HOURS:
        if (self.ampm && self.time.format("A") == "PM") time += 12;
        this.time.hours(time);
        break;
      case TYPE_MINUTES:
        if (time > 59) time -= 60;
        this.time.minutes(time);
        break;
    }
  };
};

ClockCtrl.$inject = [
  "$scope"
];

module.controller("ClockCtrl", ClockCtrl);

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

/* global moment, angular */

var mdpDatePickerDirective = function($mdpDatePicker, $timeout, $mdpLocale) {
  return {
    restrict: 'E',
    require: ['ngModel', "^^?form"],
    transclude: true,
    templateUrl: 'mdpDatePicker.directive.html',
    scope: {
      "minDate": "=mdpMinDate",
      "maxDate": "=mdpMaxDate",
      "okLabel": "@?mdpOkLabel",
      "cancelLabel": "@?mdpCancelLabel",
      "useUtc": "=?mdpUseUtc",
      "placeholder": "@mdpPlaceholder",
      "openOnClick": "=mdpOpenOnClick",
      "disabled": "=?mdpDisabled",
      "noFloat": "=mdpNoFloat",
      "dateFilter": "=mdpDateFilter",
      "dateFormat": "@mdpFormat",
      "inputName": "@?mdpInputName",
      "clearOnCancel": "=?mdpClearOnCancel"
    },
    link: {
      post: function(scope, element, attrs, controllers, $transclude) {
        var ngModel, form, opts, inputElement, inputContainer, inputContainerCtrl, messages;

        ngModel = controllers[0];
        form = controllers[1];

        opts = {
          get minDate() {
            return scope.minDate || $mdpLocale.date.minDate;
          },
          get maxDate() {
            return scope.maxDate || $mdpLocale.date.maxDate;
          },
          get dateFilter() {
            return scope.dateFilter || $mdpLocale.date.dateFilter;
          },
          get clearOnCancel() {
            return angular.isDefined(scope.clearOnCancel) ? scope.clearOnCancel : $mdpLocale.date.clearOnCancel;
          }
        };

        inputElement = angular.element(element[0].querySelector('input'));
        inputContainer = angular.element(element[0].querySelector('md-input-container'));
        inputContainerCtrl = inputContainer.controller("mdInputContainer");

        $transclude(function(clone) {
          inputContainer.append(clone);
        });

        messages = angular.element(inputContainer[0].querySelector("[ng-messages]"));

        // TODO: fix input type
        scope.type = scope.dateFormat ? "text" : "date";
        scope.dateFormat = scope.dateFormat || "YYYY-MM-DD";
        scope.useUtc = scope.useUtc || false;

        scope.model = ngModel;

        scope.isError = function() {
          return !!ngModel.$invalid && (!ngModel.$pristine || (form != null && form.$submitted));
        };

        scope.required = function() {
          return !!attrs.required;
        };

        // update input element if model has changed
        ngModel.$formatters.unshift(function(value) {
          var date = angular.isDate(value) && (scope.useUtc ? moment.utc(value) : moment(value));
          if (date && (angular.isDate(date) || date.isValid())) {
            var strVal = date.format(scope.dateFormat);
            updateInputElement(strVal);
            return strVal;
          } else {
            updateInputElement(null);
            return null;
          }
        });

        ngModel.$validators.format = function(modelValue, viewValue) {
          return formatValidator(viewValue, scope.dateFormat);
        };

        ngModel.$validators.minDate = function(modelValue, viewValue) {
          return minDateValidator(viewValue, scope.dateFormat, opts.minDate);
        };

        ngModel.$validators.maxDate = function(modelValue, viewValue) {
          return maxDateValidator(viewValue, scope.dateFormat, opts.maxDate);
        };

        ngModel.$validators.filter = function(modelValue, viewValue) {
          return filterValidator(viewValue, scope.dateFormat, opts.dateFilter);
        };

        ngModel.$validators.required = function(modelValue, viewValue) {
          return angular.isUndefined(attrs.required) || attrs.required === false || !ngModel.$isEmpty(modelValue) || !ngModel.$isEmpty(viewValue);
        };

        ngModel.$parsers.unshift(function(value) {
          var parsed = scope.useUtc ? moment.utc(value, scope.dateFormat, true) : moment(value, scope.dateFormat, true);
          if (parsed.isValid()) {
            if (angular.isDate(ngModel.$modelValue)) {
              var originalModel = scope.useUtc ? moment.utc(ngModel.$modelValue) : moment(ngModel.$modelValue);
              originalModel.year(parsed.year());
              originalModel.month(parsed.month());
              originalModel.date(parsed.date());

              parsed = originalModel;
            }
            return parsed.toDate();
          } else
            return null;
        });

        // update input element value
        function updateInputElement(value) {
          inputElement[0].value = value;
          inputContainerCtrl.setHasValue(!ngModel.$isEmpty(value));
        }

        function updateDate(date) {
          var value, strValue;

          value = scope.useUtc ?
            moment.utc(date, angular.isDate(date) ? null : scope.dateFormat, true) :
            moment(date, angular.isDate(date) ? null : scope.dateFormat, true);

          strValue = value.format(scope.dateFormat);

          if (value.isValid()) {
            updateInputElement(strValue);
            ngModel.$setViewValue(strValue);
          } else {
            updateInputElement(date);
            ngModel.$setViewValue(date);
          }

          if (!ngModel.$pristine &&
            messages.hasClass("md-auto-hide") &&
            inputContainer.hasClass("md-input-invalid")) {
            messages.removeClass("md-auto-hide");
          }

          ngModel.$render();
        }

        scope.showPicker = function(ev) {
          if (angular.isDefined(scope.openOnClick) || !!scope.openOnClick) {
            return;
          }
          $mdpDatePicker(ngModel.$modelValue, {
            minDate: opts.minDate,
            maxDate: opts.maxDate,
            dateFilter: opts.dateFilter,
            useUtc: scope.useUtc,
            okLabel: scope.okLabel,
            cancelLabel: scope.cancelLabel,
            targetEvent: ev
          }).then(function(time) {
            updateDate(time, true);
          }, function(error) {
            if (opts.clearOnCancel) {
              updateDate(null, true);
            }
          });
        };

        function onInputElementEvents(event) {
          if (event.target.value !== ngModel.$viewVaue)
            updateDate(event.target.value);
        }

        inputElement.on("reset input blur", onInputElementEvents);

        scope.$on("$destroy", function() {
          inputElement.off("reset input blur", onInputElementEvents);
        });

        // revalidate on constraint change
        scope.$watch("minDate + maxDate", function() {
          ngModel.$validate();
        });
      }
    }
  };
};

mdpDatePickerDirective.$inject = [
  "$mdpDatePicker",
  "$timeout",
  "$mdpLocale"
];

module.directive("mdpDatePicker", mdpDatePickerDirective);

/* global moment, angular */

var DatePickerDialogCtrl = function($scope, $mdDialog, $mdMedia, $timeout, currentDate, options) {
  var self = this;

  this.selectingYear = false;
  this.useUtc = !!options.useUtc;
  this.displayFormat = options.displayFormat || "ddd, MMM DD";
  this.labels = options.labels;
  this.minDate = options.minDate && moment(options.minDate).isValid() ? (this.useUtc ? moment.utc(options.minDate) : moment(options.minDate)) : null;
  this.maxDate = options.maxDate && moment(options.maxDate).isValid() ? (this.useUtc ? moment.utc(options.maxDate) : moment(options.maxDate)) : null;
  this.dateFilter = angular.isFunction(options.dateFilter) ? options.dateFilter : null;
  this.date = this.useUtc ? moment.utc(currentDate) : moment(currentDate);

  // validate min and max date
  if (this.minDate && this.maxDate) {
    if (this.maxDate.isBefore(this.minDate)) {
      this.maxDate = moment(this.minDate).add(1, 'days');
    }
  }

  if (this.date) {
    // check min date
    if (this.minDate && this.date.isBefore(this.minDate)) {
      this.date = moment(this.minDate);
    }

    // check max date
    if (this.maxDate && this.date.isAfter(this.maxDate)) {
      this.date = moment(this.maxDate);
    }
  }

  this.yearItems = {
    currentIndex_: 0,
    PAGE_SIZE: 5,
    START: (self.minDate ? self.minDate.year() : 1900),
    END: (self.maxDate ? self.maxDate.year() : 0),
    getItemAtIndex: function(index) {
      if (this.currentIndex_ < index) {
        this.currentIndex_ = index;
      }
      return this.START + index;
    },
    getLength: function() {
      return Math.min(
        this.currentIndex_ + Math.floor(this.PAGE_SIZE / 2),
        Math.abs(this.START - this.END) + 1
      );
    }
  };

  $scope.$mdMedia = $mdMedia;
  $scope.year = this.date.year();

  this.selectYear = function(year) {
    self.date.year(year);
    $scope.year = year;
    self.selectingYear = false;
    self.animate();
  };

  this.showYear = function() {
    self.yearTopIndex = (self.date.year() - self.yearItems.START) + Math.floor(self.yearItems.PAGE_SIZE / 2);
    self.yearItems.currentIndex_ = (self.date.year() - self.yearItems.START) + 1;
    self.selectingYear = true;
  };

  this.showCalendar = function() {
    self.selectingYear = false;
  };

  this.cancel = function() {
    $mdDialog.cancel();
  };

  this.confirm = function() {
    var date = this.date;

    if (this.minDate && this.date.isBefore(this.minDate)) {
      date = moment(this.minDate);
    }

    if (this.maxDate && this.date.isAfter(this.maxDate)) {
      date = moment(this.maxDate);
    }

    $mdDialog.hide(date.toDate());
  };

  this.animate = function() {
    self.animating = true;
    $timeout(angular.noop).then(function() {
      self.animating = false;
    });
  };
};

DatePickerDialogCtrl.$inject = [
  "$scope",
  "$mdDialog",
  "$mdMedia",
  "$timeout",
  "currentDate",
  "options"
];

module.controller("DatePickerDialogCtrl", DatePickerDialogCtrl);

/* global moment, angular */

var mdpTimePickerDirective = function($mdpTimePicker, $timeout, $mdpLocale) {
  return {
    restrict: 'E',
    require: ['ngModel', "^^?form"],
    transclude: true,
    templateUrl: 'mdpTimePicker.directive.html',
    scope: {
      "minTime": "=?mdpMinTime",
      "maxTime": "=?mdpMaxTime",
      "timeFormat": "@mdpFormat",
      "okLabel": "@?mdpOkLabel",
      "cancelLabel": "@?mdpCancelLabel",
      "useUtc": "=?mdpUseUtc",
      "placeholder": "@mdpPlaceholder",
      "autoSwitch": "=?mdpAutoSwitch",
      "openOnClick": "=mdpOpenOnClick",
      "disabled": "=?mdpDisabled",
      "noFloat": "=mdpNoFloat",
      "ampm": "=?mdpAmpm",
      "inputName": "@?mdpInputName",
      "clearOnCancel": "=?mdpClearOnCancel"
    },
    link: function(scope, element, attrs, controllers, $transclude) {
      var ngModel = controllers[0];
      var form = controllers[1];

      var opts = {
        get minTime() {
          return scope.minTime || $mdpLocale.time.minTime;
        },
        get maxTime() {
          return scope.maxTime || $mdpLocale.time.maxTime;
        },
        get clearOnCancel() {
          return angular.isDefined(scope.clearOnCancel) ? scope.clearOnCancel : $mdpLocale.time.clearOnCancel;
        }
      };

      var inputElement = angular.element(element[0].querySelector('input')),
        inputContainer = angular.element(element[0].querySelector('md-input-container')),
        inputContainerCtrl = inputContainer.controller("mdInputContainer");

      $transclude(function(clone) {
        inputContainer.append(clone);
      });

      var messages = angular.element(inputContainer[0].querySelector("[ng-messages]"));

      // TODO: fix input type
      scope.type = scope.timeFormat || $mdpLocale.time.timeFormat ? "text" : "time";
      scope.timeFormat = scope.timeFormat || $mdpLocale.time.timeFormat || "HH:mm";
      scope.autoSwitch = scope.autoSwitch === undefined ? $mdpLocale.time.autoSwitch : scope.autoSwitch;
      scope.useUtc = scope.useUtc || false;
      scope.model = ngModel;

      scope.isError = function() {
        return !!ngModel.$invalid && (!ngModel.$pristine || (form != null && form.$submitted));
      };

      scope.required = function() {
        return !!attrs.required;
      };

      scope.$watch(function() {
        return ngModel.$error;
      }, function(newValue, oldValue) {
        inputContainerCtrl.setInvalid(!ngModel.$pristine && !!Object.keys(ngModel.$error).length);
      }, true);

      // update input element if model has changed
      ngModel.$formatters.unshift(function(value) {
        var time = angular.isDate(value) && (scope.useUtc ? moment.utc(value) : moment(value));
        if (time && (angular.isDate(time) || time.isValid())) {
          var strVal = time.format(scope.timeFormat);
          updateInputElement(strVal);
          return strVal;
        } else {
          updateInputElement(null);
          return null;
        }
      });

      ngModel.$validators.format = function(modelValue, viewValue) {
        return !viewValue || angular.isDate(viewValue) || (scope.useUtc ? moment.utc(viewValue, scope.timeFormat, true) : moment(viewValue, scope.timeFormat, true)).isValid();
      };

      ngModel.$validators.required = function(modelValue, viewValue) {
        return angular.isUndefined(attrs.required) || attrs.required === false || !ngModel.$isEmpty(modelValue) || !ngModel.$isEmpty(viewValue);
      };

      ngModel.$validators.minTime = function(modelValue, viewValue) {
        return minTimeValidator(viewValue, scope.timeFormat, opts.minTime);
      };

      ngModel.$validators.maxTime = function(modelValue, viewValue) {
        return maxTimeValidator(viewValue, scope.timeFormat, opts.maxTime);
      };


      ngModel.$parsers.unshift(function(value) {
        var parsed = scope.useUtc ? moment.utc(value, scope.timeFormat, true) : moment(value, scope.timeFormat, true);
        if (parsed.isValid()) {
          if (angular.isDate(ngModel.$modelValue)) {
            var originalModel = scope.useUtc ? moment.utc(ngModel.$modelValue) : moment(ngModel.$modelValue);
            originalModel.minutes(parsed.minutes());
            originalModel.hours(parsed.hours());
            originalModel.seconds(parsed.seconds());

            parsed = originalModel;
          }
          return parsed.toDate();
        } else
          return null;
      });

      // update input element value
      function updateInputElement(value) {
        inputElement[0].value = value;
        inputContainerCtrl.setHasValue(!ngModel.$isEmpty(value));
      }

      function updateTime(time) {
        var value = scope.useUtc ? moment.utc(time, angular.isDate(time) ? null : scope.timeFormat, true) : moment(time, angular.isDate(time) ? null : scope.timeFormat, true),
          strValue = value.format(scope.timeFormat);

        if (value.isValid()) {
          updateInputElement(strValue);
          ngModel.$setViewValue(strValue);
        } else {
          updateInputElement(time);
          ngModel.$setViewValue(time);
        }

        if (!ngModel.$pristine &&
          messages.hasClass("md-auto-hide") &&
          inputContainer.hasClass("md-input-invalid")) messages.removeClass("md-auto-hide");

        ngModel.$render();
      }

      scope.showPicker = function(ev) {
        if (angular.isDefined(scope.openOnClick) || !!scope.openOnClick) {
          return;
        }
        $mdpTimePicker(ngModel.$modelValue, {
          targetEvent: ev,
          okLabel: scope.okLabel,
          cancelLabel: scope.cancelLabel,
          autoSwitch: scope.autoSwitch,
          ampm: scope.ampm,
          useUtc: scope.useUtc
        }).then(function(time) {
          updateTime(time, true);
        }, function(error) {
          if (opts.clearOnCancel) {
            updateTime(null, true);
          }
        });
      };

      function onInputElementEvents(event) {
        if (event.target.value !== ngModel.$viewVaue)
          updateTime(event.target.value);
      }

      inputElement.on("reset input blur", onInputElementEvents);

      scope.$on("$destroy", function() {
        inputElement.off("reset input blur", onInputElementEvents);
      });

      // revalidate on constraint change
      scope.$watch("minTime + maxTime", function() {
        ngModel.$validate();
      });
    }
  };
};

mdpTimePickerDirective.$inject = [
  "$mdpTimePicker",
  "$timeout",
  "$mdpLocale"
];

module.directive("mdpTimePicker", mdpTimePickerDirective);

/* global moment, angular */

var TimePickerDialogCtrl = function($scope, $mdDialog, time, useUtc, autoSwitch, ampm, $mdMedia, options) {
  var self = this;
  this.VIEW_HOURS = 1;
  this.VIEW_MINUTES = 2;
  this.labels = options.labels;
  this.currentView = this.VIEW_HOURS;
  this.autoSwitch = !!autoSwitch;
  this.ampm = !!ampm;
  this.useUtc = !!useUtc;
  this.hoursFormat = self.ampm ? "h" : "H";
  this.minutesFormat = "mm";
  this.time = this.useUtc ? moment.utc(time) : moment(time);
  this.clockHours = parseInt(this.time.format(this.hoursFormat));
  this.clockMinutes = parseInt(this.time.format(this.minutesFormat));

  $scope.$mdMedia = $mdMedia;

  this.switchView = function() {
    self.currentView = self.currentView == self.VIEW_HOURS ? self.VIEW_MINUTES : self.VIEW_HOURS;
  };

  this.setAM = function() {
    if (self.time.hours() >= 12) {
      self.time.hour(self.time.hour() - 12);
    }
  };

  this.setPM = function() {
    if (self.time.hours() < 12)
      self.time.hour(self.time.hour() + 12);
  };

  this.cancel = function() {
    $mdDialog.cancel();
  };

  this.confirm = function() {
    $mdDialog.hide(this.time.toDate());
  };
};

TimePickerDialogCtrl.$inject = [
  "$scope",
  "$mdDialog",
  "time",
  "useUtc",
  "autoSwitch",
  "ampm",
  "$mdMedia",
  "options"
];

module.controller("TimePickerDialogCtrl", TimePickerDialogCtrl);

})();