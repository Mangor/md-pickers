angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('mdpClock.directive.html','<md-card class="mdp-clock">\n  <div class="mdp-clock-container">\n    <md-toolbar class="mdp-clock-center md-primary"></md-toolbar>\n    <md-toolbar\n      ng-style="clock.getPointerStyle()"\n      class="mdp-pointer md-primary">\n      <span class="mdp-clock-selected md-button md-raised md-primary"></span>\n    </md-toolbar>\n    <md-button\n      ng-class="{\n        \'md-primary\': clock.selected == step,\n        \'md-raised\': raised || clock.selected == step\n      }"\n      ng-mouseenter="raised = true"\n      ng-mouseleave="raised = false"\n      class="md-icon-button mdp-clock-deg{{ ::(clock.STEP_DEG * ($index + 1)) }}"\n      aria-label="{{step}}"\n      ng-repeat="step in clock.steps"\n      ng-click="clock.setTime(step)"\n      ng-bind="step"></md-button>\n  </div>\n</md-card>\n');
$templateCache.put('mdpcalendar.directive.html','<div class="mdp-calendar">\n  <div layout="row" layout-align="space-between center">\n    <md-button\n      aria-label="previous month"\n      class="md-icon-button"\n      ng-click="calendar.prevMonth()">\n      <md-icon md-svg-icon="mdp-chevron-left"></md-icon>\n    </md-button>\n    <div\n      class="mdp-calendar-monthyear"\n      ng-show="!calendar.animating"\n      ng-bind="calendar.date.format(\'MMMM YYYY\')">\n    </div>\n    <md-button\n      aria-label="next month"\n      class="md-icon-button"\n      ng-click="calendar.nextMonth()">\n      <md-icon md-svg-icon="mdp-chevron-right"></md-icon>\n    </md-button>\n  </div>\n  <div\n    layout="row"\n    layout-align="space-around center"\n    class="mdp-calendar-week-days"\n    ng-show="!calendar.animating">\n    <div\n      layout\n      layout-align="center center"\n      ng-repeat="d in calendar.weekDays track by $index"\n      ng-bind="d">\n    </div>\n  </div>\n  <div\n    layout="row"\n    layout-align="start center"\n    layout-wrap\n    class="mdp-calendar-days"\n    ng-class="{ \'mdp-animate-next\': calendar.animating }"\n    ng-show="!calendar.animating"\n    md-swipe-left="calendar.nextMonth()"\n    md-swipe-right="calendar.prevMonth()">\n    <div\n      layout\n      layout-align="center center"\n      ng-repeat-start="day in calendar.daysInMonth track by $index"\n      ng-class="{ \'mdp-day-placeholder\': !day }">\n      <md-button\n        class="md-icon-button"\n        aria-label="Select day"\n        ng-mouseenter="raised = true"\n        ng-mouseleave="raised = false"\n        ng-if="day"\n        ng-class="{ \'md-accent\': calendar.date.date() == day.value, \'md-raised\': raised || calendar.date.date() == day.value }"\n        ng-click="calendar.selectDate(day.value)"\n        ng-disabled="!day.enabled"\n        ng-bind="day.value">\n      </md-button>\n    </div>\n    <div\n      flex="100"\n      ng-if="($index + 1) % 7 == 0"\n      ng-repeat-end></div>\n  </div>\n</div>\n');
$templateCache.put('mdpDatePicker.directive.html','<div layout layout-align="start start">\n  <md-button\n    {{angular.isDefined(attrs.mdpDisabled) ? ng-disabled="disabled" : \'\'}}\n    class="md-icon-button"\n    ng-click="showPicker($event)">\n    <md-icon md-svg-icon="mdp-event"></md-icon>\n  </md-button>\n  <md-input-container\n    {{(noFloat ? \' md-no-float \' : \' \'}}\n    md-is-error="isError()">\n    <input\n      name="{{ inputName }}"\n      ng-model="model.$viewValue"\n      ng-required="required()"\n      type="{{ ::type }}"\n      {{(angular.isDefined(attrs.mdpDisabled) ? ng-disabled="disabled" : \'\')}}\n      aria-label="{{placeholder}}"\n      placeholder="{{placeholder}}"\n      {{(openOnClick ? \' ng-click="showPicker($event)" \' : \' \')}} />\n  </md-input-container>\n</div>\n');
$templateCache.put('mdpDatePickerDialog.component.html','<md-dialog\n  aria-label=""\n  class="mdp-datepicker"\n  ng-class="{ \'portrait\': !$mdMedia(\'gt-xs\') }">\n  <md-dialog-content\n    layout="row"\n    layout-wrap>\n    <div\n      layout="column"\n      layout-align="start center">\n      <md-toolbar\n        layout-align="start start"\n        flex\n        class="mdp-datepicker-date-wrapper md-hue-1 md-primary"\n        layout="column">\n        <span\n          class="mdp-datepicker-year"\n          ng-click="datepicker.showYear()"\n          ng-class="{ \'active\': datepicker.selectingYear }"\n          ng-bind="datepicker.date.format(\'YYYY\')">\n        </span>\n        <span\n          class="mdp-datepicker-date"\n          ng-click="datepicker.showCalendar()"\n          ng-class="{ \'active\': !datepicker.selectingYear }"\n          ng-bind="datepicker.date.format(datepicker.displayFormat)"></span>\n      </md-toolbar>\n    </div>\n    <div>\n      <div\n        class="mdp-datepicker-select-year mdp-animation-zoom"\n        layout="column"\n        layout-align="center start"\n        ng-if="datepicker.selectingYear">\n        <md-virtual-repeat-container\n          md-auto-shrink\n          md-top-index="datepicker.yearTopIndex">\n          <div\n            flex\n            md-virtual-repeat="item in datepicker.yearItems"\n            md-on-demand\n            class="repeated-year">\n            <span\n              class="md-button"\n              ng-click="datepicker.selectYear(item)"\n              md-ink-ripple\n              ng-class="{ \'md-primary current\': item == year }"\n              ng-bind="item"></span>\n          </div>\n        </md-virtual-repeat-container>\n      </div>\n      <mdp-calendar\n        ng-if="!datepicker.selectingYear"\n        class="mdp-animation-zoom"\n        date="datepicker.date"\n        min-date="datepicker.minDate"\n        date-filter="datepicker.dateFilter"\n        max-date="datepicker.maxDate"></mdp-calendar>\n      <md-dialog-actions layout="row">\n        <span flex></span>\n        <md-button\n          ng-click="datepicker.cancel()"\n          aria-label="{{labelCancel}}"\n          ng-bind="labelCancel"></md-button>\n        <md-button\n          ng-click="datepicker.confirm()"\n          class="md-primary"\n          aria-label="{{labelOk}}"\n          ng-bind="labelOk"></md-button>\n      </md-dialog-actions>\n    </div>\n  </md-dialog-content>\n</md-dialog>\n');
$templateCache.put('mdpTimePicker.directive.html','<div\n  layout\n  layout-align="start start">\n  <md-button\n    class="md-icon-button"\n    ng-click="showPicker($event)"\n    {{angular.isDefined(attrs.mdpDisabled) ? \'ng-disabled="disabled"\' : \'\'}}>\n    <md-icon md-svg-icon="mdp-access-time"></md-icon>\n  </md-button>\n  <md-input-container\n    {{(noFloat ? \'md-no-float\' : \'\')}}\n    md-is-error="isError()">\n    <input\n      name="{{ inputName }}"\n      ng-model="model.$viewValue"\n      ng-required="required()"\n      type="{{ ::type }}"\n      {{angular.isDefined(attrs.mdpDisabled) ? \'ng-disabled="disabled"\' : \'\'}}\n      aria-label="{{placeholder}}"\n      placeholder="{{placeholder}}"\n      {{openOnClick ? \'ng-click="showPicker($event)"\' : \'\'}}/>\n  </md-input-container>\n</div>\n');
$templateCache.put('mdpTimePickerDialog.component.html','<md-dialog\n  aria-label=""\n  class="mdp-timepicker"\n  ng-class="{ \'portrait\': !$mdMedia(\'gt-xs\') }">\n  <md-dialog-content\n    layout-gt-xs="row"\n    layout-wrap>\n    <md-toolbar\n      layout-gt-xs="column"\n      layout-xs="row"\n      layout-align="center center"\n      flex\n      class="mdp-timepicker-time md-hue-1 md-primary">\n      <div class="mdp-timepicker-selected-time">\n        <span\n          ng-class="{ \'active\': timepicker.currentView == timepicker.VIEW_HOURS }"\n          ng-click="timepicker.currentView = timepicker.VIEW_HOURS"\n          ng-bind="timepicker.time.format(timepicker.hoursFormat)"></span>:\n        <span\n          ng-class="{ \'active\': timepicker.currentView == timepicker.VIEW_MINUTES }"\n          ng-click="timepicker.currentView = timepicker.VIEW_MINUTES"\n          ng-bind="timepicker.time.format(timepicker.minutesFormat)"></span>\n      </div>\n      <div\n        layout="column"\n        ng-show="timepicker.ampm"\n        class="mdp-timepicker-selected-ampm">\n        <span\n          ng-click="timepicker.setAM()"\n          ng-class="{ \'active\': timepicker.time.hours() < 12 }">AM</span>\n        <span\n          ng-click="timepicker.setPM()"\n          ng-class="{ \'active\': timepicker.time.hours() >= 12 }">PM</span>\n      </div>\n    </md-toolbar>\n    <md-content>\n      <div\n        class="mdp-clock-switch-container"\n        ng-switch="timepicker.currentView"\n        layout\n        layout-align="center center">\n        <mdp-clock\n          class="mdp-animation-zoom"\n          ampm="timepicker.ampm"\n          auto-switch="timepicker.autoSwitch"\n          time="timepicker.time"\n          type="hours"\n          ng-switch-when="1"></mdp-clock>\n        <mdp-clock\n        class="mdp-animation-zoom"\n        ampm="timepicker.ampm"\n        auto-switch="timepicker.autoSwitch"\n        time="timepicker.time"\n        type="minutes"\n        ng-switch-when="2"></mdp-clock>\n      </div>\n      <md-dialog-actions layout="row">\n        <span flex></span>\n        <md-button\n          ng-click="timepicker.cancel()"\n          aria-label="{{labelCancel}}"\n          ng-bind="labelCancel"></md-button>\n        <md-button\n          ng-click="timepicker.confirm()"\n          class="md-primary"\n          aria-label="{{labelOk}}"\n          ng-bind="labelOk"></md-button>\n      </md-dialog-actions>\n    </md-content>\n  </md-dialog-content>\n</md-dialog>\n');}]);