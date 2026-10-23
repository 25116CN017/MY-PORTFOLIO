
/* ==============================
   1. MOBILE NAVIGATION
============================== */

const navbar = document.querySelector(".navbar");
const navLinks = document.querySelector(".nav-links");

// Create mobile menu button
const menuButton = document.createElement("button");

menuButton.className = "menu-toggle";
menuButton.type = "button";
menuButton.setAttribute("aria-label", "Open navigation menu");
menuButton.setAttribute("aria-expanded", "false");
menuButton.innerHTML = "☰";

navbar.insertBefore(menuButton, navLinks);

menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("nav-open");

    menuButton.innerHTML = isOpen ? "✕" : "☰";
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Close menu when a navigation link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("nav-open");
        menuButton.innerHTML = "☰";
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
    });
});


/* ==============================
   2. ACTIVE NAVIGATION LINK
============================== */

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

function updateActiveLink() {
    let currentSection = "home";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }
    });

    navigationLinks.forEach((link) => {
        const isActive =
            link.getAttribute("href") === `#${currentSection}`;

        link.classList.toggle("active", isActive);
    });
}

window.addEventListener("scroll", updateActiveLink, {
    passive: true
});

updateActiveLink();


/* ==============================
   3. SCROLL REVEAL ANIMATIONS
============================== */

const revealElements = document.querySelectorAll(
    ".section-label, .section h2, .section-description, " +
    ".skill-card, .project-card"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


/* ==============================
   4. FOOTER YEAR
============================== */

const footerText = document.querySelector(".footer-content p");

if (footerText) {
    footerText.textContent =
        `Designed & built with care © ${new Date().getFullYear()}`;
}


/* ==============================
   5. PROJECT CARD INTERACTION
============================== */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.style.setProperty("--hovered", "1");
    });

    card.addEventListener("mouseleave", () => {
        card.style.removeProperty("--hovered");
    });
});
