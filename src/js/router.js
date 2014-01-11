define([
	'core'
], function (core) {
	var view = null; //attempting to minimize objects in memory by reusing this var for views

	/**
	 * Function used to check if a route's view is already in existence.  If so, it will trigger
	 * the close method of that view, which is prototyped into all views in core.js
	 * @param  {Object} aView  The view to be potentially closed
	 */
	var closeView = function (aView) {
		try {
			if (aView) {
				aView.close();
			}
		} catch (error) {
			console.log('error closing view ', error);
		}
	};

	return Backbone.Router.extend({
		initialize: function () {},

		routes: {
			'.*': 'indexView',
			'alerts': 'alertsView'
		},

		mainContainer: '#main-container',
		alertContainer: '#alert-container',

		indexView: function () {
			require(['views/homeView'], function (HomeView) {
				closeView(mv.i.views.homeView);
				view = mv.i.views.homeView = new HomeView({
					el: mv.sections.mainContainer
				});
				$.when(view.setup())
					.done(function () {
						view.render();
					})
					.fail(function (error) {
						console.log('index view failed');
					});
			});
		},

		alertsView: function () {
			require(['views/alertsView'], function (AlertsView) {
				closeView(mv.i.views.alertsView);
				view = mv.i.views.alertsView = new AlertsView({
					el: mv.sections.mainContainer
				});
				$.when(view.setup())
					.done(function () {
						view.render();
					})
					.fail(function (error) {
						console.log('alerts view failed');
					});
			});
		}

	});
});
