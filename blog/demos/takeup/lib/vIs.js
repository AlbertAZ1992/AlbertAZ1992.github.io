// Voyga

;(function() {

	"use strict";

	var is = function(value) {

		var toString = Object.prototype.toString;

		return {

			array: function() {

				return Array.isArray(value) || toString.call(value) === "[object Array]";

			},

			nan: function() {

				return value !== value;

			},

			number: function() {

				return toString.call(value) === "[object Number]" && !is(value).nan();

			},

			string: function() {

				return toString.call(value) === "[object String]";

			},

			boolean: function() {

				return value === true || value === false;

			},

			function: function() {

				return toString.call(value) === "[object Function]" || typeof value === "function";

			},

			object: function() {

				return typeof value === "function" || typeof value === "object" && !!value;

			},

			json: function() {

				return toString.call(value) === "[object Object]";

			},

			exists: function() {

				return value !== undefined && value !== null;

			},

			empty: function() {

				if (is(value).object()) {

					return Object.keys(value).length === 0;

				} else {

					return !is(value).exists() || value.length === 0;

				}

			},

			equals: function(other) {

				if (toString.call(value) !== toString.call(other)) {

					return false;

				} else {

					if (is(value).nan() && is(other).nan()) {

						return true;

					} else if (is(value).array() && is(other).array()) {

						if (value.length !== other.length) {

							return false;

						} else {

							for (var i = 0; i < value.length; i++) {

								if (is(value[i]).array() && is(other[i]).array()) {

									if (!is(value[i]).equals(other[i])) {

										return false;

									}

								} else {

									if (value[i] !== other[i]) {

										return false;

									}

								}

							}

							return true;

						}

					} else if (is(value).json() && is(other).json()) {

						var propOne = Object.getOwnPropertyNames(value),
							propTwo = Object.getOwnPropertyNames(other),
							propName;

						if (propOne.length !== propTwo.length) {

							return false;

						} else {

							for (var j = 0; j < propOne.length; j++) {

								propName = propOne[j];

								if (is(value[propName]).json() && is(other[propName]).json()) {

									if (!is(value[propName]).equals(other[propName])) {

										return false;

									}

								} else {

									if (value[propName] !== other[propName]) {

										return false;

									}

								}

							}

							return true;

						}

					} else {

						return value === other;

					}

				}

				return false;

			},

			date: function() {

				return toString.call(value) === "[object Date]";

			},

			error: function() {

				return toString.call(value) === "[object Error]";

			},

			regexp: function() {

				return toString.call(value) === "[object RegExp]";

			},

			dom: function() {

				return is(value).object() && value.nodeType > 0;

			},

			email: function() {

				return /^.+@.+(\..+){1,3}$/.test(value);

			},

			what: function() {

				if (value === null) {

					return "null";

				} else if (value === undefined) {

					return "undefined";

				} else if (is(value).nan()) {

					return "nan";

				} else {

					return toString.call(value).replace(/(\[object\s)|(\]$)/g, "").toLowerCase();

				}

			}

		};

	};

	if (typeof module !== "undefined" && typeof module.exports !== "undefined") {

		module.exports = is;

	} else if (typeof V !== "undefined") {

		V.extend("is", is);

	}

})();
