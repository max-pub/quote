console.log('saving Quote in ');

// console.log('saving Quote in ' + tab.url);
chrome.tabs.executeScript({
	file: 'getQuote.js'
}, function(result) {
	var quote = result[0];
	// console.log('result quote', result[0]);
	// document.write('saving ' + result[0] + ' ...');
	document.getElementById('quote').innerHTML = quote.quote;
	saveQuote(quote.url, quote.title, quote.quote);
});



ajax = function(url, callback) { // simple AJAX implementation
	var req = new XMLHttpRequest();
	if (!req) return;
	req.open('GET', url, true);
	req.onreadystatechange = function() {
		if (req.readyState == 4)
			if (callback) callback(req.responseText);
	};
	req.send();
}

saveQuote = function(url, title, quote) {
	if (!quote) return;
	console.log('saveQuote', quote, "\n\n\n");
	var url = url.split('?')[0].split('#')[0];
	document.getElementById('status').innerHTML = 'saving...';
	ajax('https://api.max.pub/quotes?add=&url=' + url + '&quote=' + quote + '&title=' + title, function(txt) {
		console.log('save-status:', txt, '!');
		document.getElementById('status').innerHTML = 'saving...' + txt;
	});
}

// saveQuote();

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
// 	console.log('popup on-message', request, sender);
// 	// console.log(sender.tab ?
// 	// 	"from a content script:" + sender.tab.url :
// 	// 	"from the extension");
// 	// if (request.greeting == "hello")
// 	sendResponse({
// 		quote: "goodbye"
// 	});
// });



// chrome.runtime.sendMessage({
// 	list: 'quotes'
// }, function(response) {
// 	document.write('hello ' + response.quote);
// 	// console.log(response.farewell);
// });