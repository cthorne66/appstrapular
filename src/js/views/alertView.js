define([
	'core',
	'models/alert',
	'text!html/tplAlert.html',
], function (core, Alert, template) {

	mv.views.AlertView = Backbone.View.extend({

		el: '#alert-container',

		template: _.template(template),

		initialize: function () {
			this.model = new Alert();
		},

		render: function () {
			this.$el.html(
				this.template({
					alert: this.model.toJSON()
				}));
		},

		events: {
			'click #purge': 'hideMainAlert',
			'global alerts/showMainAlert': 'showMainAlert',
			'global alerts/hideMainAlert': 'hideMainAlert'
		},

		/**
		 * Showing the received alert on the page
		 * @param  {Object} alertData Object containing the type and message of an alert
		 */
		showMainAlert: function (alertData) {
			this.model.clear();
			this.populateAlertValues(alertData);
			this.render();
			$('html, body').animate({
				scrollTop: 0
			}, 500);
		},

		/**
		 * Hiding any displayed alerts currently shown on the page
		 */
		hideMainAlert: function (alertData) {
			this.$el.html('');
			this.model.clear();
		},

		/**
		 * Determining what type of alert to show, and updating the model
		 * @param  {Object} alertData Object containing the type and message of an alert
		 */
		populateAlertValues: function (alertData) {
			switch (alertData.type) {
			case mv.enums.alertTypes.SUCCESS:
				this.model.set({
					type: alertData.type,
					icon: 'ok',
					message: alertData.message,
					scheme: 'success'
				});
				break;
			case mv.enums.alertTypes.WARNING:
				this.model.set({
					type: alertData.type,
					icon: 'minus',
					message: alertData.message,
					scheme: 'warning'
				});
				break;
			case mv.enums.alertTypes.DANGER:
				this.model.set({
					type: alertData.type,
					icon: 'remove',
					message: alertData.message,
					scheme: 'danger'
				});
				break;
			default:
				this.model.set({
					type: 'Default',
					icon: 'stop',
					message: 'Alert improperly triggered: please check your work',
					scheme: 'default'
				});
			}
		}

	});

	return mv.views.AlertView;
});
