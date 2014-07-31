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
		var smallUrl = url;
		if ((url.slice(9, 14) === "imgur") || (url.slice(7, 12) === "imgur")) {
			if (url.slice(url.length-4) === ".jpg") {
				smallUrl = url.slice(0, url.length-4);
			} 
			if (!(url.slice(8, 9) === "i.")) {
				smallUrl = smallUrl.slice(0, 7) + "i." + smallUrl.slice(7);
			}
			smallUrl = smallUrl + "m.jpg";
			return smallUrl;
		} else {
			return false;
		}
	}
});