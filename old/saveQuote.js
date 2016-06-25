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

saveQuote = function() {
	var quote = window.getSelection().toString().trim();
	if (!quote) return;
	console.log('saveQuote', quote, "\n\n\n");
	var url = document.location.href.split('?')[0].split('#')[0];
	var title = document.title;
	ajax('https://api.max.pub/quotes?add=&url=' + url + '&quote=' + quote + '&title=' + title, function(txt) {
		console.log('save-status', txt);
	});
	return quote;
}

saveQuote();