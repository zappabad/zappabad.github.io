let lastChosenImageUrl = null;

async function fetchAndDisplayCards() {
    try {
        // ... same as before ...

        searchBox.addEventListener('input', function() {
            // ... same as before ...

            filteredCards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.textContent = card.name;
                cardElement.className = 'clickable-card';

                cardElement.addEventListener('click', function() {
                    const currentImageDisplay = document.getElementById('currentImage');
                    const lastChosenImageDisplay = document.getElementById('lastChosenImage');

                    if (lastChosenImageUrl) {
                        const lastChosenImageElement = new Image();
                        lastChosenImageElement.src = lastChosenImageUrl;
                        lastChosenImageElement.alt = "Last Chosen";
                        lastChosenImageElement.style.opacity = 1;
                        lastChosenImageDisplay.innerHTML = '';
                        lastChosenImageDisplay.appendChild(lastChosenImageElement);
                    }

                    const imageUrl = card.printings[0].image_url;
                    const imageElement = new Image();
                    imageElement.src = imageUrl;
                    imageElement.alt = card.name;
                    imageElement.style.opacity = 0;  // start transparent

                    imageElement.onload = function() {
                        currentImageDisplay.innerHTML = '';
                        currentImageDisplay.appendChild(imageElement);
                        
                        // Fade in (from transparent to opaque)
                        setTimeout(() => { imageElement.style.opacity = 1; }, 50);
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
