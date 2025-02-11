// Listen for user interaction to enable sounds
document.addEventListener("click", () => {
    soundEnabled = true;
});

/// SOUNDS
// Function to play a specific notification sound based on index
function playNotificationSound(index = 0) {
    if (!soundEnabled) {
        console.warn("User interaction required to play sounds.");
        return;
    }

    const sounds = [
        'sound-win',    // index 0
        'sound-level',  // index 1
        'sound-select', // index 2
        'sound-click',  // index 3
        'sound-hit',    // index 4
        'sound-error',  // index 5
        'sound-power',  // index 6
    ];

    const soundId = sounds[index] || sounds[0]; // Default to index 0
    const audioElement = document.getElementById(soundId);

    // Prevent other sounds from playing over sound-power (index 6)
    if (index === 6) {
        document.querySelectorAll("audio").forEach(audio => audio.pause());
    }

    if (audioElement) {
        // Clone the audio element to allow concurrent playback
        const clone = audioElement.cloneNode();
        clone.volume = globalVolume; // Use the global volume variable
        clone.play();
    } else {
        console.error('Sound not found:', soundId);
    }
}

// Global volume variable for all sounds
let musicVolume = 0.5;
let globalVolume = 0.5; // Default volume
let toggleTTS = false;
