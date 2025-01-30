const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
// Normally, don't store API Keys like this, but an exception made here because it is free, and the data is publicly available!
// const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
const apiKey = 'ctMG8haf-qRPxQBBq7TUoMjFlSsyVm8D_PWD0iPA718'
// const apiKey = 'dtkyZAV5zRvH10hIQ0tZ89CEuQeXWfFaQpLXEkEUYko';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// updates the count of photos to return after the initial load
function updateCountApiUrl() {
  count = 30;
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  // console.log(count);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    // count = 30  // found that this does nothing to apiURL variable; fetch still uses the value stored in apiUrl, which is 5
    updateCountApiUrl();  // instead use this function that updates the count and apiUrl
  }
}

// Helper function to Set Attributes on DOM Elements
function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links & Photos
function displayPhotos() {
  imagesLoaded = 0;   // must reset to 0 everytime this function is called
  totalImages = photosArray.length;
  
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link unsplash
    const item = document.createElement('a');
    setAttribute(item, {
      href: photo.links.html,
      target: '_blanks',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // EventListener, check when each is finished loading
    img.addEventListener('load', imageLoaded)

    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item); 
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(count);
    displayPhotos();
  } catch (error) {
    // Catch errors here
    console.log(error)
  }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});


// On load
getPhotos();
