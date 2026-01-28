const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
});

const slides = document.querySelectorAll(".hero-slide");
const mediaSlides = document.querySelectorAll(".hero-media-slide");
const nextBtn = document.querySelector(".arrow.next");
const prevBtn = document.querySelector(".arrow.prev");

let currentSlide = 0;

function updateSlides(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    mediaSlides.forEach(slide => slide.classList.remove("active"));

    slides[index].classList.add("active");
    mediaSlides[index].classList.add("active");
}

nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides(currentSlide);
});

prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides(currentSlide);
});


const stackItems = document.querySelectorAll('.store-stack .stack-item');

let positions = ['stack-front', 'stack-middle', 'stack-back'];

setInterval(() => {
    positions.unshift(positions.pop());

    stackItems.forEach((item, index) => {
        item.classList.remove('stack-front', 'stack-middle', 'stack-back');
        item.classList.add(positions[index]);
    });
}, 4500);



const track = document.querySelector('.gallery-track');
const controls = document.querySelectorAll('.control-item');
const total = controls.length;

let current = 0;
let interval;

function goToSlide(index) {
    current = index;
    track.style.transform = `translateX(-${index * 100}%)`;

    controls.forEach(btn => btn.classList.remove('active'));
    controls[index].classList.add('active');
}

function startAutoplay() {
    interval = setInterval(() => {
        current = (current + 1) % total;
        goToSlide(current);
    }, 9000);
}

controls.forEach(btn => {
    btn.addEventListener('click', () => {
        clearInterval(interval);
        goToSlide(Number(btn.dataset.index));
        startAutoplay();
    });
});

startAutoplay();



(() => {
    const testimonialTrack = document.querySelector('[data-testimonial-track]');
    const testimonialViews = document.querySelectorAll('.testimonial-view');
    const testimonialNextBtn = document.querySelector('[data-testimonial-next]');
    const testimonialPrevBtn = document.querySelector('[data-testimonial-prev]');

    let testimonialCurrentView = 0;
    let testimonialActiveIndex = 0;

    function updateTestimonialView() {
        // mover carrusel
        testimonialTrack.style.transform =
            `translateX(-${testimonialCurrentView * 100}%)`;

        // actualizar SOLO la vista activa
        testimonialViews.forEach((view, viewIndex) => {
            const cards = view.querySelectorAll('.testimonial-card');

            cards.forEach((card, cardIndex) => {
                if (viewIndex === testimonialCurrentView) {
                    card.classList.toggle('active', cardIndex === testimonialActiveIndex);
                    card.classList.toggle('inactive', cardIndex !== testimonialActiveIndex);
                }
            });
        });
    }

    // Flecha siguiente
    testimonialNextBtn.addEventListener('click', () => {
        if (testimonialActiveIndex === 0) {
            testimonialActiveIndex = 1;
        } else {
            testimonialActiveIndex = 0;
            testimonialCurrentView =
                (testimonialCurrentView + 1) % testimonialViews.length;
        }
        updateTestimonialView();
    });

    // Flecha anterior
    testimonialPrevBtn.addEventListener('click', () => {
        if (testimonialActiveIndex === 1) {
            testimonialActiveIndex = 0;
        } else {
            testimonialActiveIndex = 1;
            testimonialCurrentView =
                (testimonialCurrentView - 1 + testimonialViews.length) % testimonialViews.length;
        }
        updateTestimonialView();
    });

    // Click manual en cards
    testimonialViews.forEach((view, viewIndex) => {
        const cards = view.querySelectorAll('.testimonial-card');

        cards.forEach((card, cardIndex) => {
            card.addEventListener('click', () => {
                // solo permitir click en la vista visible
                if (viewIndex !== testimonialCurrentView) return;
                if (cardIndex === testimonialActiveIndex) return;

                testimonialActiveIndex = cardIndex;
                updateTestimonialView();
            });
        });
    });
})();

