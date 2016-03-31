// Voyga

;(function() {

	"use strict";

	var isCordova = typeof cordova === "object";

	var Vcordova = {

		ready: function(callback) {

			if (isCordova) {

				document.addEventListener("deviceready", callback);

			} else {

				window.onload = callback;

			}

		},

		exit: function() {

			if (isCordova) {

				navigator.app.exitApp();

			}

		},

		back: function(callback) {

			if (isCordova) {

				document.addEventListener("backbutton", callback);

			}

		},

		menu: function(callback) {

			if (isCordova) {

				document.addEventListener("menubutton", callback);

			}

		},

		pause: function(callback) {

			if (isCordova) {

				document.addEventListener("pause", callback);

			}

		},

		resume: function(callback) {

			if (isCordova) {

				document.addEventListener("resume", callback);

			}

		},

		screenshot: function(callback, format, quality, name) {

			if (isCordova) {

				var screenshot = navigator.screenshot;

				callback = callback || function() {};
				format = format || "jpg";
				quality = quality || 50;

				if (screenshot) {

					screenshot.save(callback, format, quality, name);

				}

			}

		},

		splashscreen: {

			hide: function() {

				if (isCordova) {

					var splashscreen = navigator.splashscreen;

					if (splashscreen) {

						splashscreen.hide();

					}

				}

			},

			show: function() {

				if (isCordova) {

					var splashscreen = navigator.splashscreen;

					if (splashscreen) {

						splashscreen.show();

					}

				}

			}

		},

		toast: function(message, duration, position) {

			if (isCordova) {

				var toast = window.plugins.toast;

				if (toast) {

					message = message || "";
					duration = duration || "long";
					position = position || "center";

					toast.show(message, duration, position);

				}

			}

		},

		rotate: function(orientation) {

			if (isCordova) {

				var rotate = screen.lockOrientation;

				if (rotate) {

					rotate(orientation);

				}

			}

		},

		dialog: {

			alert: function(title, message, callback, buttonName) {

				if (isCordova) {

					var alert = navigator.notification.alert;

					title = title || "Alert";
					callback = callback || function() {};
					buttonName = buttonName || "OK";

					if (alert) {

						alert(message, callback, title, buttonName);

					}

				}

			},

			confirm: function(title, message, callback, buttonNames) {

				if (isCordova) {

					var confirm = navigator.notification.confirm;

					title = title || "Confirm";
					callback = callback || function() {};
					buttonNames = buttonNames || ["Cancel", "OK"];

					if (confirm) {

						confirm(message, callback, title, buttonNames);

					}

				}

			}

		}

	};

	if (typeof module !== "undefined" && typeof module.exports !== "undefined") {

		module.exports = Vcordova;

	} else if (typeof V !== "undefined") {

		V.extend("cordova", Vcordova);

	}

})();
