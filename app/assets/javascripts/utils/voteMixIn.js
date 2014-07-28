window.voteMixIn = {
	vote: function() {
		if (!user_id) return false;
		var modelClass = (this.model instanceof App.Models.Post) ? "Post" : "Comment";
		var voteHash = this.model.get("votes")[0] || 
		{ voteable_id: this.model.id, voteable_type: modelClass};
		this._vote = this._vote || new App.Models.Vote(voteHash);
		return this._vote;
	},
	
	voteClick: function(event) {
		event.preventDefault();
		event.stopPropagation();
		
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
		var that = this;
		var inc = (newVoteType === "up") ? 1 : -1;
		var inc = (vote.isNew()) ? inc : (inc * 2);
		
		vote.save({ vote_type: newVoteType }, {
			success: function() {
				console.log("Success!");
				that.model.set({ upvotes: that.model.get("upvotes") + inc });
			},
			
			error: function(model, response) {
				console.log("Error saving vote.");
			}
		})
	},
	
	deleteVote: function(voteType) {
		var that = this;
		var inc = (voteType === "up") ? -1 : 1;
		
		this.vote().destroy({
			success: function(model, response) {
				console.log("Vote destroyed.");
				that.model.set({ votes: [] });
				that._vote = undefined;
				that.model.set({ upvotes: that.model.get("upvotes") + inc });
			},
			
			error: function(model, response) {
				console.log("Error destroying vote.");
			}
		});
	}
};