contextClick = (info, tab) => {
	console.log('CONTEXT MENU', info, tab);
	var save = {
		url: tab.url,
		title: tab.title,
		snippet: info.selectionText
	}
	saveSnippet(save, tab);
}


chrome.runtime.onInstalled.addListener(() => { // add context menu
	chrome.contextMenus.create({
		"title": 'snip this',
		"contexts": ['selection'],
		"onclick": contextClick
	});
	// chrome.contextMenus.onClicked.addListener((info, tab) => {
	// 	// console.log('clicked', info, tab);
	// });
});



chrome.browserAction.onClicked.addListener(function(tab) { // add browser action
	console.log("BROWSER ACTION");
	chrome.tabs.executeScript(tab.id, {
		file: 'browser-action.js'
	}, (result) => {
		saveSnippet(result[0], tab);
	});
});


saveSnippet = (item, tab) => {
	console.log('save this:', item);
	if (!item.snippet) return;
	// var url = url.split('?')[0].split('#')[0];
	// document.getElementById('status').innerHTML = 'saving...';
	fetch(`https://api.max.pub/snippets?do=add&url=${item.url}&title=${item.title}&snippet=${item.snippet}`)
		.then((res) => res.text()).then((text) => {
			console.log('save-STATUS::', text);
			// document.getElementById('status').innerHTML = 'saving...' + text;
		});
	showPageNotification(tab, item);
}

showPageNotification = (tab, item) => {
	chrome.tabs.insertCSS(tab.id, {
		file: 'page-notification.css'
	});
	chrome.tabs.executeScript(tab.id, {
		file: 'page-notification.js'
	}, (result) => {
		chrome.tabs.executeScript(tab.id, {
			code: `showNotification('${item.snippet}');`
		});
	});
}


showBrowserNotification = () => {
	// console.log('click action', Notification.permission);
	if (Notification.permission !== "granted")
		Notification.requestPermission();
	new Notification('Notification title', {
		icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
		body: "Hey there! You've been notified!",
	});
}