window.App = {
	Collections: {},
	Models: {},
	Routers: {},
	Views: {},
	
	initialize: function() {
		new App.Routers.AppRouter({
			$rootEl: $("#content")
		});
		Backbone.history.start();
	}
};