/* global moment, angular */

var mdpDatePickerDirective = function($mdpDatePicker, $timeout, $mdpLocale) {
  return {
    restrict: 'E',
    require: ['ngModel', "^^?form"],
    transclude: true,
    templateUrl: function(element, attrs) {
      var noFloat, placeholder, openOnClick;

      noFloat = angular.isDefined(attrs.mdpNoFloat);
      placeholder = angular.isDefined(attrs.mdpPlaceholder) ? attrs.mdpPlaceholder : "";
      openOnClick = angular.isDefined(attrs.mdpOpenOnClick) || $mdpLocale.date.openOnClick;

      return 'mdpDatePicker.directive.html';
    },
    scope: {
      "minDate": "=mdpMinDate",
      "maxDate": "=mdpMaxDate",
      "okLabel": "@?mdpOkLabel",
      "cancelLabel": "@?mdpCancelLabel",
      "dateFilter": "=mdpDateFilter",
      "dateFormat": "@mdpFormat",
      "useUtc": "=?mdpUseUtc",
      "placeholder": "@mdpPlaceholder",
      "noFloat": "=mdpNoFloat",
      "openOnClick": "=mdpOpenOnClick",
      "disabled": "=?mdpDisabled",
      "inputName": "@?mdpInputName",
      "clearOnCancel": "=?mdpClearOnCancel"
    },
    link: {
      pre: function(scope, element, attrs, constollers, $transclude) {

      },
      post: function(scope, element, attrs, controllers, $transclude) {
        var ngModel = controllers[0];
        var form = controllers[1];

        var opts = {
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

        var inputElement = angular.element(element[0].querySelector('input')),
          inputContainer = angular.element(element[0].querySelector('md-input-container')),
          inputContainerCtrl = inputContainer.controller("mdInputContainer");

        $transclude(function(clone) {
          inputContainer.append(clone);
        });

        var messages = angular.element(inputContainer[0].querySelector("[ng-messages]"));

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
          if (date && date.isValid()) {
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
          var value = scope.useUtc ? moment.utc(date, angular.isDate(date) ? null : scope.dateFormat, true) : moment(date, angular.isDate(date) ? null : scope.dateFormat, true),
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
