App.Views.subForm = Backbone.View.extend({
	template: JST["subs/subForm"],
	
	initialize: function() {
		this.formText = (this.model.isNew()) ? "Create Sub" : "Update Sub";
		this.listenTo(this.model, "sync", this.render);		
	},
	
	events: {
		"submit form#subForm": "saveSub"
	},
	
	render: function() {
		var renderedContent = this.template({
			sub: this.model,
			formText: this.formText
		});
		this.$el.html(renderedContent);
		return this;
	},
	
	saveSub: function(event) {
		event.preventDefault();
		var formData = $(event.target).serializeJSON();
		var that = this;
		this.model.save(formData, {
			success: function(model, response) {
				App.subs.add(model);
				App.router.navigate("#", { trigger: true });
				console.log("Success!");
			},
			error: function(model, response, thing3) {
				that.$el.html(response.responseJSON.msg);
			}
		})
	}
})