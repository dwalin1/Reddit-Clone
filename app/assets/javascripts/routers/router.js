App.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		"": "frontPage",
		"subs": "subsIndex",
		"subs/new": "subForm",
		"subs/:id/edit": "subForm",
		"subs/:id": "subShow",
		"posts/:sub/new": "postNew",
		"posts/:id/edit": "postEdit",
		"posts/:id": "postShow",
	},
	
	initialize: function(options) {
		this.$rootEl = options.$rootEl;
	},
	
	frontPage: function() {
		App.posts.fetch({
			data: { page: 1, remove: false }
		});
		var view = new App.Views.postsIndex({
			collection: App.posts
		});
		this._swapView(view);
	},
	
	subsIndex: function() {
		App.subs.fetch();
		var view = new App.Views.subsIndex({
			collection: App.subs
		});
		this._swapView(view);
	},
	
	subShow: function(id) {
		var sub = new App.Models.Sub({ id: id });
		sub.fetch();		
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
	
	postForm: function(post) {
		var view = new App.Views.postForm({
			model: post
		});
		this._swapView(view);
	},
	
	postNew: function(sub) {
		var post = new App.Models.Post({
			sub_id: sub
		});
		this.postForm(post);
	},
	
	postEdit: function(id) {
		var post = new App.Models.Post({id: id});
		post.fetch();
		this.postForm(post);
	},
	
	_swapView: function(view) {
		this._currentView && this._currentView.remove();
		this.$rootEl.html(view.render().el);
		this._currentView = view;
	}
	
});