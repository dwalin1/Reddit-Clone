App.Views.commentShow = Backbone.CompositeView.extend({
	template: JST["comments/commentShow"],
	
	formTemplate: JST["comments/commentForm"],
	
	form: false,
	
	tagName: "li",
	
	initialize: function(options) {
		this.parent = options.parent;	
			
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.comments(), "add", this.addComment);
			
		this.commentEl = "ul.comments[data-parent-comment-id='" + this.model.id + "']";
		console.log(this.commentEl);
		
		this.model.comments().each(this.addComment.bind(this));	
		
		this.events[this.eventKeys("deleteComment")] = "deleteComment";
		this.events[this.eventKeys("editComment")] = "editComment";
		this.events[this.eventKeys("replyForm")] = "showReplyForm";
		
	},
	
	events: {
		// this.eventKeys(): "deleteComment",
		// "click button.editComment": "editComment",
		"submit form.commentForm": "updateComment"
		// "click button.replyForm": "showReplyForm"
	},
	
	eventKeys: function(btnClass) {
		return "click button." + btnClass + "[data-comment-id='" + this.model.id + "']";
	},
	
	render: function() {
		template = this.form ? this.formTemplate : this.template;
		var renderedContent = template({
			comment: this.model,
		});
		this.$el.html(renderedContent);	
		this.attachSubviews();	
		return this;
	},
	
	addComment: function(comment) {
		// comment.set({ post: this.model.get("post") });
		console.log(comment);
		this.addSubview(this.commentEl, new App.Views.commentShow({
			model: comment,
			parent: this
		}));
	},
	
	deleteComment: function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		this.model.destroy();
		this.parent.removeSubview(this.el, this);
	},
	
	editComment: function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		this.form = true;
		this.render();
	},
	
	updateComment: function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
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
		console.log(this.model.id);
		var that = this;
		var commentForm = new App.Views.commentForm({
			//just for form, probably makes no sense to add ref to post here
			model: new App.Models.Comment({post: that.model.get("post")}),
			parent: this
		});
		this.addSubview(this.$el.children("div.replyForm"), commentForm);
	}
})