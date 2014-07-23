App.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		"": "subsIndex"
	},
	
	initialize: function(options) {
		this.$rootEl = options.$rootEl;
	},
	
	subsIndex: function() {
		App.subs.fetch();
		var view = new App.Views.subsIndex({
			collection: App.subs
		});
		this._swapView(view);
	},
	
	_swapView: function(view) {
		this._currentView && this._currentView.remove();
		this.$rootEl.html(view.render().el);
		this._currentView = view;
	}
	
});