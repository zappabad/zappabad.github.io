let lastChosenImageUrl = null;

async function fetchAndDisplayCards() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/the-fab-cube/flesh-and-blood-cards/bbfcbc0ddb37bd588574bebd842d41dc8bde08d8/json/english/card.json');
        const cardData = await response.json();
        const searchBox = document.getElementById('searchBox');

        searchBox.addEventListener('input', function() {
            const cardContainer = document.getElementById('cardContainer');
            cardContainer.innerHTML = '';

            const query = searchBox.value.toLowerCase();
            const filteredCards = cardData.filter(card => card.name.toLowerCase().includes(query));

            filteredCards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.textContent = card.name;
                cardElement.className = 'clickable-card';

                cardElement.addEventListener('click', function() {
                    const currentImageDisplay = document.getElementById('currentImage');
                    const lastChosenImageDisplay = document.getElementById('lastChosenImage');
                    
                    // Update the 'last chosen' image to the last 'current' image
                    if (lastChosenImageUrl) {
                        lastChosenImageDisplay.innerHTML = `<img src="${lastChosenImageUrl}" alt="Last Chosen" />`;
                    }
                    
                    // Update the 'current' image
                    const imageUrl = card.printings[0].image_url;
                    currentImageDisplay.innerHTML = `<img src="${imageUrl}" alt="${card.name}" />`;
                    
                    // Store the current image URL for next time
                    lastChosenImageUrl = imageUrl;
                });

                cardContainer.appendChild(cardElement);
            });
        });

    } catch (error) {
        console.error('Error fetching or displaying data:', error);
    }
}

fetchAndDisplayCards();
