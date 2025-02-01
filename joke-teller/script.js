const button = document.querySelector('#button');
const audioElement = document.querySelector('#audio');
const jokeText = document.querySelector('#joke')


// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// VoiceRSS Speech Function
function tellMe(joke) {
  const jokeString = joke.trim().replace(/ /g, '%20');
  // VoiceRSS Speech Parameters
  VoiceRSS.speech({
    // Normally, don't write out API Keys like this, but an exception made here because it's free.
    key: 'e985f868e96c46d9b0789c3855350152',
    src: jokeString,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get jokes from Joke API
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://v2.jokeapi.dev/joke/any?blacklistFlags=racist';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Assign One or Two Part Joke
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
      // console.log(joke)
    } else {
      joke = data.joke;
      // console.log(joke)
    }
    // Display the Joke
    jokeText.textContent = joke;
    // Passing Joke to VoiceRSS API
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    // Catch Error Here
  }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);


/*
e985f868e96c46d9b0789c3855350152
b8affd83ddad4ed3b9ffee16881573bf
fab0e4a1283f4fc986876be0fa2b1d14
59f934a09d4447efbfda1a545ca794ac
8f1cec450b9e449dac4315502c2bedd2
c7215ab6224340e4ad49e70b8c7bec8b
*/ 