ajax = function(url, callback) { // simple AJAX implementation
	var req = new XMLHttpRequest();
	if (!req) return;
	req.open('GET', url, true);
	// req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.onreadystatechange = function() {
		if (req.readyState == 4)
			if (callback) callback(req.responseText);
	};
	req.onerror = function() {}; /// replace by ADD-EVENT-HANDLER
	// console.log('ajax', url, data);
	req.send();
}

timeout = null;
killMessage = function() {
	clearTimeout(timeout);
	var oldbox = document.getElementById('mark-msg');
	if (oldbox) oldbox.parentNode.removeChild(oldbox);
}
showMessage = function(quote) {
	killMessage();
	var box = document.createElement('div');
	box.setAttribute('id', 'mark-msg');
	box.innerHTML = quote;
	document.getElementsByTagName('body')[0].appendChild(box);
	// var box = "<div id='mark-msg'>" + quote + "</div>";
	// document.getElementsByTagName('body')[0].innerHTML += box;
	timeout = setTimeout(killMessage, 1000);
}

saveQuote = function(quote) {
	if (!quote.trim()) return;
	console.log('saveQuote', quote, "\n\n\n");
	var url = document.location.href.split('?')[0];
	var title = document.title;
	ajax('https://api.max.pub/quotes?add=&url=' + url + '&quote=' + quote + '&title=' + title, function(txt) {
		// var data = {
		// 	url: url,
		// 	quote: quote,
		// 	title: title
		// };
		// data = 'url=' + url + '&quote=' + quote + '&title=' + title;
		// ajax('https://api.max.pub/quotes?add=', data, function(txt) {
		console.log('save-status', txt);
		if (NODE) NODE.setAttribute('mark-pink-saved', true);
		showMessage(quote);
	});
}

save = function(event) {
	console.log('save', event.target);
	var tag = event.target.tagName;
	var paragraph = (tag === 'P') ? event.target.textContent : '';
	var selection = window.getSelection().toString().trim();
	NODE = selection ? null : event.target;
	saveQuote(selection ? selection : paragraph);
}

// saveParagraph = function(event) {
// 	// console.log('saveParagraph', event.target, event.target.textContent);
// 	if (event.target.tagName !== 'P') return;
// 	var quote = event.target.textContent;
// 	saveQuote(quote);
// }
// saveSelection = function() {
// 	var quote = window.getSelection().toString();
// 	// console.log('selection:::', window.getSelection().toString());
// 	saveQuote(quote);
// }

showMark = function(event) {
	if (event.target.nodeName !== 'P') return;
	// console.log('showMark',event.target.nodeName,event.target);
	event.target.setAttribute('mark-pink-hover', true);
}
hideMark = function(event) {
	// console.log('hideMark',event.target);
	event.target.removeAttribute('mark-pink-hover');
}

window.addEventListener('mouseup', save);
// window.addEventListener('mouseup', saveSelection);
// window.addEventListener('mouseup', saveParagraph);
document.addEventListener('mouseover', showMark);
document.addEventListener('mouseout', hideMark);