function fetchImages() {
	fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=97a2010d6449784728e75b5b59424c57&tags=nature&format=json&nojsoncallback=1')
		.then(response => response.json())
		.then (data => printImages(data.photos.photo))
		.catch(error => {
			console.log(error)
		})
}

function printImages() {
	document.querySelector('#image-container').insertAdjacentHTML('afterbegin', '<h1>Hello World</h1>')
}


fetchImages()