// Voyga

V.init(function() {

	var App = new Vue({

		el: "body",

		data: (function() {

			var birthday = V.storage("birthday", "1998-08-02"),
				height = V.storage("height", 70);

			return {

				birthday: birthday,
				height: height,
				// canvasWidth: V("#graphicBox").width(),
				// canvasHeight: V("#graphicBox").height(),
				display: V.storage("display", "left"),
				left: 0,
				lived: 0,
				age: 0,
				timer: 0,

				inputs: {

					year: V.date(birthday.data).yearStr(),
					month: V.date(birthday.data).monthStr(),
					date: V.date(birthday.data).dateStr(),
					height: height.data

				},

				status: {

					setting: true

				},

				static: {

					colors: [["#72e0f9", "#fff577"], ["#ef6360", "#ffeb3b"]]

				}

			};

		})(),

		methods: {

			go: function() {

				this.update();

				if (this.timer) {

					clearInterval(this.timer);

				}

				this.timer = setInterval((function(self) {

					return function() {

						self.update();

					};

				})(this), this.interval);

			},

			update: function() {

				this.left = Math.floor(V.date(this.deathDate).diff(V.date().proto, "second") / 1000);
				this.lived = Math.floor(V.date().diff(this.birthday.data, "second") / 1000);
				this.age = (V.date().diff(this.birthday.data, "second") / (1000 * 60 * 60 * 24 * 365)).toFixed(9);

			},

			save: function() {

				if (this.isBirthdayValid) {

					this.birthday.set(this.inputDate);

				} else {

					this.inputs.year = V.date(this.birthday.data).yearStr();
					this.inputs.month = V.date(this.birthday.data).monthStr();
					this.inputs.date = V.date(this.birthday.data).dateStr();
				}

				this.height.set(this.inputs.height);
			}

		},

		computed: {

			ratio: function() {

				var total = V.date(this.deathDate).diff(V.date(this.birthday.data), "second"),
					now = V.date().diff(V.date(this.birthday.data).proto, "second");

				return (now / total).toFixed(3);

			},

			colorParam: function() {

				return this.ratio < 0.5 ? 0 : 1;

			},

			// deathDate: function() {

			// 	return V.date(this.birthday.data).calc("year", this.lifespan.data).format();

			// },

			inputDate: function() {

				return this.inputs.year + "-" + this.inputs.month + "-" + this.inputs.date;

			},

			isBirthdayValid: function() {

				return V.date(this.inputDate).proto.toString() !== "Invalid Date";

			},

			// isLifespanValid: function() {

			// 	return parseInt(this.inputs.year) + parseInt(this.inputs.lifespan) > V.date().year();

			// },

			// interval: function() {

			// 	return (function(self) {

			// 		return {

			// 			left: 1000,
			// 			lived: 1000,
			// 			age: 20

			// 		};

			// 	})(this)[this.display.data];

			// },

			// displayNumber: function() {

			// 	return (function(self) {

			// 		return {

			// 			left: self.left,
			// 			lived: self.lived,
			// 			age: self.age

			// 		};

			// 	})(this)[this.display.data];

			// },

			// displayText: function() {

			// 	return {

			// 		left: "seconds to live",
			// 		lived: "seconds lived",
			// 		age: "years old"

			// 	}[this.display.data];

			// }

		},

		// ready: function() {

		// 	this.go();

		// }

	});

	V.cordova.ready(function() {

		// var Misc = {

		// 	fastclickInit: function() {

		// 		FastClick.attach(V("body").el);

		// 	}

		// };

		// Misc.fastclickInit();

		// V.cordova.back(function() {

		// 	if (App.status.setting === false) {

		// 		V.cordova.exit();

		// 	}

		// 	App.status.setting = false;

		// });

		// V.cordova.splashscreen.hide();
		V("body").appear();

	});

});
