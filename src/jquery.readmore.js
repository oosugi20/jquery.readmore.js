;(function ($, window, undefiend) {
'use script';

var MODULE_NAME = 'Readmore';
var PLUGIN_NAME = 'readmore';
var Module;


/**
 * Module
 */
Module = function (element, options) {
	this.el = element;
	this.$el = $(element);
	this.options = $.extend({
	}, options);
};

(function (fn) {
	/**
	 * init
	 */
	fn.init = function () {
		this.url = this.$el.attr('data-readmore-url');
		this.target = this.$el.attr('data-readmore-target');
		this.$target = $(this.target);
		this._eventify();
		var _this = this;
		setTimeout(function () {
			_this.$el.trigger('readmore:initialized');
		}, 4);
	};

	/**
	 * fetch
	 */
	fn.fetch = function (url) {
		return $.Deferred(function (defer) {
			$.ajax({
				dataType: 'html',
				url: url,
				success: defer.resolve,
				error: defer.reject
			});
		}).promise();
	};

	/**
	 * append
	 */
	fn.append = function (data) {
		this.$target.append(data);
		this.$el.trigger('readmore:appended');
	};

	/**
	 * pull
	 */
	fn.pull = function () {
		var _this = this;
		this.$el.trigger('readmore:beforePull');
		this.fetch(this.url).then(function (data) {
			_this.$el.trigger('readmore:afterPull');
			_this.append(data);
		});
	};

	/**
	 * clicked
	 */
	fn.clicked = function (event) {
		event.preventDefault();
		this.pull();
	};

	/**
	 * _eventify
	 */
	fn._eventify = function () {
		this.$el.on('click', $.proxy(this.clicked, this));
	};

})(Module.prototype);


// set jquery.fn
$.fn[PLUGIN_NAME] = function (options) {
	return this.each(function () {
		var module;
		if (!$.data(this, PLUGIN_NAME)) {
			module = new Module(this, options);
			$.data(this, PLUGIN_NAME, module);
			module.init();
		}
	});
};

// set global
$[MODULE_NAME] = Module;

})(jQuery, this);
