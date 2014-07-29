App.Views.subShow = Backbone.CompositeView.extend({
	template: JST["subs/subShow"],
	
	initialize: function() {
		var that = this;	
		this.postEl = "div.posts-list";
				
		var newPostView = new App.Views.postForm({
			model: new App.Models.Post({
				sub_id: this.model.id	
			})
		});
		
		this.addSubview("div.postPost", newPostView);
		
		this.collection.each(this.addPost.bind(this));
		
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.collection, "sync", this.render);		
		this.listenTo(this.collection, "add", this.addPost.bind(this));
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
		this.listenForScroll();
		return this;
	},
	
	deleteSub: function() {
		this.model.destroy();
		App.router.navigate("#", { trigger: true });
	},
	
	addPost: function(post) {
		console.log("Add post:");
		console.log(post);
		this.addSubview(this.postEl, new App.Views.basePostShow({
			model: post
		}));
	}
});