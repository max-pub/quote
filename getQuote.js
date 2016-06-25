result = {
	url: document.location.href.split('?')[0].split('#')[0],
	title: document.title,
	quote: window.getSelection().toString().trim()
};