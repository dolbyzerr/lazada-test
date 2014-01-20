var app = app || {};

$(function(){
	'use strict';

	app.products = new app.Products();
	new app.AppView();
});