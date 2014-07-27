App.Views.basePostShow = Backbone.View.extend({
	template: JST["posts/basePostShow"],
	
	initialize: function(options) {
		this.index = options.index;
		this.listenTo(this.model, "sync", this.render);
	},
	
	events: {
		"click a.upvote": "upvote",
		"click a.downvote": "downvote"
	},
	
	render: function() {
		var renderedContent = this.template({
			post: this.model,
			index: this.index
		});
		this.$el.html(renderedContent);
		return this;
	},
	
	// actually will need a join table for upvotes to get them to persist and not have a user able to leave the Backbone session and then vote again; also this way will avoid the problem with permissions to update the model
	
	vote: function(n) {
		if (this.voteState === n) return;
		this.voteState = n;
		this.model.set({upvotes: this.model.get("upvotes") + n});
		this.model.save({}, {
			success: function() {
				console.log("Model successfully saved.");
			},
			
			error: function() {
				console.log("Error saving model.");
			}
		})
	},
	
	upvote: function() {
		this.vote(1);
	},
	
	downvote: function() {
		this.vote(-1);
	}
});