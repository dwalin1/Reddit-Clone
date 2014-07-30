App.Views.postForm = Backbone.View.extend({
	template: JST["posts/postForm"],
	
	initialize: function() {
		this.formText = (this.model.isNew()) ? "Create Post" : "Update Post";
		this.listenTo(this.model, "sync", this.render);		
	},
	
	events: {
		"submit form#postForm": "savePost"
	},
	
	render: function() {
		var renderedContent = this.template({
			post: this.model,
			formText: this.formText
		});
		this.$el.html(renderedContent);
		return this;
	},
	
	savePost: function(event) {
		event.preventDefault();
		var formData = $(event.target).serializeJSON();
		var that = this;
		this.model.save(formData, {
			success: function(model, response) {
				App.router.navigate("#posts/" + model.get("id"), { trigger: true });
				console.log("Success!");
			},
			error: function(model, response, thing3) {
				that.$el.prepend(response.responseJSON.msg);
			}
		})
	}
})