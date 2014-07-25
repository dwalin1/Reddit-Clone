App.Views.commentForm = Backbone.View.extend({
	template: JST["comments/commentForm"],
	
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
		this.parent.removeSubview(this.el, this);
	},
	
	saveComment: function(event) {
		event.preventDefault();
		event.stopPropagation();
		var formData = $(event.target).serializeJSON();
		formData.comment.post_id = this.parent.model.get("post_id");
		formData.comment.parent_comment_id = this.parent.model.get("id");
		
		var that = this;
		this.model.save(formData, {
			success: function(model, response) {
				model.set({ post: that.parent.model.get("post") });
				that.parent.model.comments().add(model);
				that.parent.removeSubview(that.el, that);
				console.log("Success!");
			},
			error: function(model, response, thing3) {
				that.$el.html(response.responseJSON.msg);
			}
		})
	}
})