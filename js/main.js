const api_key = "live_sZRoFjNrqdQ8ML6ZM9sKbXbU4EkFLv4jdWlomJbgqtMDyYuGqcyJQJbJP1PmNZX0"
let breedsArray = []
let selectedBreedId

function getCat() {
  const url = `https://api.thecatapi.com/v1/breeds/`
  
  fetch(url, {
    headers: {
      'x-api-key': api_key
    }
  })
  .then(res => res.json()) 
  .then(info => {
    info.forEach(breed => {
      breedsArray.push([breed.name, breed.id])
    })

    // Populate breed options into HTML datalist after fetching data
    breedsArray.forEach(breed => {
      const option = document.createElement('option')
      option.value = breed[0]
      option.id = breed[1]
      breedList.appendChild(option)
    })
  })
  .catch(err => {
    console.log(`error ${err}`)
  })
}

getCat()

const breedInput = document.getElementById('breedInput')
const breedList = document.getElementById('breedList')
const catImageContainer = document.getElementById('catImageContainer')
const buttonContainer = document.getElementById('buttonContainer')
const imageAndButtonContainer = document.getElementById('imageAndButtonContainer')

// Add event listener to each option in the datalist so we know which breed was selected and its breed ID from the API
breedInput.addEventListener('input', function(event) {
  const inputValue = event.target.value

  // Find the corresponding ID for the selected breed name
  const selectedBreed = breedsArray.find(breed => breed[0] === inputValue)
  if (selectedBreed) {
    selectedBreedId = selectedBreed[1] 
    //put in session storage so we can use in main2.js for newpage.html
    sessionStorage.setItem('selectedBreedId', selectedBreedId)

    // Make another fetch request using selectedBreedId to get just that breed's info so we can use its picture
    fetch(`https://api.thecatapi.com/v1/breeds/${selectedBreedId}`, {
      headers: {
        'x-api-key': api_key
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.reference_image_id) {
        const imageUrl = `https://cdn2.thecatapi.com/images/${data.reference_image_id}.jpg`

        const img = document.createElement('img')
        img.src = imageUrl
        img.alt = data.name
        img.classList.add("imageDimensions")

        catImageContainer.innerHTML = ''
        catImageContainer.appendChild(img)

        //Add styles to HTML as we dynamically insert it
        imageAndButtonContainer.classList.add("container")
        imageAndButtonContainer.classList.add("border")

        const button = document.createElement('button')
        button.textContent = 'Click for more information'
        button.addEventListener('click', function() {
          // Navigate to a new page with more information about the breed
          window.location.href = `newpage.html`
        })
        buttonContainer.appendChild(button)
      } else {
        catImageContainer.innerHTML = 'No image available for this cat.'
      }
    })
    .catch(err => {
      console.log(`Error fetching breed details: ${err}`)
    })
  }
})
