App.Views.postShow = Backbone.CompositeView.extend({
	template: JST["posts/postShow"],
	
	initialize: function() {
		var view = this;
		this.commentEl = "ul.post-comments";
		this.model.top_level_comments().each(this.addComment.bind(this));
		
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.top_level_comments(), "add", this.addComment);		
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
		this.attachSubviews();
		return this;
	},
	
	addComment: function(comment) {
		// comment.set({ post: this.model });
		this.addSubview("ul.post-comments", new App.Views.commentShow({
			model: comment,
			parent: this
		}));
	},
	
	deletePost: function(event) {
		event.preventDefault();
		var sub_id = this.model.get("sub_id");
		this.model.destroy();
		App.router.navigate("#subs/" + sub_id, { trigger: true });
	},
	
	postComment: function(event) {
		event.preventDefault();
		event.stopPropagation();
		var formData = $(event.target).serializeJSON();
		$(event.target).children("textarea").val("");
		formData.comment.post_id = this.model.get("id");
		var comment = new App.Models.Comment(formData);
		var that = this;
		comment.save({}, {
			success: function(model, response) {
				console.log("Success!");
				model.set({ post: that.model });
				model.set({ submitter: user })
				that.model.top_level_comments().add(model);
			},
			
			error: function(model, response) {
				console.log("Error!");
			}
		})
	}
});