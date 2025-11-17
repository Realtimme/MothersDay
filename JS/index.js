// Create floating hearts
        document.addEventListener('DOMContentLoaded', function() {
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