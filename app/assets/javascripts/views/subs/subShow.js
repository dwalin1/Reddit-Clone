App.Views.subShow = Backbone.CompositeView.extend({
	template: JST["subs/subShow"],
	
	initialize: function() {		
		var newPostView = new App.Views.postForm({
			model: new App.Models.Post({
				sub_id: this.model.id	
			})
		});
		
		this.addSubview("div.postPost", newPostView);
		
		this.listenToOnce(this.model, "sync", function() {
			this.model.posts().each(this.addPost.bind(this));
		});
		
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.posts(), "sync", this.render);		
	},
	
	events: {
		"click button.deleteSub": "deleteSub"
	},
	
	render: function() {
		var renderedContent = this.template({
			sub: this.model,
		});
		this.$el.html(renderedContent);
		
		this.attachSubviews();
		return this;
	},
	
	deleteSub: function() {
		this.model.destroy();
		App.router.navigate("#", { trigger: true });
	},
	
	addPost: function(post, index) {
		this.addSubview("div.posts-list", new App.Views.basePostShow({
			model: post,
			index: index
		}));
	}
});