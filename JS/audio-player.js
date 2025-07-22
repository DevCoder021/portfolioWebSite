// Audio player simulation
document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', function() {
        const isPlaying = this.textContent === '⏸';
        this.textContent = isPlaying ? '▶' : '⏸';
        
        const progressBar = this.closest('.audio-player').querySelector('.progress-bar');
        if (!isPlaying) {
            let width = 30;
            const interval = setInterval(() => {
                width += 1;
                progressBar.style.width = width + '%';
                if (width >= 100) {
                    clearInterval(interval);
                    this.textContent = '▶';
                    setTimeout(() => {
                        progressBar.style.width = '30%';
                    }, 500);
                }
            }, 100);
        }
    });
});