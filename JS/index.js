// Create floating hearts
document.addEventListener('DOMContentLoaded', function () {
    const heartsContainer = document.getElementById('hearts-container');

    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');

        // Random position and animation delay
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = 8 + Math.random() * 5;

        heart.style.left = `${left}%`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.animationDuration = `${duration}s`;

        heartsContainer.appendChild(heart);
    }
});

// Music Player Functionality
const musicPlayer = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
const musicStatus = document.getElementById('music-status');
const volumeSlider = document.getElementById('volume-slider');

// Try to play music automatically (browser may block this)
function tryAutoPlay() {
    musicPlayer.play().then(() => {
        console.log("Music playing automatically");
        musicStatus.textContent = 'Pause Music';
        musicToggle.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
        localStorage.setItem('musicPlaying', 'true');
    }).catch(error => {
        console.log("Autoplay prevented. User needs to interact first.");
        musicStatus.textContent = 'Play Music';
        musicToggle.innerHTML = '<i class="fas fa-play"></i> Play Music';
        localStorage.setItem('musicPlaying', 'false');
        
        // Show instruction to user
        document.querySelector('.instruction').innerHTML += 
            '<br><small style="color: #ff6b8b;">Click anywhere to enable music</small>';
    });
}

// Initialize music on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set initial volume
    musicPlayer.volume = 0.5;
    
    // Check if music was previously playing
    const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
    
    if (wasPlaying) {
        tryAutoPlay();
    } else {
        // Try autoplay anyway (with user permission)
        setTimeout(tryAutoPlay, 1000);
    }
});

// Enable audio on first user interaction
let userInteracted = false;
document.addEventListener('click', function() {
    if (!userInteracted) {
        userInteracted = true;
        if (musicPlayer.paused && localStorage.getItem('musicPlaying') !== 'false') {
            musicPlayer.play();
            musicStatus.textContent = 'Pause Music';
            musicToggle.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
            localStorage.setItem('musicPlaying', 'true');
        }
    }
});

// Toggle music play/pause
musicToggle.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent triggering the document click listener
    
    if (musicPlayer.paused) {
        musicPlayer.play();
        musicStatus.textContent = 'Pause Music';
        musicToggle.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
        localStorage.setItem('musicPlaying', 'true');
    } else {
        musicPlayer.pause();
        musicStatus.textContent = 'Play Music';
        musicToggle.innerHTML = '<i class="fas fa-play"></i> Play Music';
        localStorage.setItem('musicPlaying', 'false');
    }
});

// Volume control
volumeSlider.addEventListener('input', function() {
    musicPlayer.volume = this.value;
    localStorage.setItem('musicVolume', this.value);
});

// Load saved volume
if (localStorage.getItem('musicVolume')) {
    musicPlayer.volume = localStorage.getItem('musicVolume');
    volumeSlider.value = localStorage.getItem('musicVolume');
}

// Save current time when leaving page (optional)
window.addEventListener('beforeunload', function() {
    localStorage.setItem('musicCurrentTime', musicPlayer.currentTime);
});

// Create floating hearts (keep your existing code)
const heartsContainer = document.getElementById('hearts-container');
for (let i = 0; i < 15; i++) {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = 8 + Math.random() * 5;
    
    heart.style.left = `${left}%`;
    heart.style.animationDelay = `${delay}s`;
    heart.style.animationDuration = `${duration}s`;
    
    heartsContainer.appendChild(heart);
}
