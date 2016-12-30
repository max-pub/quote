if (!document.querySelector('#send-yt-notifications')) {
	var div = document.createElement('div');
	div.setAttribute('id', 'send-yt-notifications');
	document.body.appendChild(div);
}
showNotification = (text) => {
	var FRAME = document.querySelector('#send-yt-notifications');
	var div = document.createElement('div');
	div.innerHTML = text;
	FRAME.insertBefore(div, FRAME.firstChild);
	setTimeout(() => {
		FRAME.removeChild(div);
	}, 3000);
}