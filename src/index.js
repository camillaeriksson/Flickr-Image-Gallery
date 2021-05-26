let currentPage = 1
let isLoading = true

// Fetching images from API when all elements are loaded in the dom
window.onload = fetchImages()

// Endless scroll that fetches a new set of images
// only if isLoading is false
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

// Fetching images from API and printing them to the dom
function fetchImages() {
	isLoading = true
	displayLoader(isLoading)
	fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&in_gallery=true&api_key=97a2010d6449784728e75b5b59424c57&tags=clouds&extras=owner_name%2C+views&sort=interestingness-desc&per_page=18&page=${currentPage}&format=json&nojsoncallback=1`)
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

// Printing out the fetched images to the dom
function printImages(data) {
	data.map((image) => {
		let imageTitle = ''
		if (image.title) {
			imageTitle = image.title.split(' ').splice(0,3).join(' ')
		} else {
			imageTitle = 'Untitled'
		}
		const imageUrl = `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_w.jpg`
		const imageElement = 
		`<div class="single-image-container">
			<img src="${imageUrl}" alt="${image.tite}" />
			<div class="image-info-overlay">
				<h4>${imageTitle}</h4>
				<p>${image.ownername}</p>
			</div>
		</div>`
		document.querySelector('#all-images-container').insertAdjacentHTML('beforeend', imageElement)
	})
}

// Printing out a loader to the dom if isLoading is true
// and removing it if isLoading is false
function displayLoader(isLoading) {
	if (isLoading === true) {
		document.querySelector('#all-images-container').insertAdjacentHTML('beforeend', '<div id="loader"></div> <p id="loading-text">Loading images...</p>')
	} else if (isLoading === false) {
		document.querySelector('#loader').remove()
		document.querySelector('#loading-text').remove()
	}
}

// Printing error message to the dom if fetch from API failed
function handleErrors() {
	document.querySelector('#all-images-container').innerHTML = '<div id="error-message">Sorry, could not load images.</div>'
}

// Set of test functions for Jest
const functions = {
	sum: (a, b) => {
		return a + b
	},
	subtract: (a, b) => {
		return a - b
	},
	copyArray: (a) => {
		return [... a]
	}
}

module.exports = functions