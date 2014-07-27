App.Collections.Votes = Backbone.Collection.extend({
	url: "api/votes",
	model: App.Collections.Vote
})