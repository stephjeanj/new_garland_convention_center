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
        content: "We had our company Christmas party here and it was really good. It's a very affordable venue, and the owners were absolutely fantastic to work with. They were incredibly accommodating to our schedule and even let us decorate the day before the party, which was amazing!",
        name: "Robin Morgan",
        eventType: "Corporate Event",
        rating: 5
    },
    {
        content: "Great local event space with flexibility options. I love that the owner is always helping local small businesses by referring his clients to them for decor, catering, DJ, MC, etc services. That is best benefit of a business - when you help the others around you grow.",
        name: "Ijeoma O.",
        eventType: "Local Resident",
        rating: 5
    },
    {
        content: "This is the best party hall in your reach for large gatherings. Ideally located and the manager is extremely friendly and humble person. The place is very organized and they have dedicated entrances and exits different halls, so there is no interference and disturbance.",
        name: "Dr. Syed Abraruddin Hasan",
        eventType: "Local Resident",
        rating: 4
    },
    {
        content: "Amazing event center! My Nigerian traditional wedding ceremony and reception occupied 2 out of the 3 halls, which was a welcomed task for my decorator. There's lots of parking and a big kitchen which helped the caterers prep and move around easily. Also, the restrooms had enough stalls for the huge amount of guests that attended. The bar area was exceptional to seclude only essential people and needed supplies. I was able to request (very early) the back room for me and my wedding party to change and have our makeup done.",
        name: "Iroh",
        eventType: "Traditional Wedding",
        rating: 5
    },
    {
        content: "Amazing center for weddings, village meetings, etc. My family and I love it here!",
        name: "Cynthia Williams",
        eventType: "Local Resident",
        rating: 5
    },
    {
        content: "These guys are great, knowledgeable, and always so helpful. My husband loves going there.",
        name: "Suzi Stevenson",
        eventType: "Local Resident",
        rating: 5
    },
    {
        content: "Great place for family gatherings or of any type. Family owned and operated. Willing to work with and host all types of people from all types of backgrounds. Well light safe area as well for parties to go late into the night. Also, patrolled by Garland PD for added safety.",
        name: "Frank I.",
        eventType: "Local Resident",
        rating: 5
    },
    {
        content: "This is a beautiful & huge Venue for your important wedding, anniversary, quinceanera or birthday celebrations! The owner, Mr. Jude is absolutely the best provider of wonderful event services in Garland. The Venue has had a recent renovation that is very beautiful to host any size event up to 800 guests. You can Trust Mr. Jude to give you more than what most Vvnues offer. He is a great hands on owner/operator that is present through out any event he hosts",
        name: "David Newman",
        eventType: "Local Resident",
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