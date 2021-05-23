let currentPage = 1
let isLoading = true

window.onload = fetchImages()

window.addEventListener('scroll', () => {
	const {
		scrollTop,
		scrollHeight,
		clientHeight
	} = document.documentElement

	if (scrollTop + clientHeight >= scrollHeight - 5 &&
	!isLoading) {
		currentPage++
		fetchImages()
	}
})

function fetchImages() {
	isLoading = true
	displayLoader(isLoading)
	fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&in_gallery=true&api_key=97a2010d6449784728e75b5b59424c57&tags=clouds&sort=interestingness-desc&per_page=10&page=${currentPage}&format=json&nojsoncallback=1`)
		.then(response => response.json())
		.then (data => printImages(data.photos.photo))
		.then(() => {
			isLoading = false
			displayLoader(isLoading)
		})
		.catch(error => {
			isLoading = false
			displayLoader(isLoading)
			handleErrors()
			console.log(error)
		})
}

function printImages(data) {
	data.map((image) => {
		const imageUrl = `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_w.jpg`
		const imageElement = `<div class="single-image-container"><img src="${imageUrl}" alt="${image.tite}" /></div>`
		document.querySelector('#all-images-container').insertAdjacentHTML('beforeend', imageElement)
	})
}

function displayLoader(isLoading) {
	console.log(isLoading)
	if (isLoading === true) {
		document.querySelector('#all-images-container').insertAdjacentHTML('beforeend', '<div id="loader"></div> <p id="loading-text">Loading images...</p>')
	} else if (isLoading === false) {
		document.querySelector('#loader').remove()
		document.querySelector('#loading-text').remove()
	}
}

function handleErrors() {
	document.querySelector('#all-images-container').innerHTML = '<div id="error-message">Sorry, could not load images.</div>'
}