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
            const filteredCards = cardData.filter(card => card.name.toLowerCase().includes(query));

            // Display the filtered cards
            filteredCards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.textContent = card.name;
                cardElement.className = 'clickable-card'; // Added a class for styling if needed
                
                // Add click event to show image
                cardElement.addEventListener('click', function() {
                    // Assume you have a designated div with id 'imageDisplay'
                    const imageDisplay = document.getElementById('imageDisplay');
                    // Take the first image URL from the 'printings' array
                    const imageUrl = card.printings[0].image_url;
                    // Update the imageDisplay div to show the image
                    imageDisplay.innerHTML = `<img src="${imageUrl}" alt="${card.name}" />`;
                });

                cardContainer.appendChild(cardElement);
            });
        });

    } catch (error) {
        console.error('Error fetching or displaying data:', error);
    }
}

// Initialize the function
fetchAndDisplayCards();
