const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading 

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;

}
//show new quote 
function newQuote() {
    loading();
    //pick a raandom quote 
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    //check if author is blank and replace unknown 

    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    //check quote length to determine styling 

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // set quote and hide loader
    quoteText.textContent = quote.text;
    complete();

}
//Get Quotes from API 
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //catch error here 
    }
}
//tweet quote 
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');

}
//eventlistener 

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on load 
getQuotes();
