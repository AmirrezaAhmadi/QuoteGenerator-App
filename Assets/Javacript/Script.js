async function generateQuote() {
    try {
        const response = await fetch('http://api.quotable.io/random');
        const data = await response.json();
        const quoteText = data.content;
        const authorText = `- ${data.author}`;
        
        document.getElementById("quote").textContent = quoteText;
        document.getElementById("author").textContent = authorText;

        const tweetLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText + " " + authorText)}`;
        document.getElementById("tweetBtn").href = tweetLink;
        document.getElementById("tweetBtn").setAttribute('target', '_blank');

        document.getElementById("copyBtn").disabled = false;
        document.getElementById("tweetBtn").classList.remove('disabled-link');
    } catch (error) {
        document.getElementById("quote").textContent = "Failed to fetch a new quote. Please try again.";
        document.getElementById("author").textContent = "";
        console.error("Error fetching quote:", error);
    }
}

function copyQuote() {
    const quoteText = document.getElementById("quote").textContent;
    const authorText = document.getElementById("author").textContent;
    const fullQuote = `${quoteText} ${authorText}`;

    navigator.clipboard.writeText(fullQuote).then(() => {
        alert("Quote copied to clipboard!");
    }).catch(err => {
        alert("Failed to copy the quote.");
        console.error("Error copying quote:", err);
    });
}