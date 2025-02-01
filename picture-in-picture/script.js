// const videoElement = document.getElementById('video');
const videoElement = document.querySelector('#video');
// const button = document.getElementById('button');
const button = document.querySelector('#button');

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    }
  } catch (error) {
    // Catch errors here
    console.log("whoops, something went wrong:", error)
  }
}

button.addEventListener('click', async () => {
  // Desable Button
  button.disabled = true;
  // Start picture in picture
  await videoElement.requestPictureInPicture();
  // Reset Button
  button.disabled = false;
})
// On Load
selectMediaStream();
