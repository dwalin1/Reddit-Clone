App.Views.basePostShow = Backbone.View.extend({
	template: JST["posts/basePostShow"],
	
	className: "row post", 
	
	initialize: function(options) {
		this.index = options.index;
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model, "change", this.render);
	},
	
	events: {
		"click span.upvote": "voteClick",
		"click span.downvote": "voteClick"
	},
	
	render: function() {
		var activeVote = (user_id) ? this.vote().get("vote_type") : false;
		
		var renderedContent = this.template({
			post: this.model,
			index: this.index,
			activeVote: activeVote,
			hasImg: this.hasImg()
		});
		this.$el.html(renderedContent);
		return this;
	},
	
	hasImg: function() {
		var url = this.model.get("url");
		if (url.slice(url.length-4) === ".jpg") {
			return true;
		} else {
			return false;
		}
	},
	
	vote: function() {
		if (!user_id) return false;
		var voteHash = this.model.get("votes")[0] || 
		{ voteable_id: this.model.id, voteable_type: "Post"};
		this._vote = this._vote || new App.Models.Vote(voteHash);
		return this._vote;
	},
	
	voteClick: function(event) {
		event.preventDefault();
		if (!user_id) {
			alert("You have to log in for that.");
			return;
		}
		var newVoteType = $(event.target).hasClass("upvote") ? "up" : "down";
		var oldVoteType = this.vote().get("vote_type");
		
		if (oldVoteType === newVoteType) {
			this.deleteVote(oldVoteType);
		} else {
			this.saveVote(newVoteType);
		}
	},
		
	saveVote: function(newVoteType) {
		var vote = this.vote();
		var post = this.model;
		var that = this;
		var inc = (newVoteType === "up") ? 1 : -1;
		var inc = (vote.isNew()) ? inc : (inc * 2);
		
		vote.save({ vote_type: newVoteType }, {
			success: function() {
				console.log("Success!");
				post.set({ upvotes: post.get("upvotes") + inc });
				// console.log(that._vote.get("vote_type"));
				// vote is a reference to this._vote, and save mutates; therefore, no need to change this._vote here, as the above console.log demonstrates
			},
			
			error: function(model, response) {
				console.log("Error saving vote.");
			}
		})
	},
	
	deleteVote: function(voteType) {
		var that = this;
		var post = this.model;
		var inc = (voteType === "up") ? -1 : 1;
		
		this.vote().destroy({
			success: function(model, response) {
				console.log("Vote destroyed.");
				// Here, by contrast, we must handle this.vote()  ourselves
				post.set({ votes: [] });
				that._vote = undefined;
				post.set({ upvotes: post.get("upvotes") + inc });
			},
			
			error: function(model, response) {
				console.log("Error destroying vote.");
			}
		});
	}
});