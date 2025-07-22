// Cursor personnalisé
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector('.gallery-track');
    const slides = document.querySelectorAll('.gallery-slide');
    const prevBtn = document.querySelector('.gallery-arrow.left');
    const nextBtn = document.querySelector('.gallery-arrow.right');
    let current = 0;

    function updateGallery() {
        track.style.transform = `translateX(-${current * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        current = (current - 1 + slides.length) % slides.length;
        updateGallery();
    });

    nextBtn.addEventListener('click', () => {
        current = (current + 1) % slides.length;
        updateGallery();
    });

    updateGallery();
});

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const thumbs = document.querySelectorAll('.thumb');
    const prevBtn = document.querySelector('.gallery-nav.prev');
    const nextBtn = document.querySelector('.gallery-nav.next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        thumbs.forEach(thumb => thumb.classList.remove('active'));
        
        slides[index].classList.add('active');
        thumbs[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
});

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.gallery-shorts-track');
    const slides = document.querySelectorAll('.gallery-shorts-slide');
    const prevBtn = document.querySelector('.gallery-arrow.prev');
    const nextBtn = document.querySelector('.gallery-arrow.next');
    let current = 0;

    function updateSlider() {
        track.style.transform = `translateX(-${current * 100}%)`;
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === current);
        });
    }

    prevBtn.addEventListener('click', () => {
        current = (current - 1 + slides.length) % slides.length;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        current = (current + 1) % slides.length;
        updateSlider();
    });

    updateSlider();
});

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.coverflow-slide');
    const prevBtn = document.querySelector('.coverflow-arrow.prev');
    const nextBtn = document.querySelector('.coverflow-arrow.next');
    let current = 2; // centre

    function updateCoverflow() {
        slides.forEach((slide, i) => {
            slide.className = 'coverflow-slide';
            if (i === current) slide.classList.add('active');
            else if (i === current - 1) slide.classList.add('left');
            else if (i === current + 1) slide.classList.add('right');
            else if (i === current - 2) slide.classList.add('far-left');
            else if (i === current + 2) slide.classList.add('far-right');
        });
    }

    prevBtn.addEventListener('click', () => {
        current = (current - 1 + slides.length) % slides.length;
        updateCoverflow();
    });

    nextBtn.addEventListener('click', () => {
        current = (current + 1) % slides.length;
        updateCoverflow();
    });

    updateCoverflow();
});

document.addEventListener('DOMContentLoaded', function() {
    // Témoignages dashboard
    const addBtn = document.getElementById('add-testimonial');
    const formOverlay = document.getElementById('form-overlay');
    const testimonialForm = document.getElementById('testimonial-form');
    const cancelBtn = document.getElementById('btn-cancel');
    const thankyouModal = document.getElementById('thankyou-modal');
    const closeThankyou = document.getElementById('close-thankyou');
    const ratingStars = document.querySelectorAll('.rating-star');
    let selectedRating = 5; // Initialisé à 5 étoiles

    // Affiche le formulaire
    addBtn.addEventListener('click', () => {
        formOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        selectedRating = 5;
        updateStarRating();
    });

    // Sélection des étoiles
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.rating);
            updateStarRating();
        });
        star.addEventListener('mouseenter', function() {
            highlightStars(parseInt(this.dataset.rating));
        });
    });

    document.getElementById('rating-input').addEventListener('mouseleave', function() {
        updateStarRating();
    });

    function highlightStars(rating) {
        ratingStars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    function updateStarRating() {
        highlightStars(selectedRating);
    }

    // Annuler le formulaire
    cancelBtn.addEventListener('click', () => {
        formOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
        testimonialForm.reset();
        selectedRating = 5;
        updateStarRating();
    });

    // Soumettre le formulaire
    testimonialForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (selectedRating === 0) {
            alert('Veuillez sélectionner une note');
            return;
        }
        formOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
        thankyouModal.style.display = 'flex';

        // Ajout du témoignage
        const name = document.getElementById('name').value;
        const position = document.getElementById('position').value;
        const title = document.getElementById('title').value;
        const message = document.getElementById('message').value;
        let stars = "★".repeat(selectedRating) + "☆".repeat(5 - selectedRating);
        let initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);

        const list = document.getElementById('testimonial-list');
        const div = document.createElement('div');
        div.className = 'testimonial';
        div.innerHTML = `
            <div class="testimonial-avatar">${initials}</div>
            <div class="testimonial-content">
                <div class="stars"><span>${stars}</span></div>
                <p><strong>${title}</strong><br>${message}</p>
                <cite>${name}${position ? " · " + position : ""}</cite>
            </div>
        `;
        list.prepend(div);

        testimonialForm.reset();
        selectedRating = 5;
        updateStarRating();
    });

    // Fermer le message de remerciement
    closeThankyou.addEventListener('click', () => {
        thankyouModal.style.display = 'none';
    });

    // Fermer le modal en cliquant à l'extérieur
    formOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
            formOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
            testimonialForm.reset();
            selectedRating = 5;
            updateStarRating();
        }
    });
});

// Témoignages
let selectedRating = 0;
const testimonials = [];

// Gestion des étoiles
document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
        selectedRating = parseInt(this.dataset.rating);
        document.getElementById('selectedRating').value = selectedRating;
        updateStars();
    });

    star.addEventListener('mouseenter', function() {
        const rating = parseInt(this.dataset.rating);
        highlightStars(rating);
    });
});

document.getElementById('starRating').addEventListener('mouseleave', function() {
    updateStars();
});

function highlightStars(rating) {
    document.querySelectorAll('.star').forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function updateStars() {
    highlightStars(selectedRating);
}

function toggleForm() {
    const form = document.getElementById('commentForm');
    const thankYou = document.getElementById('thankYouMessage');
    const section = document.querySelector('.testimonials-section');
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
        thankYou.style.display = 'none';
        if(section) section.classList.add('form-open');
    } else {
        form.style.display = 'none';
        if(section) section.classList.remove('form-open');
    }
}

function cancelForm() {
    document.getElementById('commentForm').style.display = 'none';
    const section = document.querySelector('.testimonials-section');
    if(section) section.classList.remove('form-open');
    resetForm();
}

function resetForm() {
    document.querySelector('#commentForm form').reset();
    selectedRating = 0;
    updateStars();
}

function submitComment(event) {
    event.preventDefault();
    
    const name = document.getElementById('clientName').value;
    const comment = document.getElementById('clientComment').value;
    const rating = selectedRating;

    if (rating === 0) {
        alert('Veuillez sélectionner une note !');
        return;
    }

    // Créer le nouveau témoignage
    const newTestimonial = {
        name: name,
        comment: comment,
        rating: rating,
        date: new Date().toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    };

    // Ajouter au début de la grille
    addTestimonialToGrid(newTestimonial);

    // Afficher le message de remerciement
    document.getElementById('thankYouMessage').style.display = 'block';
    document.getElementById('commentForm').style.display = 'none';

    // Réinitialiser le formulaire
    resetForm();

    // Masquer le message après 5 secondes
    setTimeout(() => {
        document.getElementById('thankYouMessage').style.display = 'none';
    }, 5000);
}

function addTestimonialToGrid(testimonial) {
    const grid = document.getElementById('testimonialsGrid');
    const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
    
    const testimonialCard = document.createElement('div');
    testimonialCard.className = 'testimonial-card';
    testimonialCard.style.animation = 'fadeIn 0.5s ease-out';
    
    testimonialCard.innerHTML = `
        <div class="testimonial-header">
            <div class="testimonial-name">${testimonial.name}</div>
            <div class="testimonial-stars">${stars}</div>
        </div>
        <div class="testimonial-text">"${testimonial.comment}"</div>
        <div class="testimonial-date">${testimonial.date}</div>
    `;
    
    grid.insertBefore(testimonialCard, grid.firstChild);
}