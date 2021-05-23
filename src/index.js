function fetchImages() {
	fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=97a2010d6449784728e75b5b59424c57&tags=nature&format=json&nojsoncallback=1')
		.then(response => response.json())
		.then (data => printImages(data.photos.photo))
		.catch(error => {
			console.log(error)
		})
}

function printImages(data) {
	data.map((image) => {
		const imageUrl = 'https://live.staticflickr.com/'+image.server+'/'+image.id+'_'+image.secret+'.jpg'
		document.querySelector('#image-container').insertAdjacentHTML('afterbegin', `<img src="${imageUrl}" alt="Girl in a jacket" width="500" height="600">`)
	})
}


fetchImages()