function updatePlayerInfo() {
    const playerInfoElement = document.getElementById('player_info');
    if (!playerInfoElement) {
        console.error("Error: 'player_info' element not found.");
        return;
    }

    // Get player data from localStorage
    let playerData = JSON.parse(localStorage.getItem('playerData')) || {};
    //playerName = playerData.playerName; // Set playerName from localStorage or fallback to "Unnamed"

    if (typeof titles === 'undefined' || typeof ascension_level === 'undefined' || typeof level === 'undefined' || typeof gold === 'undefined') {
        console.error("Error: One or more required variables are undefined.");
        return;
    }

    const title = titles[ascension_level] || "Unknown Class";
    const levelDisplay = level || 1;
    const goldDisplay = gold || 0;

    // Format player info
    playerInfoElement.innerHTML = `Name: ${playerName} | Class: ${title} | Level: ${levelDisplay} | Gold: ${goldDisplay}`;
}

// Load player info from localStorage on page load
document.addEventListener("DOMContentLoaded", function() {
    updatePlayerInfo();
});

document.getElementById('start-game').addEventListener('click', function() {
    let playerData = JSON.parse(localStorage.getItem('playerData')) || {};

    // Get player name from input field
    let playerNameInput = document.getElementById('player-name').value;

    // Save playerName to localStorage if it's valid and doesn't already exist
    playerData.playerName = playerNameInput;
    localStorage.setItem('playerData', JSON.stringify(playerData));
    // Update the player info on screen
    updatePlayerInfo();

    // Start the background music if it's not already playing
    const musicAudio = document.getElementById('background-music');
    if (musicAudio.paused || musicAudio.ended) {
        musicAudio.play();
        musicAudio.loop = true;
    }

    // Hide the greeting box and start the game
    document.getElementById('greeting-box').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';

    // Play notification sound
    playNotificationSound(3);
});
