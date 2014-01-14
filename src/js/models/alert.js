define([
	'core'
], function (core) {

	mv.models.Alert = Backbone.Model.extend({

		// Explicitly listing what attributes to expect in this model
		defaults: {
			type: '',
			message: '',
			icon: '',
			scheme: ''
		},

		initialize: function () {}

	});

	return mv.models.Alert;
});
