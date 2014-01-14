define([
	'core',
	'text!html/tplAlerts.html'
], function (core, template) {

	mv.views.AlertsView = Backbone.View.extend({

		el: '',

		template: _.template(template),

		initialize: function () {},

		render: function () {
			this.$el.html(
				this.template({})
			);
		},

		events: {
			'click .btn-success': 'successClick',
			'click .btn-warning': 'warningClick',
			'click .btn-danger': 'dangerClick'
		},

		/**
		 * To publish a global message for a successful alert
		 * @param  {Object} event The actual triggering event
		 */
		successClick: function (event) {
			event.preventDefault();
			Backbone.trigger('alerts/showMainAlert', {
				type: mv.enums.alertTypes.SUCCESS,
				message: 'we succeeded'
			});
		},

		/**
		 * To publish a global message for a warning alert
		 * @param  {Object} event The actual triggering event
		 */
		warningClick: function (event) {
			event.preventDefault();
			Backbone.trigger('alerts/showMainAlert', {
				type: mv.enums.alertTypes.WARNING,
				message: 'this could be bad'
			});
		},

		/**
		 * To publish a global message for a danger alert
		 * @param  {Object} event The actual triggering event
		 */
		dangerClick: function (event) {
			event.preventDefault();
			Backbone.trigger('alerts/showMainAlert', {
				type: mv.enums.alertTypes.DANGER,
				message: 'all is failed'
			});
		}
	});

	return mv.views.AlertsView;
});
