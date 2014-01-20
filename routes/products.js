var cheerio = require('cheerio'),
	request = require('request'),
	async = require('async'),
	_ = require('underscore');

exports.index = function(req, res){
	// testUrls = [
	// 	"http://www.lazada.com.my/tenko-t7x-7-dual-core-4gb-wifi-white-488489.html",
	// 	"http://www.lazada.com.my/samsung-galaxy-note-80-8-16gb-wifi3g-white-150998.html"
	// ]

	res.contentType('application/json');
	async.map([req.query.url1, req.query.url2], loadUrl, function(err, result){
		if (err) throw err;
		res.send(result);
	});
};

function trim(str){
	return str.replace(/^\s+|\s+$/g, '');
}

function loadUrl(url, cb){
	request(url, function(err, res, body){
		if(!err && res && res.statusCode == 200){
			cb(null, parseData(body));
		}else{
			cb("Server responded with " + res.statusCode + " status.");
		}
	});
}

function parseData(data){
	var $ = cheerio.load(data);
	var specs = {};
	$(".prd-attributes tr").each(function(index, elem){
		var name = trim($(this).find("th").text()),
			value = trim($(this).find("td").text());
		if(name && value){
			specs[name] = value;
		}
	});

	var result = {
		name: trim($("h1").text()),
		review_count: trim($("#review a").text()),
		price: trim($("#price_box").text()),
		price_special:  trim($("#special_price_box").text()),
		image: $(".productImage").data('image'),
		href: $('link[rel=canonical]').attr('href'),
		specs: specs
	};

	var rating = $("#rating .itm-ratRating").css('width');
	if(rating){
		result.rating = rating.replace(/\D*/g, '');
	}
	return result;
}