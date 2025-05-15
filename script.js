document.addEventListener("DOMContentLoaded", () => {
  // Initialize GSAP
  gsap.registerPlugin(ScrollTrigger)

  // Initialize ScrollReveal
  const sr = ScrollReveal({
    origin: "bottom",
    distance: "50px",
    duration: 1000,
    delay: 200,
    easing: "cubic-bezier(0.5, 0, 0, 1)",
    reset: false,
  })

  // Custom Cursor
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
    })

    gsap.to(cursorFollower, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
    })
  })

  // Cursor hover effect for links and buttons
  const links = document.querySelectorAll("a, button, .slider-arrow, .dot")

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorFollower.style.backgroundColor = "rgba(125, 91, 166, 0.1)"
      cursorFollower.style.borderColor = "transparent"
    })

    link.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.backgroundColor = "transparent"
      cursorFollower.style.borderColor = "var(--primary)"
    })
  })

  // Page Loader
  setTimeout(() => {
    gsap.to(".loader", {
      opacity: 0,
      duration: 0.8,
      onComplete: () => {
        document.querySelector(".loader").style.display = "none"
        document.body.style.overflow = "visible"

        // Animate hero elements after loader is gone
        animateHero()
      },
    })
  }, 2000)

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")

  menuToggle.addEventListener("click", function () {
    this.classList.toggle("active")
    mobileMenu.classList.toggle("active")

    if (mobileMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "visible"
    }
  })

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll(".mobile-nav-link")

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      mobileMenu.classList.remove("active")
      document.body.style.overflow = "visible"
    })
  })

  // Navbar scroll effect
  const navbar = document.querySelector(".main-nav")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Hero Animations
  function animateHero() {
    // Split text animation
    const heroTitle = document.querySelector(".hero h1")
    const heroText = heroTitle.textContent
    heroTitle.innerHTML = ""

    for (let i = 0; i < heroText.length; i++) {
      const span = document.createElement("span")
      span.textContent = heroText[i] === " " ? "\u00A0" : heroText[i]
      span.style.opacity = "0"
      span.style.display = "inline-block"
      span.style.transform = "translateY(20px)"
      heroTitle.appendChild(span)
    }

    gsap.to(".hero h1 span", {
      opacity: 1,
      y: 0,
      stagger: 0.03,
      delay: 0.5,
      ease: "power3.out",
      duration: 0.8,
    })

    // Other hero elements
    gsap.to(".hero-description", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 1.2,
    })

    gsap.to(".hero-buttons", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 1.4,
    })

    gsap.to(".hero-stats", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 1.6,
    })

    gsap.to(".scroll-indicator", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 2,
    })
  }

  // Parallax effect for hero background
  gsap.to(".hero-image", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
    y: "20%",
    scale: 1,
    ease: "none",
  })

  // Reveal animations for sections
  sr.reveal(".section-subtitle", { delay: 100 })
  sr.reveal(".section-title", { delay: 200 })
  sr.reveal(".section-description", { delay: 300 })

  // About section animations
  sr.reveal(".about-image", {
    origin: "left",
    distance: "100px",
    delay: 200,
  })

  sr.reveal(".experience-badge", {
    origin: "right",
    distance: "50px",
    delay: 500,
  })

  sr.reveal(".feature", {
    interval: 200,
  })

  // Treatment cards animation
  gsap.utils.toArray(".treatment-card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: "power3.out",
    })
  })

  // Approach steps animation
  gsap.utils.toArray(".step").forEach((step, i) => {
    gsap.from(step, {
      scrollTrigger: {
        trigger: step,
        start: "top 80%",
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.2,
      ease: "power3.out",
    })
  })

  // Testimonial slider
  const testimonialTrack = document.querySelector(".testimonial-track")
  const testimonialCards = document.querySelectorAll(".testimonial-card")
  const prevBtn = document.querySelector(".slider-arrow.prev")
  const nextBtn = document.querySelector(".slider-arrow.next")
  const dots = document.querySelectorAll(".dot")

  let currentIndex = 0
  const cardWidth = testimonialCards[0].offsetWidth
  const gap = 32 // 2rem gap

  function updateSlider() {
    const translateX = -(currentIndex * (cardWidth + gap))
    testimonialTrack.style.transform = `translateX(${translateX}px)`

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex)
    })
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex < testimonialCards.length - 1) {
      currentIndex++
      updateSlider()
    }
  })

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--
      updateSlider()
    }
  })

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentIndex = i
      updateSlider()
    })
  })

  // Responsive slider adjustment
  window.addEventListener("resize", updateSlider)

  // Contact form animation
  sr.reveal(".contact-form", {
    origin: "right",
    distance: "100px",
  })

  sr.reveal(".contact-item", {
    interval: 200,
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        })
      }
    })
  })

  // Form submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      submitBtn.disabled = true
      submitBtn.textContent = "Sending..."

      setTimeout(() => {
        // Reset form
        contactForm.reset()

        // Show success message
        const successMessage = document.createElement("div")
        successMessage.className = "success-message"
        successMessage.textContent = "Your message has been sent successfully!"
        successMessage.style.color = "green"
        successMessage.style.marginTop = "1rem"

        contactForm.appendChild(successMessage)

        submitBtn.textContent = originalText
        submitBtn.disabled = false

        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove()
        }, 5000)
      }, 2000)
    })
  }

  // Initialize animations for elements that are already in view
  ScrollTrigger.refresh()
})
