App.Views.basePostShow = Backbone.View.extend({
	template: JST["posts/basePostShow"],
	
	initialize: function(options) {
		this.index = options.index;
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model, "change", this.render);
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
	
	vote: function(voteType) {
		if (this.voted === voteType) {
			// destroy the vote
		} else if (this.voted) {
			// update the vote to the new voteType
		} 
		
		var vote = new App.Models.Vote({
			voteable_id: this.model.id,
			voteable_type: "Post",
			vote_type: voteType	
		});
		
		var that = this;
		post = this.model;
		var inc = (voteType === "up") ? 1 : -1;
		
		vote.save({}, {
			success: function() {
				console.log("Vote successfully saved.");
				post.set({ upvotes: post.get("upvotes") + inc });
				that.voted = voteType;
			},
			
			error: function(model, response) {
				console.log("Error saving vote.");
			}
		})
	},
	
	upvote: function() {
		this.vote("up");
	},
	
	downvote: function() {
		this.vote("down");
	}
});