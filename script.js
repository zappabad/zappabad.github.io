// Function to fetch and display card data
async function fetchAndDisplayCards() {
    try {
        // Fetch the card data from the JSON file
        const response = await fetch('/data/card.json');
        const cardData = await response.json();

        // Get the search box element
        const searchBox = document.getElementById('searchBox');

        // Listen for user input to filter cards
        searchBox.addEventListener('input', function() {
            // Clear the card container
            const cardContainer = document.getElementById('cardContainer');
            cardContainer.innerHTML = '';

            // Filter cards based on user input
            const query = searchBox.value.toLowerCase();
            const filteredCards = cardData.filter(card => card.card_name.toLowerCase().includes(query));

            // Display the filtered cards
            filteredCards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.textContent = card.card_name;
                cardContainer.appendChild(cardElement);
            });
        });

    } catch (error) {
        console.error('Error fetching or displaying data:', error);
    }
}

// Initialize the function
fetchAndDisplayCards();
