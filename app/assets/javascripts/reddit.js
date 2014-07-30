window.App = {
	Collections: {},
	Models: {},
	Routers: {},
	Views: {},
	
	initialize: function() {
		//add mixins to my classes
		_.extend(App.Views.basePostShow.prototype, voteMixIn);
		_.extend(App.Views.commentShow.prototype, voteMixIn);
		
		_.extend(App.Views.postsIndex.prototype, scrollMixIn);
		_.extend(App.Views.subShow.prototype, scrollMixIn);
		_.extend(App.Views.postShow.prototype, scrollMixIn);
		
		App.router = new App.Routers.AppRouter({
			$rootEl: $("#content")
		});
		Backbone.history.start();
	}
};

App.error_style = function(errors) {
	return "<div class='alert alert-danger'>" + errors.join(" ") + "</div>";	
};