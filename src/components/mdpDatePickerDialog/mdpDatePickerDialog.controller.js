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

  this.setCurrentDate = function(){
    self.date = self.useUtc ? moment.utc() : moment();
  }

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
