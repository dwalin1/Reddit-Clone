App.Views.subsIndex = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, "sync", this.render);
	},
	
	template: JST["subs/subsIndex"],
	
	render: function() {
		var renderedContent = this.template({
			subs: this.collection
		});
		this.$el.html(renderedContent);
		return this;
	}
})