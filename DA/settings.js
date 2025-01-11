// Get elements
const settingsButton = document.getElementById('settingsButton');
const settingsModal = document.getElementById('settings-modal');
const saveSettingsButton = document.getElementById('saveSettings');
const ttsToggle = document.getElementById('ttsToggle');
const musicVolumeSlider = document.getElementById('musicVolume'); // Slider element
const soundVolumeSlider = document.getElementById('soundVolume'); // Slider element
const musicVolumeLabel = document.getElementById('musicVolumeLabel');
const soundVolumeLabel = document.getElementById('soundVolumeLabel');

//TTS prototype
function speakNotification(message) {
    if (toggleTTS){
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 0.9;  // Adjust rate
        utterance.pitch = 0.1;  // Adjust pitch

        // Create an AudioContext and GainNode
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const gainNode = audioContext.createGain();

        // Adjust the volume (0 is silent, 1 is normal volume, 0.5 is half volume, etc.)
        gainNode.gain.value = 0.3;  // Lower the volume to 30%

        // Connect the gain node to the audio context's destination
        const source = audioContext.createMediaStreamDestination();
        gainNode.connect(source);
        // Play the utterance through the AudioContext
        speechSynthesis.speak(utterance);
    }
}


// Global variables for settings
//let musicVolumeValue = 1.0; // Default volume
//let globalVolume = 1.0; // Default global sound volume
//let toggleTTS = false; // Default TTS toggle

// Show settings modal when the settings button is clicked
settingsButton.addEventListener('click', () => {
    playNotificationSound(3);
    settingsModal.classList.remove('hidden');
});

// Close the modal when clicking outside of it
settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
        settingsModal.classList.add('hidden');
    }
});

// Update volume label text when the slider is moved
musicVolumeSlider.addEventListener('input', () => {
    musicVolumeLabel.textContent = `${Math.round(musicVolumeSlider.value * 100)}%`;
});

soundVolumeSlider.addEventListener('input', () => {
    soundVolumeLabel.textContent = `${Math.round(soundVolumeSlider.value * 100)}%`;
});

// Apply the settings when the "Confirm Settings" button is clicked
saveSettingsButton.addEventListener('click', () => {
    // TTS toggle
    toggleTTS = ttsToggle.checked;
    if (toggleTTS) {
        enableTTS();
    } else {
        disableTTS();
    }

    // Update volumes
    setMusicVolume(musicVolumeSlider.value);
    setSoundVolume(soundVolumeSlider.value);

    // Close modal
    settingsModal.classList.add('hidden');
    playNotificationSound(3);

    // Save settings to localStorage
    const settingsData = {
        musicVolumeValue,
        globalVolume,
        toggleTTS,
    };
    localStorage.setItem('settingsData', JSON.stringify(settingsData));
});

// Functions to enable/disable TTS
function enableTTS() {
    console.log("TTS Enabled");
}

function disableTTS() {
    console.log("TTS Disabled");
}

// Function to set the music volume
function setMusicVolume(volume) {
    const musicAudio = document.getElementById('background-music'); 
    if (musicAudio) {
        musicAudio.volume = volume;
        musicAudio.muted = false; // Ensure unmuted after user interaction
        if (volume > 0) {
            if (musicAudio.paused || musicAudio.ended) {
                musicAudio.play().catch(err => console.log("Autoplay issue:", err));
                musicAudio.loop = true;
            }
            if (volume == 1){
                musicVolumeLabel.textContent = `MAX`;
            }
        } else {
            musicVolumeLabel.textContent = `MUTED`;
            musicAudio.pause();
            musicAudio.currentTime = 0; // Reset the music to the start
        }
    }
    console.log("Music Volume set to", volume);
    musicVolumeValue = volume; 
}

// Function to set the global sound volume
function setSoundVolume(volume) {
    globalVolume = volume;
    console.log("Global Sound Volume set to", volume);

    // Adjust the volume of all preloaded sounds
    ['sound-win', 'sound-level', 'sound-select'].forEach(id => {
        const sound = document.getElementById(id);
        if (sound) {
            if (volume < 1){
                soundVolumeLabel.textContent = `MUTED`;
            }
            if (volume == 1){
                soundVolumeLabel.textContent = `MAX`;
            }
            sound.volume = globalVolume;
        }
    });
}

// Function to load settings from localStorage
function loadSettings() {
    const storedSettingsData = localStorage.getItem('settingsData');
    if (storedSettingsData) {
        const { musicVolumeValue: storedVolume, globalVolume: storedGlobal, toggleTTS: storedTTS } = JSON.parse(storedSettingsData);
        musicVolumeValue = storedVolume;
        globalVolume = storedGlobal;
        toggleTTS = storedTTS;

        // Apply the settings to UI elements
        musicVolumeSlider.value = musicVolumeValue;
        soundVolumeSlider.value = globalVolume;
        ttsToggle.checked = toggleTTS;

        // Update labels
        musicVolumeLabel.textContent = `${Math.round(musicVolumeValue * 100)}%`;
        soundVolumeLabel.textContent = `${Math.round(globalVolume * 100)}%`;
        setMusicVolume(musicVolumeValue);
        setSoundVolume(globalVolume);
    }
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    //loadSettings();
});

