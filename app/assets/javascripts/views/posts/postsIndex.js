App.Views.postsIndex = Backbone.CompositeView.extend({
	template: JST["posts/postsIndex"],
	
	initialize: function() {		
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
	}
});