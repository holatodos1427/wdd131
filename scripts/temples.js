
const currentYear = document.getElementById("currentyear");
const lastMod = document.getElementById("banana");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastMod) {
    lastMod.textContent = "Last Modification: " + document.lastModified;
}

const hamburger = document.getElementById("hamburger");
const mainNav   = document.getElementById("main-nav");

if (hamburger && mainNav) {
    hamburger.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");

        hamburger.innerHTML = isOpen ? "✕" : "☰";
        hamburger.setAttribute("aria-expanded", isOpen.toString());
    });

    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
            hamburger.innerHTML = "☰";
            hamburger.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("click", (e) => {
        const header = document.querySelector("header");
        if (header && !header.contains(e.target)) {
            mainNav.classList.remove("open");
            hamburger.innerHTML = "☰";
            hamburger.setAttribute("aria-expanded", "false");
        }
    });
}