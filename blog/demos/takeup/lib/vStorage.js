// Voyga

;(function() {

	"use strict";

	var Utils = {

		toString: function(val) {

			return Object.prototype.toString.call(val);

		},

		isArr: function(val) {

			return Array.isArray(val) || toString(val) === "[object Array]";

		},

		isObj: function(val) {

			return toString(val) === "[object Object]";

		},

		isNum: function(val) {

			return toString(val) === "[object Number]" && val === val;

		},

		get: function(name) {

			return JSON.parse(window.localStorage.getItem(name));

		},

		set: function(name, val) {

			window.localStorage.setItem(name, JSON.stringify(val));

		},

		remove: function(name) {

			window.localStorage.removeItem(name);

		}

	};

	var Storage = function(name, init) {


		var data = Utils.get(name);
		this.name = name;

		if (data) {
			// console.log('1');
			this.data = data;

		} else {
			// console.log('2');
			init = init === undefined ? [] : init;
			this.data = init;

			Utils.set(name, init);

		}

	};

	Storage.prototype = {

		toString: function() {

			return this.data;

		},

		save: function() {

			Utils.set(this.name, this.data);

			return this;

		},

		set: function(val) {

			this.data = val;
			this.save();

			return this;

		},

		add: function(val) {

			if (Utils.isArr(this.data)) {

				this.data.push(val);
				this.save();

			}

			return this;

		},

		includes: function(val) {

			if (Utils.isArr(this.data)) {

				return this.data.indexOf(val) !== -1;

			} else if (Utils.isObj(this.data)) {

				return this.data.hasOwnProperty(val);

			}

			return false;

		},

		delete: function(val) {

			if (Utils.isArr(this.data)) {

				var index = Utils.isNum(val) ? val : this.data.indexOf(val);

				if (index !== -1) {

					this.data.splice(index, 1);
					this.save();

				}

				return this;

			}

			return this;

		},

		clear: function() {

			Utils.remove(this.name);

			return this;

		}

	};

	var api = function(name, init) {

		return new Storage(name, init);

	};

	if (typeof module !== "undefined" && typeof module.exports !== "undefined") {

		module.exports = api;

	} else if (typeof V !== "undefined") {

		V.extend("storage", api);

	}

})();
