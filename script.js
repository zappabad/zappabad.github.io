let lastChosenImageUrl = null;

async function fetchAndDisplayCards() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/username/repository/branch/path/to/card.json');
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

                cardElement.addEventListener('click', async function() {
                    const currentImageDisplay = document.getElementById('currentImage');
                    const lastChosenImageDisplay = document.getElementById('lastChosenImage');

                    // Fade out the images
                    currentImageDisplay.style.opacity = 0;
                    lastChosenImageDisplay.style.opacity = 0;

                    // Wait for fade out to complete (300ms as defined in the CSS)
                    await new Promise(r => setTimeout(r, 300));

                    if (lastChosenImageUrl) {
                        lastChosenImageDisplay.innerHTML = `<img src="${lastChosenImageUrl}" alt="Last Chosen" />`;
                    }

                    const imageUrl = card.printings[0].image_url;
                    const imageElement = new Image();
                    imageElement.src = imageUrl;
                    imageElement.alt = card.name;

                    // Display image once it has fully loaded
                    imageElement.onload = function() {
                        currentImageDisplay.innerHTML = '';
                        currentImageDisplay.appendChild(imageElement);
                        // Fade in the images
                        currentImageDisplay.style.opacity = 1;
                        lastChosenImageDisplay.style.opacity = 1;
                    };

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
