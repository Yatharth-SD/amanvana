// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const navMenu = document.getElementById("nav-menu");

mobileMenuToggle.addEventListener("click", function () {
  navMenu.classList.toggle("active");
  const icon = mobileMenuToggle.querySelector("i");
  if (navMenu.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    navMenu.classList.remove("active");
    const icon = mobileMenuToggle.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");
const totalSlides = slides.length;
const carouselTrack = document.getElementById("carousel-track");
const carouselPrev = document.getElementById("carousel-prev");
const carouselNext = document.getElementById("carousel-next");
const indicators = document.querySelectorAll(".indicator");

function updateCarousel() {
  const translateX = -currentSlide * 100;
  carouselTrack.style.transform = `translateX(${translateX}%)`;

  // Update indicators
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

carouselNext.addEventListener("click", nextSlide);
carouselPrev.addEventListener("click", prevSlide);

// Indicator click handlers
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", function () {
    currentSlide = index;
    updateCarousel();
  });
});

// Auto-play carousel
setInterval(nextSlide, 5000);

// Gallery filter functionality
const galleryTabs = document.querySelectorAll(".gallery-tab");
const galleryItems = document.querySelectorAll(".gallery-item");

galleryTabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    const category = this.getAttribute("data-category");

    // Update active tab
    galleryTabs.forEach((t) => t.classList.remove("active"));
    this.classList.add("active");

    // Filter gallery items
    galleryItems.forEach((item) => {
      if (
        category === "all" ||
        item.getAttribute("data-category") === category
      ) {
        item.style.display = "block";
        item.style.opacity = "0";
        setTimeout(() => {
          item.style.opacity = "1";
        }, 50);
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Testimonials slider
let currentTestimonial = 0;
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const testimonialDots = document.querySelectorAll(".testimonial-dot");
const totalTestimonials = testimonialSlides.length;

function updateTestimonials() {
  testimonialSlides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentTestimonial);
  });

  testimonialDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentTestimonial);
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
  updateTestimonials();
}

// Testimonial dot click handlers
testimonialDots.forEach((dot, index) => {
  dot.addEventListener("click", function () {
    currentTestimonial = index;
    updateTestimonials();
  });
});

// Auto-play testimonials
setInterval(nextTestimonial, 7000);

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Form submission handler
const bookingForm = document.getElementById("booking-form");
bookingForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  // Basic validation
  const checkinDate = new Date(formObject.checkin);
  const checkoutDate = new Date(formObject.checkout);
  const today = new Date();

  if (checkinDate <= today) {
    alert("Check-in date must be in the future.");
    return;
  }

  if (checkoutDate <= checkinDate) {
    alert("Check-out date must be after check-in date.");
    return;
  }

  // Simulate form submission
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Submitting...";
  submitBtn.disabled = true;

  setTimeout(() => {
    alert(
      "Thank you for your booking request! We will contact you shortly to confirm your reservation."
    );
    this.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

// Set minimum date for check-in to today
const today = new Date().toISOString().split("T")[0];
document.getElementById("checkin").setAttribute("min", today);

// Update check-out minimum date when check-in changes
document.getElementById("checkin").addEventListener("change", function () {
  const checkinDate = new Date(this.value);
  checkinDate.setDate(checkinDate.getDate() + 1);
  const minCheckout = checkinDate.toISOString().split("T")[0];
  document.getElementById("checkout").setAttribute("min", minCheckout);
});

// Gallery lightbox effect (simple implementation)
galleryItems.forEach((item) => {
  item.addEventListener("click", function () {
    const img = this.querySelector("img");
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${img.src}" alt="${img.alt}">
            <button class="lightbox-close">&times;</button>
        </div>
    `;

    // Add lightbox styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
    `;

    const content = lightbox.querySelector(".lightbox-content");
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;

    const lightboxImg = lightbox.querySelector("img");
    lightboxImg.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
    `;

    const closeBtn = lightbox.querySelector(".lightbox-close");
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: -40px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    document.body.appendChild(lightbox);

    // Close lightbox handlers
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        document.body.removeChild(lightbox);
      }
    });

    closeBtn.addEventListener("click", function () {
      document.body.removeChild(lightbox);
    });

    // Close with Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.contains(lightbox)) {
        document.body.removeChild(lightbox);
      }
    });
  });
});

// Add hover effects to cards
document.querySelectorAll(".offer-card, .spa-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize carousel
  updateCarousel();

  // Initialize testimonials
  updateTestimonials();

  // Add loading animation
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// Add scroll-triggered animations for better UX
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2
    ) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const correspondingLink = document.querySelector(
        `.nav-link[href="#${section.id}"]`
      );
      if (correspondingLink) {
        correspondingLink.classList.add("active");
      }
    }
  });
});

// Add CSS for lightbox and other dynamic styles
const style = document.createElement("style");
style.textContent = `
.lightbox {
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.nav-link.active {
    color: var(--primary-color);
}

.nav-link.active::after {
    width: 100%;
}

.offer-card, .spa-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

@media (max-width: 768px) {
    .lightbox-content {
        margin: 20px;
    }
    
    .lightbox .lightbox-close {
        top: 10px;
        right: 10px;
    }
}
`;
document.head.appendChild(style);
