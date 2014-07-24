App.Views.commentShow = Backbone.View.extend({
	template: JST["comments/commentShow"],
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
	},
	
	events: {
		"click button.deleteComment": "deleteComment"
	},
	
	render: function() {
		var renderedContent = this.template({
			comment: this.model,
		});
		this.$el.html(renderedContent);
		return this;
	},
	
	deleteComment: function(event) {
		event.preventDefault();
		this.model.destroy();
		this.remove();
	}
})