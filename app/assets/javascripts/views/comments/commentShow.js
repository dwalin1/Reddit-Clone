App.Views.commentShow = Backbone.CompositeView.extend({
	template: JST["comments/commentShow"],
	
	formTemplate: JST["comments/commentForm"],
	
	form: false,
	
	tagName: "li",
			
	initialize: function(options) {
		this.parent = options.parent;
		this.showingReplyForm = false;	
		this.commentEl = "ul.comments[data-parent-comment-id='" + this.model.id + "']";
			
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model, "change", this.render);
		
		this.listenTo(this.model.comments(), "add", this.addComment);
					
		this.model.comments().each(this.addComment.bind(this));	
		
	},
	
	events: {
		"click button.deleteComment": "deleteComment",
		"click button.editComment": "editComment",
		"submit form.commentForm": "updateComment",
		"click button.replyForm": "showReplyForm",
		"click span.upvote": "voteClick",
		"click span.downvote": "voteClick"
	},
	
	render: function() {
		template = this.form ? this.formTemplate : this.template;
		var activeVote = (user_id) ? this.vote().get("vote_type") : false;
		
		var renderedContent = template({
			comment: this.model,
			activeVote: activeVote
		});
		this.$el.html(renderedContent);	
		this.attachSubviews();	
		return this;
	},
	
	addComment: function(comment) {
		this.addSubview(this.commentEl, new App.Views.commentShow({
			model: comment,
			parent: this
		}));
	},
	
	deleteComment: function(event) {
		event.preventDefault();
		event.stopPropagation();
		var that = this;
		this.model.destroy({
			success: function(model, response, options) {
				console.log("Comment deleted");
				that.parent.model.comments().remove(model);
				that.parent.removeSubview(that.parent.commentEl, that);
			},
			
			error: function(model, response, options) {
				that.$el.prepend(response.responseJSON.msg);
			}
		});
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
		formData.id = this.model.id;
		
		this.model.save(formData, {
			success: function(model, response, options) {
				console.log("Comment updated!");
			},

			error: function(model, response, options) {
				that.$el.prepend(response.responseJSON.msg);
			}
		});
	},
	
	showReplyForm: function(event) {
		event.preventDefault();
		event.stopPropagation();
		
		if (!user_id) {
			$('#login').modal();
			return;
		}
		
		if (this.showingReplyForm) return;
		this.showingReplyForm = true;
		var that = this;
		var commentForm = new App.Views.commentForm({
			model: new App.Models.Comment({post: that.model.get("post")}),
			parent: this
		});
		this.addSubview("ul.replyForm#reply-form-" + this.model.id, commentForm);
	}
})