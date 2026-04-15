

const navToggle   = document.querySelector(".nav-toggle");
const navLinks    = document.getElementById("nav-links");
const currentYear = document.getElementById("current-year");
const newsletterForm = document.getElementById("newsletter-form");



function setFooterYear() {
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
}


function initNavToggle() {
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close nav when a link is clicked (mobile)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}


function initNewsletterForm() {
  if (!newsletterForm) return;

  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailInput = newsletterForm.querySelector("input[type='email']");
    const emailValue = emailInput.value.trim();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

    if (!isValidEmail) {
      emailInput.style.borderColor = "#d93025";
      return;
    }
    const subscribers = JSON.parse(localStorage.getItem("icamba_subscribers") || "[]");

    if (!subscribers.includes(emailValue)) {
      subscribers.push(emailValue);
      localStorage.setItem("icamba_subscribers", JSON.stringify(subscribers));
    }

    emailInput.style.borderColor = "#34a853";
    emailInput.value = "";
    emailInput.placeholder = "Thanks for subscribing!";

    setTimeout(() => {
      emailInput.placeholder = "Email address";
      emailInput.style.borderColor = "";
    }, 3000);
  });
}



setFooterYear();
initNavToggle();
initNewsletterForm();
