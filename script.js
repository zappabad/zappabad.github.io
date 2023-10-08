import { db } from './firebaseConfig.js';
import { ref, set } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

console.log("DB in script.js:", db);  // Add this line

let currentImageElement = null;

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
                // Determine the pitch color based on the 'pitch' field
                const pitchColor = card.pitch === "1" ? "Red" : card.pitch === "2" ? "Yellow" : card.pitch === "3" ? "Blue" : null;
                const displayName = pitchColor ? `${card.name} (${pitchColor})` : card.name;

                const cardElement = document.createElement('button');
                cardElement.textContent = displayName;  // Now includes pitch color
                cardElement.className = 'list-group-item list-group-item-action';  // Bootstrap classes

                cardElement.addEventListener('click', function() {
                    const currentImageDisplay = document.getElementById('currentImage');

                    const newImageElement = new Image();
                    newImageElement.src = card.printings[0].image_url;
                    newImageElement.alt = card.name;
                    newImageElement.className = 'crossfade-image';
                    newImageElement.style.opacity = 0;  // start transparent

                    newImageElement.onload = function() {
                        newImageElement.style.opacity = 1;
                        
                        if (currentImageElement) {
                            currentImageElement.style.opacity = 0;
                        }

                        setTimeout(() => {
                            if (currentImageElement) {
                                currentImageDisplay.removeChild(currentImageElement);
                            }
                            currentImageElement = newImageElement;
                        }, 1000);  // 1s transition
                    };

                    const cardNameRef = ref(db, 'currentCard');
                    set(cardNameRef, card.unique_id);  // Send unique_id to Firebase

                    currentImageDisplay.appendChild(newImageElement);
                });

                cardContainer.appendChild(cardElement);
            });
        });

    } catch (error) {
        console.error('Error fetching or displaying data:', error);
    }
}

fetchAndDisplayCards();
