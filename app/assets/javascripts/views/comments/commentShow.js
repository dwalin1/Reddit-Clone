App.Views.commentShow = Backbone.CompositeView.extend({
	template: JST["comments/commentShow"],
	
	formTemplate: JST["comments/commentForm"],
	
	form: false,
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.comments(), "add remove", this.render);
	},
	
	events: {
		"click button.deleteComment": "deleteComment",
		"click button.editComment": "editComment",
		"submit form.commentForm": "updateComment",
		"click button.replyForm": "showReplyForm"
	},
	
	render: function() {
		template = this.form ? this.formTemplate : this.template;
		
		var renderedContent = template({
			comment: this.model,
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
	
	deleteComment: function(event) {
		event.preventDefault();
		event.stopPropagation();
		this.model.destroy();
		this.remove();
	},
	
	editComment: function(event) {
		event.preventDefault();
		event.stopPropagation();
		this.form = true;
		this.render();
	},
	
	updateComment: function(event) {
		event.preventDefault();
		event.stopPropagation();
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
	},
	
	showReplyForm: function(event) {
		event.preventDefault();
		event.stopPropagation();
		var commentForm = new App.Views.commentForm({
			model: new App.Models.Comment(),
			parent: this
		});
		this.addSubview($("div.replyForm"), commentForm);
	}
})