App.Collections.Posts = Backbone.Collection.extend({
	url: "api/posts",
	
	model: App.Models.Post,
	
	//may not want a getOrFetch here, because we may not want to 		maintain a collection of all posts (that would be a shit ton)
})