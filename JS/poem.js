document.addEventListener('DOMContentLoaded', function() {
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
        });