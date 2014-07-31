App.Views.userShow = Backbone.CompositeView.extend({
	template: JST["users/showUser"],
	
	initialize: function() {
		this.postEl = "div.posts-list";
		this.model.posts().each(this.addPost.bind(this));
		
		this.listenTo(this.model.posts(), "add", this.addPost.bind(this));
		
		this.listenTo(this.model, "sync", this.render);
	},
	
	render: function() {
		var renderedContent = this.template({
			user: this.model,
			subs: this.model.subs()
		});
		this.$el.html(renderedContent);
		this.attachSubviews();
		return this;
	},
	
	addPost: function(post) {
		this.addSubview(this.postEl, new App.Views.basePostShow({
			model: post
		}));
	}
});