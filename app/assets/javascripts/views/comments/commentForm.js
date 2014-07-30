App.Views.commentForm = Backbone.View.extend({
	template: JST["comments/commentForm"],
	
	className: "li",
	
	initialize: function(options) {
		this.listenTo(this.model, "sync", this.render);
		this.parent = options.parent;		
	},
	
	events: {
		"submit form.commentForm": "saveComment",
		"click button.cancel": "removeThis"
	},
	
	render: function() {
		var renderedContent = this.template({
			comment: this.model,
		});
		this.$el.html(renderedContent);
		return this;
	},
	
	removeThis: function(event) {
		event.preventDefault();
		event.stopPropagation();
		console.log("Parent's commentEl: " + this.parent.commentEl);
		this.parent.removeSubview("ul.replyForm#reply-form-" + this.parent.model.id, this);
		this.parent.showingReplyForm = false;
	},
	
	saveComment: function(event) {
		event.preventDefault();
		event.stopPropagation();		
		var formData = $(event.target).serializeJSON();
		formData.comment.post_id = this.parent.model.get("post_id");
		formData.comment.parent_comment_id = this.parent.model.id;
		
		var that = this;
		this.model.save(formData, {
			success: function(model, response) {
				model.set({ post: that.parent.model.get("post") });
				model.set({ submitter: user });
				that.parent.model.comments().add(model);
				that.parent.removeSubview("ul.replyForm#reply-form-" + that.parent.model.id, that);
				that.parent.showingReplyForm = false;
				console.log("Success!");
			},
			error: function(model, response, thing3) {
				that.$el.prepend(response.responseJSON.msg);
			}
		})
	}
})