// Retrieve selectedBreedId from session storage
const selectedBreedId = sessionStorage.getItem('selectedBreedId');
const api_key = "live_sZRoFjNrqdQ8ML6ZM9sKbXbU4EkFLv4jdWlomJbgqtMDyYuGqcyJQJbJP1PmNZX0"

// Make another fetch request using selectedBreedId to get just that breed's info
fetch(`https://api.thecatapi.com/v1/breeds/${selectedBreedId}`, {
    headers: {
        'x-api-key': api_key
    }
})
.then(res => res.json())
.then(info => {
    const imageUrl = `https://cdn2.thecatapi.com/images/${info.reference_image_id}.jpg`
    const img = document.getElementById('catImage')
    img.src = imageUrl
    img.alt = info.name
    img.classList.add("imageDimensions2")
    
    const breedName = document.getElementById('breedName')
    const origin = document.getElementById('origin')
    const description = document.getElementById('description')
    const temperament = document.getElementById('temperament')

    breedName.innerText = info.name
    origin.innerText = info.origin
    description.innerText = `Description: ${info.description}`
    temperament.innerText = `Temperament: ${info.temperament}`
})
.catch(err => {
    console.log(`Error fetching breed details: ${err}`)
})


