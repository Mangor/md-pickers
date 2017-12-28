/* global moment, angular */

var TimePickerDialogCtrl = function($scope, $mdDialog, time, useUtc, autoSwitch, ampm, $mdMedia) {
  var self = this;
  this.VIEW_HOURS = 1;
  this.VIEW_MINUTES = 2;
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
  "$mdMedia"
];

module.controller("TimePickerDialogCtrl", TimePickerDialogCtrl);
