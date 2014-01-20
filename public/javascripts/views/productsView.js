var app = app || {};

(function($){
	'use strict';

	app.ProductsView = Backbone.View.extend({
		tagName: 'table',
		template:
			"<thead>" +
				"<tr>" +
					"<th></th>" +
					"<td><img src='<%= image[0] %>' /><a class='name' href='<%= href[0] %>'><%= name[0] %></a></td>" +
					"<td><img src='<%= image[1] %>' /><a class='name' href='<%= href[0] %>'><%= name[1] %></a></td>" +
				"</tr>" +
			"</thead>" +
			"<tbody>" +
				"<tr>" +
					"<th>Price</th>" +
					"<td><span class='price'><%= price_special[0] %></span> (<del><%= price[0] %></del>)</td>" +
					"<td><span class='price'><%= price_special[1] %></span> (<del><%= price[1] %>)</del></td>" +
				"</tr>" +
				"<% if(typeof(specs) !== undefined){ %>" +
					"<% _.each(specs, function(spec){ %>" +
						"<tr>" +
							"<th><%= spec.name %></th>" +
							"<% _.each(spec.values, function(value){ %>" +
								"<td><%= value %></td>" +
							"<% }) %>" +
						"</tr>" +
					"<% }) %>" +
				"<% } %>" +
				"<tr>" +
					"<th>Reviews</th>" +
					"<td><%= review_count[0] %></td>" +
					"<td><%= review_count[1] %></td>" +
				"</tr>" +
			"</tbody>",

		initialize: function(){
			this.listenTo(this.collection, 'all', this.test);
			// this.listenTo(this.collection, 'request', this.startLoading);
			// this.listenTo(this.collection, 'sync', this.stopLoading);
			this.template = _.template(this.template);
		},

		startLoading: function(){

		},

		stopLoading: function(){

		},

		test: function(){
			console.log(arguments);
		},

		render: function(){
			console.log(this.collection.getCompared());
			this.$el
				.empty()
				.append(
					this.template(this.collection.getCompared())
				);
			return this;
		}
	});

})(jQuery);