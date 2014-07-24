App.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		"": "subsIndex",
		"subs/new": "subForm",
		"subs/:id/edit": "subForm",
		"subs/:id": "subShow",
		"posts/:id": "postShow",
		"unauthorized": "unauthorizedUser" 
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
	
	subShow: function(id) {
		var sub = App.subs.getOrFetch(id);
		var view = new App.Views.subShow({
			model: sub
		});
		this._swapView(view);
	},
	
	subForm: function(id) {
		if (id === undefined) {
			var sub = new App.Models.Sub();
		} else {
			var sub = App.subs.getOrFetch(id);
		}
		
		var view = new App.Views.subForm({
			model: sub
		});
		this._swapView(view);
	},
	
	postShow: function(id) {
		var post = new App.Models.Post({
			id: id	
		});
		post.fetch();
		var view = new App.Views.postShow({
			model: post
		});
		this._swapView(view);
	},
	
	_swapView: function(view) {
		this._currentView && this._currentView.remove();
		this.$rootEl.html(view.render().el);
		this._currentView = view;
	}
	
});