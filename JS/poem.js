// Music Player Functionality - ADD THIS AT THE VERY BEGINNING
const musicPlayer = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
const musicStatus = document.getElementById('music-status');
const volumeSlider = document.getElementById('volume-slider');

// Try to play music automatically (continue from previous page)
function tryAutoPlay() {
    musicPlayer.play().then(() => {
        console.log("Music playing automatically on poem page");
        musicStatus.textContent = 'Pause Music';
        musicToggle.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
        localStorage.setItem('musicPlaying', 'true');
    }).catch(error => {
        console.log("Autoplay prevented on poem page");
        musicStatus.textContent = 'Play Music';
        musicToggle.innerHTML = '<i class="fas fa-play"></i> Play Music';
    });
}

// Initialize music on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set initial volume
    musicPlayer.volume = 0.5;
    
    // Check if music was previously playing
    const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
    
    if (wasPlaying) {
        // Try to restore playback position
        const savedTime = localStorage.getItem('musicCurrentTime');
        if (savedTime) {
            musicPlayer.currentTime = parseFloat(savedTime);
        }
        
        tryAutoPlay();
    } else {
        // Try autoplay anyway (with user permission)
        setTimeout(tryAutoPlay, 1000);
    }
    
    // Initialize your existing poem animations AFTER music setup
    initializePoemAnimations();
});

// Enable audio on user interaction
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
    e.stopPropagation();
    
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

// Save current time when leaving page
window.addEventListener('beforeunload', function() {
    localStorage.setItem('musicCurrentTime', musicPlayer.currentTime);
});

// YOUR EXISTING POEM ANIMATION CODE (Wrap it in a function)
function initializePoemAnimations() {
    const messages = document.querySelectorAll('.message');
    const progress = document.getElementById('progress');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const heartsContainer = document.getElementById('hearts-container');
    
    let currentMessage = 0;
    const totalMessages = messages.length;
    const displayTime = 6000; // 6 seconds per message
    
    // Create floating hearts
    function createHearts() {
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            
            // Random position and animation delay
            const left = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = 8 + Math.random() * 5;
            
            heart.style.left = `${left}%`;
            heart.style.animationDelay = `${delay}s`;
            heart.style.animationDuration = `${duration}s`;
            
            heartsContainer.appendChild(heart);
        }
    }
    
    // Show current message
    function showMessage(index) {
        // Hide all messages
        messages.forEach(message => {
            message.classList.remove('active');
        });
        
        // Show current message
        messages[index].classList.add('active');
        
        // Update progress bar
        progress.style.width = `${((index + 1) / totalMessages) * 100}%`;
        
        currentMessage = index;
        
        // Update button states
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === totalMessages - 1;
    }
    
    // Next message
    function nextMessage() {
        if (currentMessage < totalMessages - 1) {
            showMessage(currentMessage + 1);
        }
    }
    
    // Previous message
    function prevMessage() {
        if (currentMessage > 0) {
            showMessage(currentMessage - 1);
        }
    }
    
    // Auto-advance messages
    let autoAdvance = setInterval(nextMessage, displayTime);
    
    // Reset auto-advance timer on interaction
    function resetAutoAdvance() {
        clearInterval(autoAdvance);
        autoAdvance = setInterval(nextMessage, displayTime);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', function() {
        nextMessage();
        resetAutoAdvance();
    });
    
    prevBtn.addEventListener('click', function() {
        prevMessage();
        resetAutoAdvance();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextMessage();
            resetAutoAdvance();
        } else if (e.key === 'ArrowLeft') {
            prevMessage();
            resetAutoAdvance();
        }
    });
    
    // Initialize
    createHearts();
    showMessage(0);
}
