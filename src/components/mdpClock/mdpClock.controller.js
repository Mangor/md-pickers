/* global moment, angular */

var ClockCtrl = function($scope) {
  var self = this;
  var TYPE_HOURS = "hours";
  var TYPE_MINUTES = "minutes";

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
