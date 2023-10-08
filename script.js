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
