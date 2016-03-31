// Voyga

;(function() {

	"use strict";

	var Utils = {

			ONEDAY: 24 * 60 * 60 * 1000,

			toArray: function(thing) {

				return Array.prototype.slice.call(thing);

			},

			strCount: function(str, letter) {

				var arr = str.split(""),
					count = 0;

				for (var i = str.indexOf(letter); i < arr.length; i++) {

					if (arr[i] === letter) {

						count += 1;

					}

				}

				return count;

			},

			formatLength: function(thing, length) {

				var newStr = thing + "",
					diff = length - newStr.length,
					i = 0;

				if (diff >= 0) {

					for (i = 0; i < diff; i++) {

						newStr = "0" + newStr;

					}

				} else {

					for (i = 0; i < -diff; i++) {

						newStr = newStr.substring(1);

					}

				}

				return newStr;

			},

			generateDate: function() {

				var args = Utils.toArray(arguments);
				// console.log(args);
				if (args.length === 3) {
					// sconsole.log(Utils.formatLength(args[0], 4))
					return [Utils.formatLength(args[0], 4), Utils.formatLength(args[1], 2), Utils.formatLength(args[2], 2)].join("-");

				} else if (args[0] instanceof Date) {

					var year = args[0].getFullYear(),
						month = args[0].getMonth(),
						date = args[0].getDate();

					console.log(month);
					// console.log(Utils.formatLength(year, 4));

					return [Utils.formatLength(year, 4), Utils.formatLength(month, 2), Utils.formatLength(date, 2)].join("-");

				}

			}

		};

	var Vdate = function(date) {

		this.proto = date === undefined ? new Date() : new Date(date);

	};

	Vdate.prototype = {

		toString: function() {

			return Utils.generateDate(this.proto);

		},

		toArray: function() {

			return [this.year(), this.month(), this.date()];

		},

		year: function(newYear) {

			if (newYear === undefined) {

				return this.proto.getFullYear();

			} else {

				return new Vdate(Utils.generateDate(newYear, this.month(), this.date()));

			}

		},

		yearStr: function() { return Utils.formatLength(this.year(), 4); },

		month: function(newMonth) {

			if (newMonth === undefined) {

				console.log(this.proto.getMonth());
				return this.proto.getMonth();

				// return this.proto.getMonth() + 1;

			} else {

				return new Vdate(Utils.generateDate(this.year(), newMonth, this.date()));

			}

		},

		monthStr: function() { return Utils.formatLength(this.month(), 2); },

		date: function(newDate) {

			if (newDate === undefined) {

				console.log(this.proto.getDate());
				return this.proto.getDate();

			} else {

				return new Vdate(Utils.generateDate(this.year(), this.month(), newDate));

			}

		},

		dateStr: function() { return Utils.formatLength(this.date(), 2); },

		day: function(ifText) {

			var index = this.proto.getDay(),

				days = [

					"sunday",
					"monday",
					"tuesday",
					"wednesday",
					"thursday",
					"friday",
					"saturday"

				];

			return ifText === true ? days[index] : index;

		},

		time: function() {

			return this.proto.getTime();

		},

		format: function(pattern) {

			var year = this.year(),
				month = this.month()+1,
				date = this.date();

			console.log(year);
			console.log(month);
			console.log(date);

			if (pattern === undefined) {

				return Utils.generateDate(year, month, date);

			} else {

				pattern = pattern.toUpperCase();
				console.log(pattern);

				year = Utils.formatLength(year, Utils.strCount(pattern, "Y"));
				month = Utils.formatLength(month, Utils.strCount(pattern, "M"));
				date = Utils.formatLength(date, Utils.strCount(pattern, "D"));

				var formated = (year + month + date).split("");

				console.log(formated);
				for (var i = 0; i < pattern.length; i++) {

					if (pattern[i] !== "Y" &&
						pattern[i] !== "M" &&
						pattern[i] !== "D") {

						formated.splice(i, 0, pattern[i]);

					}

				}

				return formated.join("");

			}

		},

		earlier: function(another) {

			if (!(another instanceof Vdate)) {

				another = new Vdate(another);

			}

			var arr = this.toArray().map(function(i) { return parseInt(i); }),
				anotherArr = another.toArray().map(function(i) { return parseInt(i); });

			for (var i = 0 ; i < arr.length ; i ++) {

				if (arr[i] > anotherArr[i]) {

					return false;

				} else if (arr[i] < anotherArr[i]) {

					return true;

				}

			}

			return false;

		},

		later: function(another) {

			if (!(another instanceof Vdate)) {

				another = new Vdate(another);

			}

			if (another.format() === this.format()) {

				return false;

			} else {

				return !this.earlier(another);

			}

		},

		calc: function(obj, val) {

			// var oldDate = new Date([this.year(), this.month(), this.date()].join("-"));
			var oldDate = new Date(this.year(), this.month()+1, this.date());
			// console.log(oldDate);
			switch (obj) {

				case "day": {

					return (function(self) {

						var newDate = new Date(oldDate.getTime() + val * Utils.ONEDAY);
						// console.log(newDate);
						return new Vdate(Utils.generateDate(newDate));

					})(this);

				}

				case "month": {

					return (function(self) {

						var year = parseInt(self.year()),
							month = parseInt(self.month()),
							newMonth = month + val > 12 ? month + val - 12 : month + val,
							newYear = month + val > 12 ? year + 1 : year;

						return new Vdate(Utils.generateDate(newYear, newMonth, self.date()));

					})(this);

				}

				case "year": {

					return (function(self) {

						var newYear = parseInt(self.year()) + val;

						return new Vdate(Utils.generateDate(newYear, self.month(), self.date()));

					})(this);

				}

			}

		},

		to: function(date, unit) {

			return -this.diff(date, unit);

		},

		from: function(date, unit) {

			return this.diff(date, unit);

		},

		diff: function(date, unit) {

			unit = unit || "day";

			switch (unit) {

				case "second": {

					return (function(self) {

						return self.proto - new Date(date);

					})(this);

				}

				case "day": {

					return (function(self) {

						return Math.floor((self.diff(date, "second")) / Utils.ONEDAY);

					})(this);

				}

				case "month": {

					return (function(self) {

						var target = new Vdate(date);

						return self.diff(date, "year") * 12 + self.month() - target.month();

					})(this);

				}

				case "year": {

					return (function(self) {

						var target = new Vdate(date);

						return self.year() - target.year();

					})(this);

				}

				default: return 0;

			}

		},

		today: function() {

			return new Vdate(Utils.generateDate(new Date()));

		}

	};

	var api = function(date) {

		return new Vdate(date);

	};

	if (typeof module !== "undefined" && typeof module.exports !== "undefined") {

		module.exports = api;

	} else if (typeof V !== "undefined") {

		V.extend("date", api);

	}

})();
