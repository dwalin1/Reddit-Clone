App.Views.postShow = Backbone.CompositeView.extend({
	template: JST["posts/postShow"],
	
	className: "container container-fluid",
	
	initialize: function() {
		var view = this;
		this.commentEl = "ul.post-comments";
		this.msgDiv = "div.top-level-comment-messages";
		this.listenToOnce(this.model, "sync", function() {
			this.addSubview("div.post-container", new App.Views.basePostShow({
				model: this.model,
				index: false
			}));	
		});
		
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
		this.addSubview(this.commentEl, new App.Views.commentShow({
			model: comment,
			parent: this
		}));
	},
	
	deletePost: function(event) {
		event.preventDefault();
		var sub_url = this.model.get("sub_url");
		this.model.destroy();
		App.router.navigate(sub_url, { trigger: true });
	},
	
	postComment: function(event) {
		event.preventDefault();
		event.stopPropagation();
		var target = $(event.target);
		var formData = target.serializeJSON();
		target.find("textarea").val("");
		formData.comment.post_id = this.model.get("id");
		var comment = new App.Models.Comment(formData);
		var that = this;
		comment.save({}, {
			success: function(model, response) {
				model.set({ post: that.model });
				model.set({ submitter: user })
				that.model.top_level_comments().add(model);
				$(that.msgDiv).html("Post created!");
				
			},
			
			error: function(model, response) {
				$(that.msgDiv).html(App.error_style(response.responseJSON));
			}
		})
	}
});