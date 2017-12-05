if (!document.querySelector('#send-yt-notifications')) {
	var div = document.createElement('div');
	div.setAttribute('id', 'send-yt-notifications');
	document.body.appendChild(div);
}

showNotification = (ID, text) => {
	text = decodeURI(text);
	console.log('showNotification', ID, text);
	var FRAME = document.querySelector('#send-yt-notifications');
	var div = document.createElement('div');
	div.setAttribute('id', 'snip_' + ID);
	div.innerHTML = text;
	FRAME.insertBefore(div, FRAME.firstChild);
}

hideNotification = (ID, status) => {
	console.log('hideNotification', ID, status);
	var node = document.querySelector('#snip_' + ID);
	console.log('noti-node', node);
	if (status == 'success') node.style.background = '#afa';
	if (status == 'failure') node.style.background = '#faa';
	setTimeout(() => {
		node.parentNode.removeChild(node);
	}, 3000);
}



// setTimeout(() => {
// 	FRAME.removeChild(div);
// }, 3000);