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
		
		//add mixins to my classes
		_.extend(App.Views.basePostShow.prototype, voteMixIn);
		_.extend(App.Views.commentShow.prototype, voteMixIn);
	}
};