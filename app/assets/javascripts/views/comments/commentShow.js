App.Views.commentShow = Backbone.CompositeView.extend({
	template: JST["comments/commentShow"],
	
	formTemplate: JST["comments/commentForm"],
	
	form: false,
	
	initialize: function(options) {
		this.parent = options.parent;		
		this.listenTo(this.model, "sync", this.render);
		// this.listenTo(this.model.comments(), "sync", this.render);
		this.listenTo(this.model.comments(), "add", this.addComment);
		
		var view = this;
		
		this.commentEl = "ul.comments[data-parent-comment-id=" + this.model.id + "]";
		
		this.model.comments().each(function(comment) {
			var commentShow = new App.Views.commentShow({
				model: comment,
				parent: view.parent
			});
			view.addSubview(view.commentEl, commentShow);	
		});
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
		return this;
	},
	
	addComment: function(comment) {
		//no comments on comments
		this.addSubview(this.commentEl, new App.Views.commentShow({
			model: comment,
			parent: this
		}));
	},
	
	deleteComment: function(event) {
		event.preventDefault();
		event.stopPropagation();
		this.model.destroy();
		this.parent.removeSubview(this.el, this);
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
			model: new App.Models.Comment({ post: this.model.get("post") }),
			parent: this
		});
		this.addSubview("div.replyForm", commentForm);
	}
})