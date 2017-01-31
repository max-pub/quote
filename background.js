contextClick = (info, tab) => {
	console.log('CONTEXT MENU', info, tab);
	var save = {
		url: tab.url.split('#')[0],
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

notID = 0;
saveSnippet = (item, tab) => {
	console.log('save this:', item);
	if (!item.snippet) return;
	// var url = url.split('?')[0].split('#')[0];
	// document.getElementById('status').innerHTML = 'saving...';
	showPageNotification(tab, ++notID, item);
	fetch(`https://api.max.pub/snippets?do=add&url=${item.url}&title=${item.title}&snippet=${item.snippet}`)
		.then((res) => res.text()).then((status) => {
			console.log('save-STATUS::', status);
			hidePageNotification(tab, notID, status);
		});
}

showPageNotification = (tab, ID, item) => {
	console.log('showPageNotification', tab, ID, item);
	var snippet = item.snippet.replace(/'/g, "\'");
	chrome.tabs.insertCSS(tab.id, {
		file: 'page-notification.css'
	});
	chrome.tabs.executeScript(tab.id, {
		file: 'page-notification.js'
	}, (result) => {
		chrome.tabs.executeScript(tab.id, {
			code: `showNotification(${ID}, '${snippet}');`
		});
	});
}
hidePageNotification = (tab, ID, status) => {
	console.log('hidePageNotification', tab, ID, status);
	chrome.tabs.executeScript(tab.id, {
		code: `hideNotification(${ID}, '${status}');`
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