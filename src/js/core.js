define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'backboneGlobal'
], function ($, _, Backbone) {
	/**
	 * Overriding the default templating syntax used by underscore to look more like
	 * handlebars or mustache
	 */
	_.templateSettings = {
		evaluate: /{{([\s\S]+?)}}/g,
		interpolate: /{{=([\s\S]+?)}}/g,
		escape: /{{-([\s\S]+?)}}/g
	};

	/**
	 * A method used in the routing to allow for a view to do whatever setup work it needs to
	 * (aka fetch data) before rendering.  This insures every view at least has this method.  It
	 * is meant to be overridden in views having specific setup
	 */
	Backbone.View.prototype.setup = function () {};

	/**
	 * This method is to aide with garbage collection.  This ensures every view has a close method. It
	 * in turn will call any existing onClose method you may choose to add in a view for specifics
	 * around closing a particular view
	 * @param  {Boolean} [removeDOM] Pass as true if you want it to completely remove the view from the DOM.
	 *   WARNING: If passed as true, this may also remove the $el element from the page, based on how you define it
	 */
	Backbone.View.prototype.close = function (removeDOM) {
		var remove = (typeof removeDOM !== 'undefined' && removeDOM);
		if (remove) {
			this.remove();
		}
		this.unbind();
		this.undelegateEvents();
		if (this.onClose) {
			this.onClose();
		}
	};

	//listen for any ajax errors in the site
	$(document).ajaxError(function (event, jqxhr, settings, exception) {
		console.log(event, jqxhr, settings, exception);
	});
});
