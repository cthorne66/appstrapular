define([
	'core'
], function (core) {

	mv.models.Link = Backbone.Model.extend({

		// Explicitly listing what attributes to expect in this model
		defaults: {
			url: '',
			display: '',
			target: ''
		},

		initialize: function () {}

	});

	return mv.models.Link;
});
