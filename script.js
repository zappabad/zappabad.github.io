let currentImageUrl = null;

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

                    // Create new image element for the new card
                    const newImageElement = new Image();
                    newImageElement.src = card.printings[0].image_url;
                    newImageElement.alt = card.name;
                    newImageElement.className = 'crossfade-image';
                    newImageElement.style.opacity = 0;

                    // Add new image to the display div
                    currentImageDisplay.appendChild(newImageElement);

                    // Cross-fade effect
                    newImageElement.onload = function() {
                        // Fade in new image
                        newImageElement.style.opacity = 1;

                        // Fade out old image if it exists
                        if (currentImageUrl) {
                            const oldImageElement = document.querySelector(`img[src="${currentImageUrl}"]`);
                            if (oldImageElement) {
                                oldImageElement.style.opacity = 0;
                            }
                        }

                        // Remove old image from DOM after transition
                        setTimeout(() => {
                            if (currentImageUrl) {
                                const oldImageElement = document.querySelector(`img[src="${currentImageUrl}"]`);
                                if (oldImageElement) {
                                    currentImageDisplay.removeChild(oldImageElement);
                                }
                            }
                        }, 1000);  // 1 second transition

                        // Update current image URL
                        currentImageUrl = newImageElement.src;
                    };
                });

                cardContainer.appendChild(cardElement);
            });
        });

    } catch (error) {
        console.error('Error fetching or displaying data:', error);
    }
}

fetchAndDisplayCards();
