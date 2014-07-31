App.Views.postsIndex = Backbone.CompositeView.extend({
	template: JST["posts/postsIndex"],
	
	initialize: function() {	
		var that = this;	
		this.postEl = "div.posts";
		this.collection.each(this.addPost.bind(this));
		
		
		this.listenTo(this.collection, "sync", this.render);		
		this.listenTo(this.collection, "add", this.addPost.bind(this));
	},
	
	events: {
	},
	
	render: function() {
		var renderedContent = this.template({
			posts: this.collection,
		});
		this.$el.html(renderedContent);
		this.attachSubviews();
		this.listenForScroll();
		return this;
	},
	
	addPost: function(post) {		
		this.addSubview(this.postEl, new App.Views.basePostShow({
			model: post
		}));
	}
});