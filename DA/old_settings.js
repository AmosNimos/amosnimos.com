// Get elements
const settingsButton = document.getElementById('settingsButton');
const settingsModal = document.getElementById('settings-modal');
const saveSettingsButton = document.getElementById('saveSettings');
const ttsToggle = document.getElementById('ttsToggle');
const musicVolume = document.getElementById('musicVolume');
const soundVolume = document.getElementById('soundVolume');
const musicVolumeLabel = document.getElementById('musicVolumeLabel');
const soundVolumeLabel = document.getElementById('soundVolumeLabel');

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
musicVolume.addEventListener('input', () => {
    musicVolumeLabel.textContent = `${Math.round(musicVolume.value * 100)}%`;
});

soundVolume.addEventListener('input', () => {
    soundVolumeLabel.textContent = `${Math.round(soundVolume.value * 100)}%`;
});

// Apply the settings when the "Confirm Settings" button is clicked
saveSettingsButton.addEventListener('click', () => {
    // TTS toggle
    if (ttsToggle.checked) {
        enableTTS();
    } else {
        disableTTS();
    }

    // Update volumes
    setMusicVolume(musicVolume.value);
    setSoundVolume(soundVolume.value);

    // Close modal
    settingsModal.classList.add('hidden');
    playNotificationSound(3);

    //Settings
    const settingsData = { musicVolume, globalVolume, toggleTTS };
    localStorage.setItem('settingsData', JSON.stringify(settingsData));
});

// Functions to enable/disable TTS (modify as needed)
function enableTTS() {
    console.log("TTS Enabled");
    toggleTTS = true;
    // Enable TTS code here (e.g., initialize or resume TTS feature)
}

function disableTTS() {
    console.log("TTS Disabled");
    toggleTTS = false;
    // Disable TTS code here (e.g., pause or mute TTS feature)
}

// Functions to set music and sound volumes (modify as needed)
function setMusicVolume(volume) {
    // Assuming you have a global audio variable or audio context
    const musicAudio = document.getElementById('background-music'); // Or use AudioContext
    if (musicAudio) {
        musicAudio.volume = volume;
        if (volume>0){
            if (musicAudio.paused || musicAudio.ended) {
                musicAudio.play();
                musicAudio.loop = true;
            }
        } else {
            musicAudio.pause();
            musicAudio.currentTime = 0; // Reset the music to the start        
        }
        musicVolume=volume
    }
    console.log("Music Volume set to", volume);
}

// Function to set the global sound volume
function setSoundVolume(volume) {
    globalVolume = volume;  // Update the global volume variable
    console.log("Global Sound Volume set to", volume);

    // Adjust the volume of all preloaded sounds
    ['sound-win', 'sound-level', 'sound-select'].forEach(id => {
        const sound = document.getElementById(id);
        if (sound) {
            sound.volume = globalVolume;
        }
    });
}

function loadSettings(){
    const storedSettingsData = localStorage.getItem('settingsData');
    if (storedSkillsData) {
        const { musicVolume: storedVolume, globalVolume: storedGlobal, toggleTTS: storedTTS } = JSON.parse(storedSkillsData);
        musicVolume = storedVolume;
        globalVolume = storedGlobal;
        toggleTTS = storedTTS;
    }
}
