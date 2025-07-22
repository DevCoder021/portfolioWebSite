// Système de particules pour l'arrière-plan du hero
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Créer un conteneur pour les particules
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 1;
        pointer-events: none;
    `;
    
    heroSection.appendChild(particlesContainer);
    
    // Nombre de particules à créer
    const particleCount = 50;
    
    // Créer les particules
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
});

function createParticle(container) {
    // Créer l'élément particule
    const particle = document.createElement('div');
    
    // Taille aléatoire entre 2 et 5 pixels
    const size = Math.random() * 3 + 2;
    
    // Position aléatoire dans le conteneur
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Vitesse aléatoire
    const speedX = (Math.random() - 0.5) * 0.3;
    const speedY = (Math.random() - 0.5) * 0.3;
    
    // Couleur aléatoire entre les teintes du site
    const colors = ['#00ff88', '#00d4ff', '#ffffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Opacité aléatoire
    const opacity = Math.random() * 0.5 + 0.1;
    
    // Délai aléatoire pour l'animation
    const delay = Math.random() * 5;
    
    // Appliquer les styles
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: 50%;
        top: ${posY}%;
        left: ${posX}%;
        opacity: ${opacity};
        pointer-events: none;
        box-shadow: 0 0 ${size * 2}px ${color};
        --delay: ${delay};
    `;
    
    // Ajouter au conteneur
    container.appendChild(particle);
    
    // Animer la particule
    animateParticle(particle, speedX, speedY);
}

function animateParticle(particle, speedX, speedY) {
    let posX = parseFloat(particle.style.left);
    let posY = parseFloat(particle.style.top);
    
    function update() {
        // Mettre à jour la position
        posX += speedX;
        posY += speedY;
        
        // Rebondir sur les bords
        if (posX < 0 || posX > 100) speedX *= -1;
        if (posY < 0 || posY > 100) speedY *= -1;
        
        // Appliquer la nouvelle position
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Continuer l'animation
        requestAnimationFrame(update);
    }
    
    update();
}