window.onload = fetchImages()

function fetchImages() {
	displayLoader(true)
	fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=97a2010d6449784728e75b5b59424c57&tags=nature&format=json&nojsoncallback=1')
		.then(response => response.json())
		.then (data => printImages(data.photos.photo))
		.then(() => displayLoader(false))
		.catch(error => {
			displayLoader(false)
			handleErrors()
			console.log(error)
		})
}

function printImages(data) {
	data.map((image) => {
		const imageUrl = `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
		document.querySelector('#image-container').insertAdjacentHTML('afterbegin', `<img src="${imageUrl}" alt="${image.title}" width="500" height="600">`)
	})
}

function displayLoader(isLoading) {
	console.log(isLoading)
	if (isLoading === true) {
		document.querySelector('#image-container').innerHTML = '<div id="loader"></div> <p id="loading-text">Loading images...</p>'
	} else if (isLoading === false) {
		document.querySelector('#loader').remove()
	}
}

function handleErrors() {
	document.querySelector('#image-container').innerHTML = '<div id="error-message">Sorry, could not load images.</div>'
}