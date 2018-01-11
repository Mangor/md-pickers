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
      if (!angular.isDate(currentDate)) {
        currentDate = Date.now();
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
