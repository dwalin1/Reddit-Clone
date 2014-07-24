App.Views.commentShow = Backbone.View.extend({
	template: JST["comments/commentShow"],
	
	formTemplate: JST["comments/commentForm"],
	
	form: false,
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
	},
	
	events: {
		"click button.deleteComment": "deleteComment",
		"click button.editComment": "editComment",
		"submit form.subCommentForm": "updateComment"
	},
	
	render: function() {
		template = this.form ? this.formTemplate : this.template;
		
		var renderedContent = template({
			comment: this.model,
		});
		this.$el.html(renderedContent);
		return this;
	},
	
	deleteComment: function(event) {
		event.preventDefault();
		this.model.destroy();
		this.remove();
	},
	
	editComment: function(event) {
		event.preventDefault();
		this.form = true;
		this.render();
	},
	
	updateComment: function(event) {
		event.preventDefault();
		this.form = false;
		var formData = $(event.target).serializeJSON();
		formData.id = this.model.get("id");
		
		this.model.save(formData, {
			success: function(model, response) {
				console.log("Comment updated!");
			},

			error: function(model, response) {
				console.log("Comment could not be updated.");
			}
		});
	}
})