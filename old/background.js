chrome.browserAction.onClicked.addListener(function(tab) {
	// will only fire WITHOUT popup.html
	console.log('saving Quote in ');

	// console.log('saving Quote in ' + tab.url);
	// chrome.tabs.executeScript(tab.id, {
	// 	file: 'saveQuote.js'
	// }, function(result) {
	// 	console.log('result quote', result);
	// });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log('background: on-message', request, sender);
	// console.log(sender.tab ?
	// 	"from a content script:" + sender.tab.url :
	// 	"from the extension");
	// if (request.greeting == "hello")
	// sendResponse({
	// 	quote: "goodbye"
	// });
});

console.log('hi, starting now...');