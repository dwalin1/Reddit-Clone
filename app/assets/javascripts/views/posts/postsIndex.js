App.Views.postsIndex = Backbone.CompositeView.extend({
	template: JST["posts/postsIndex"],
	
	initialize: function() {		
		this.postEl = "div.posts";
		this.listenToOnce(this.collection, "sync", function() {
			this.collection.each(this.addPost.bind(this));
		});
		this.listenTo(this.collection, "sync", this.render);
	},
	
	events: {
	},
	
	render: function() {
		var renderedContent = this.template({
			posts: this.collection,
		});
		this.$el.html(renderedContent);
		this.attachSubviews();
		return this;
	},
	
	addPost: function(post, index) {
		console.log("Hello from addPost");
		this.addSubview(this.postEl, new App.Views.basePostShow({
			model: post,
			index: index
		}));
	},
});