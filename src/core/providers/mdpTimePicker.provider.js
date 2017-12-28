var mdpTimePickerProvider = function() {
  var LABEL_OK = "OK",
    LABEL_CANCEL = "Cancel",
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
      if (!angular.isDate(time)) time = Date.now();
      if (!angular.isObject(options)) options = {};

      var labelOk = options.okLabel || $mdpLocale.time.okLabel || LABEL_OK;
      var labelCancel = options.cancelLabel || $mdpLocale.time.cancelLabel || LABEL_CANCEL;

      return $mdDialog.show({
        controller: "TimePickerDialogCtrl",
        controllerAs: 'timepicker',
        clickOutsideToClose: true,
        templateUrl: 'mdpTimePickerDialog.component.html',
        targetEvent: options.targetEvent,
        locals: {
          time: time,
          autoSwitch: options.autoSwitch,
          ampm: angular.isDefined(options.ampm) ? options.ampm : $mdpLocale.time.ampm,
          useUtc: options.useUtc
        },
        multiple: true,
        parent: PARENT_GETTER()
      });
    };

    return timePicker;
  }];
};

module.provider("$mdpTimePicker", mdpTimePickerProvider);
