function updatePlayerInfo() {
    // Get existing player data from localStorage
    //const playerData = JSON.parse(localStorage.getItem('playerData')) || {};
    //const playerName = playerData.playerName || "Unnamed";

    const playerInfoElement = document.getElementById('player_info');
    if (!playerInfoElement) {
        console.error("Error: 'player_info' element not found.");
        return;
    }

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


document.getElementById('start-game').addEventListener('click', function() {
    // Get existing player data from localStorage
    let playerData = JSON.parse(localStorage.getItem('playerData')) || {};

    if (!playerData) {
        playerName = document.getElementById('player-name').value;
        // If playerName is empty or just whitespace, use "player_name" as the placeholder
        if (!playerName.trim()) {
            playerName = "...";
        }
    }
    
    //if (playerName.trim() === "") {
    //    alert("Please enter a valid name!");
    //    return;
    //}
    
    //playerName="Unamed"

    if (playerData && playerName !== "") {
        // Add playerName to the player data
        playerData.playerName = playerName;
        // Store the updated player data in localStorage
        localStorage.setItem('playerData', JSON.stringify(playerData));
        updatePlayerInfo();
    }


    // Start the background music
    const musicAudio = document.getElementById('background-music');
    if (musicAudio.paused || musicAudio.ended) {
        musicAudio.play();
        musicAudio.loop = true;
    }

    // Hide the greeting box and start the game
    document.getElementById('greeting-box').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';

    playNotificationSound(3);
});
