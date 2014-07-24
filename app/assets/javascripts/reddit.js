window.App = {
	Collections: {},
	Models: {},
	Routers: {},
	Views: {},
	
	initialize: function() {
		App.router = new App.Routers.AppRouter({
			$rootEl: $("#content")
		});
		Backbone.history.start();
	}
};