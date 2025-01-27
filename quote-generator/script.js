const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new Quote
function newQuote() {
  loading();
  randomIndex = Math.floor(Math.random() * apiQuotes.length)
  const quote = apiQuotes[randomIndex];
  console.log(quote);
  quote.author ? authorText.textContent = quote.author : authorText.textContent = 'Anonymous';
  // big or small based on length
  quote.text.length > 120 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote')
  // Set Quote & Hide loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes from API
async function getQuotes() {
  loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch errors here
    console.log("whoops, no quote", error)
  }
}


// Tweet a Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On load
getQuotes();

/*
// local file quotes.json - in case api is down
let localQuotes = [];
async function getLocalQuotes() {
  const localUrl = './quotes.json';
  try {
    const response = await fetch(localUrl);
    localQuotes = await response.json();
    console.log(localQuotes)
  } catch (error) {
    // Catch errors here
  }
}

getLocalQuotes();
*/