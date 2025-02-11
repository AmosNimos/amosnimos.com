// Ensure soundEnabled is only declared once globally
if (!("soundEnabled" in window)) {
    window.soundEnabled = false;
}

// Ensure user interaction enables audio playback
document.addEventListener("click", () => {
    if (!window.soundEnabled) {
        window.soundEnabled = true;
        // Unmute all audio elements after first interaction
        document.querySelectorAll("audio").forEach(audio => audio.muted = false);
    }
});

// Global volume variables
window.musicVolume = window.musicVolume || 0.5;
window.globalVolume = window.globalVolume || 0.5;
window.toggleTTS = window.toggleTTS || false;

// Make function globally accessible
window.playNotificationSound = function(index = 0) {
    if (!window.soundEnabled) {
        console.warn("User interaction required to play sounds.");
        return;
    }

    const sounds = [
        'sound-win', 'sound-level', 'sound-select', 'sound-click',
        'sound-hit', 'sound-error', 'sound-power'
    ];

    const soundId = sounds[index] || sounds[0]; // Default to index 0
    const audioElement = document.getElementById(soundId);

    if (audioElement) {
        const clone = audioElement.cloneNode();
        clone.volume = window.globalVolume;
        document.body.appendChild(clone);
        clone.play();
        clone.addEventListener("ended", () => clone.remove());
    } else {
        console.error('Sound not found:', soundId);
    }
};
