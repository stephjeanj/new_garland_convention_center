// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Toggle dropdown menu
function toggleDropdown() {
    const dropdown = document.getElementById('dropdown');
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('dropdown');
    const dropdownButton = event.target.closest('button');

    if (dropdown && !dropdownButton && !dropdown.contains(event.target)) {
        dropdown.classList.add('hidden');
    }
});

// Hero Image Carousel
function setupHeroCarousel() {
    const images = document.querySelectorAll('.hero-image');
    if (images.length === 0) return;

    let currentIndex = 0;

    function showNextImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    // Change image every 5 seconds
    setInterval(showNextImage, 5000);
}

// Testimonials Carousel
const testimonials = [
    {
        content: "The venue was absolutely perfect for our wedding. The staff was incredibly helpful and professional throughout the entire process.",
        name: "Sarah & Michael",
        eventType: "Wedding Celebration",
        rating: 5
    },
    {
        content: "We hosted our corporate event here and were impressed by the modern amenities and flexible space configuration.",
        name: "John Smith",
        eventType: "Corporate Event",
        rating: 5
    },
    {
        content: "My daughter's quinceañera was a dream come true. The ballroom's elegance and the staff's attention to detail made it perfect.",
        name: "Maria Rodriguez",
        eventType: "Quinceañera",
        rating: 5
    }
];

function setupTestimonialsCarousel() {
    const carousel = document.getElementById('testimonialCarousel');
    if (!carousel) return;

    let currentTestimonial = 0;

    function createTestimonialHTML(testimonial) {
        return `
            <div class="text-center p-6">
                <div class="flex justify-center mb-4 text-primary">
                    ${Array(testimonial.rating).fill('★').join('')}
                </div>
                <blockquote class="text-lg mb-6 italic">
                    "${testimonial.content}"
                </blockquote>
                <div class="font-medium">${testimonial.name}</div>
                <div class="text-sm text-gray-600">
                    ${testimonial.eventType}
                </div>
            </div>
        `;
    }

    function showTestimonial() {
        carousel.innerHTML = createTestimonialHTML(testimonials[currentTestimonial]);
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }

    // Show first testimonial
    showTestimonial();
    // Rotate testimonials every 7 seconds
    setInterval(showTestimonial, 7000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const element = document.querySelector(this.getAttribute('href'));
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form[action*="web3forms"]');

    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerText;
            submitButton.innerText = 'Sending...';
            submitButton.disabled = true;

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form)
                });

                const data = await response.json();

                if (data.success) {
                    // Show success message
                    alert('Thank you for your submission! We will get back to you soon.');
                    form.reset();
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                // Show error message
                alert('Sorry, there was an error submitting the form. Please try again later.');
            } finally {
                submitButton.innerText = originalText;
                submitButton.disabled = false;
            }
        });
    });

    // Initialize carousels if elements exist
    setupHeroCarousel();
    setupTestimonialsCarousel();
});
// Main JavaScript for Garland Convention & Reception Center website

// Hero image slideshow functionality
document.addEventListener('DOMContentLoaded', function() {
    // Slideshow for hero section
    const heroImages = document.querySelectorAll('.hero-image');
    let currentImageIndex = 0;
    
    function rotateHeroImages() {
        // Hide all images
        heroImages.forEach(image => {
            image.classList.remove('active');
        });
        
        // Show the next image
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        heroImages[currentImageIndex].classList.add('active');
    }
    
    // Start the slideshow if hero images exist
    if (heroImages.length > 1) {
        // Initial state - first image is already active
        setInterval(rotateHeroImages, 5000); // Change image every 5 seconds
    }
    
    // Mobile menu toggle
    window.toggleMobileMenu = function() {
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.toggle('hidden');
    };
    
    // Dropdown toggle
    window.toggleDropdown = function() {
        const dropdown = document.getElementById('dropdown');
        dropdown.classList.toggle('hidden');
    };
    
    // Testimonials carousel
    const testimonials = [
        {
            name: "Maria Rodriguez",
            event: "Quinceañera",
            text: "Our daughter's quinceañera was absolutely perfect! The staff went above and beyond to make sure every detail was just right. The venue is beautiful and spacious enough for all our guests."
        },
        {
            name: "David and Sarah Johnson",
            event: "Wedding",
            text: "We couldn't have asked for a better venue for our wedding. The space was elegant, the staff was professional, and our guests had an amazing time. Highly recommend!"
        },
        {
            name: "Ahmed Hassan",
            event: "Corporate Event",
            text: "We hosted our company's annual gala here and were impressed with the professionalism and attention to detail. The space was perfect for our needs and the staff was responsive to all our requests."
        }
    ];
    
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        let currentTestimonialIndex = 0;
        
        function renderTestimonial(index) {
            const testimonial = testimonials[index];
            testimonialCarousel.innerHTML = `
                <div class="testimonial-content">
                    <p class="mb-4 italic text-gray-600">"${testimonial.text}"</p>
                    <div class="font-medium">
                        <p class="text-primary">${testimonial.name}</p>
                        <p class="text-gray-500">${testimonial.event}</p>
                    </div>
                </div>
                <div class="flex justify-center mt-4 gap-2">
                    ${testimonials.map((_, i) => 
                        `<button class="testimonial-dot ${i === index ? 'bg-primary' : 'bg-gray-300'}" 
                                onclick="showTestimonial(${i})"></button>`
                    ).join('')}
                </div>
            `;
        }
        
        // Initialize first testimonial
        renderTestimonial(currentTestimonialIndex);
        
        // Add global function for testimonial navigation
        window.showTestimonial = function(index) {
            currentTestimonialIndex = index;
            renderTestimonial(index);
        };
        
        // Auto rotate testimonials
        setInterval(() => {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
            renderTestimonial(currentTestimonialIndex);
        }, 8000);
    }
});
