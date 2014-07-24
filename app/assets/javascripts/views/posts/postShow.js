App.Views.postShow = Backbone.View.extend({
	template: JST["posts/postShow"],
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render);	
	},
	
	events: {
		"click button.deletePost": "deletePost",
		"submit form.commentForm": "postComment"
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
	},
	
	postComment: function(event) {
		event.preventDefault();
		var formData = $(event.target).serializeJSON();
		formData.comment.post_id = this.model.get("id");
		var comment = new App.Models.Comment(formData);
		var that = this;
		comment.save({}, {
			success: function(model, response) {
				console.log("Success!");
				that.model.fetch();
			},
			
			error: function(model, response) {
				console.log("Error!");
			}
		})
	}
});