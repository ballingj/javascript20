const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash
const count = 10;
// Normally, don't store API Keys like this, but an exception made here because it is free, and the data is publicly available!
// const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
// const apiKey = 'ctMG8haf-qRPxQBBq7TUoMjFlSsyVm8D_PWD0iPA718'
const apiKey = 'dtkyZAV5zRvH10hIQ0tZ89CEuQeXWfFaQpLXEkEUYko';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Helper function to Set Attributes on DOM Elements
function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}


// Create Elements for Links & Photos
function displayPhotos() {
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link unsplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    setAttribute(item, {
      href: photo.links.html,
      target: '_blanks',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('title', photo.alt_description);
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

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
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    // Catch errors here
    console.log(error)
  }
}


// On load
getPhotos();
