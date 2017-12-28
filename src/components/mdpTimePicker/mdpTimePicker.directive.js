/* global moment, angular */

var mdpTimePickerDirective = function($mdpTimePicker, $timeout, $mdpLocale) {
  return {
    restrict: 'E',
    require: ['ngModel', "^^?form"],
    transclude: true,
    templateUrl: function(element, attrs) {
      var noFloat = angular.isDefined(attrs.mdpNoFloat),
        placeholder = angular.isDefined(attrs.mdpPlaceholder) ? attrs.mdpPlaceholder : "",
        openOnClick = angular.isDefined(attrs.mdpOpenOnClick) || $mdpLocale.time.openOnClick;

      return 'mdpTimePicker.directive.html';
    },
    scope: {
      "minTime": "=?mdpMinTime",
      "maxTime": "=?mdpMaxTime",
      "timeFormat": "@mdpFormat",
      "okLabel": "@?mdpOkLabel",
      "cancelLabel": "@?mdpCancelLabel",
      "useUtc": "=?mdpUseUtc",
      "placeholder": "@mdpPlaceholder",
      "autoSwitch": "=?mdpAutoSwitch",
      "disabled": "=?mdpDisabled",
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
        if (time && time.isValid()) {
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

module.directive("mdpTimePicker", ["$mdpTimePicker", "$timeout", "$mdpLocale", mdpTimePickerDirective]);
