// ── Footer ───────────────────────────────────────────────
const currentYear = document.getElementById("currentyear");
const lastMod     = document.getElementById("banana");

if (currentYear) currentYear.textContent = new Date().getFullYear();
if (lastMod)     lastMod.textContent = "Last Modification: " + document.lastModified;

// ── Hamburger ────────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const mainNav   = document.getElementById("main-nav");

function closeMenu() {
    mainNav.classList.remove("open");
    hamburger.innerHTML = "☰";
    hamburger.setAttribute("aria-expanded", "false");
}

if (hamburger && mainNav) {
    hamburger.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");
        hamburger.innerHTML = isOpen ? "✕" : "☰";
        hamburger.setAttribute("aria-expanded", isOpen.toString());
    });

    document.addEventListener("click", (e) => {
        if (!document.querySelector("header").contains(e.target)) closeMenu();
    });
}

// ── Temple Data ──────────────────────────────────────────
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // Three additional temples
    {
        templeName: "Salt Lake",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
    },
    {
        templeName: "São Paulo Brazil",
        location: "São Paulo, Brazil",
        dedicated: "1978, October, 30",
        area: 59246,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/_temp/017-S%C3%A3o-Paulo-Brazil-Temple.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 40000,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg"
    }
];

// ── Card Builder ─────────────────────────────────────────
function createTempleCard(temple) {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src     = temple.imageUrl;
    img.alt     = temple.templeName + " Temple";
    img.loading = "lazy";

    const caption = document.createElement("figcaption");

    // Each detail line
    const details = [
        { label: "Temple",     value: temple.templeName },
        { label: "Location",   value: temple.location },
        { label: "Dedicated",  value: temple.dedicated },
        { label: "Area",       value: temple.area.toLocaleString() + " sq ft" }
    ];

    details.forEach(({ label, value }) => {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${label}:</strong> ${value}`;
        caption.appendChild(p);
    });

    figure.appendChild(img);
    figure.appendChild(caption);
    return figure;
}

// ── Render ───────────────────────────────────────────────
function displayTemples(filter = "home") {
    const gallery = document.getElementById("gallery");
    const heading = document.getElementById("filter-heading");

    // Update the h1 to match the active filter (capitalize first letter)
    heading.textContent = filter.charAt(0).toUpperCase() + filter.slice(1);

    // Determine which temples to show
    let filtered;
    switch (filter) {
        case "old":
            filtered = temples.filter(t => parseInt(t.dedicated) < 1900);
            break;
        case "new":
            filtered = temples.filter(t => parseInt(t.dedicated) > 2000);
            break;
        case "large":
            filtered = temples.filter(t => t.area > 90000);
            break;
        case "small":
            filtered = temples.filter(t => t.area < 10000);
            break;
        default: // "home"
            filtered = temples;
    }

    // Clear and repopulate gallery
    gallery.innerHTML = "";
    filtered.forEach(temple => gallery.appendChild(createTempleCard(temple)));
}

// ── Nav Listeners ─────────────────────────────────────────
document.querySelectorAll("#main-nav a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const filter = link.dataset.filter;
        displayTemples(filter);
        closeMenu();
    });
});

// ── Initial Render ────────────────────────────────────────
displayTemples("home");
