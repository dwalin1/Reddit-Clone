App.Views.postShow = Backbone.View.extend({
	template: JST["posts/postShow"],
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render);	
	},
	
	events: {
		"click button.deletePost": "deletePost"
	},
	
	render: function() {
		var renderedContent = this.template({
			post: this.model
		});
		this.$el.html(renderedContent);
		return this;
	},
	
	deletePost: function() {
		var sub_id = this.model.get("sub_id");
		this.model.destroy();
		App.router.navigate("#subs/" + sub_id, { trigger: true });
	}
});