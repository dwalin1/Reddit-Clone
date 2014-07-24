App.Views.postShow = Backbone.CompositeView.extend({
	template: JST["posts/postShow"],
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.comments(), "add remove", this.render);
		console.log(user_id);
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
		
		var view = this;
		var $commentEl = $("ul.comments");
		
		this.model.comments().each(function(comment) {
			var commentShow = new App.Views.commentShow({
				model: comment
			});
			view.addSubview($commentEl, commentShow);	
		});
				
		return this;
	},
	
	deletePost: function(event) {
		event.preventDefault();
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
				that.model.comments().add(model);
			},
			
			error: function(model, response) {
				console.log("Error!");
			}
		})
	}
});