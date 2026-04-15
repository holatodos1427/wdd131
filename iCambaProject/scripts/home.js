

const featuredGrid = document.getElementById("featured-grid");
const arrivalsGrid = document.getElementById("arrivals-grid");
const countdownMins = document.getElementById("countdown-mins");
const countdownSecs = document.getElementById("countdown-secs");
const categoryChips = document.querySelectorAll(".chip");


const featuredProducts = [
  {
    id: 1,
    name: "iPhone 17",
    category: "iPhone",
    description: "A19 chip, 48 MP camera system, and all-day battery life.",
    price: "$799",
    originalPrice: "$899",
    sold: 72,
    filter: "iphone",
    img: "images/features/iPhone17normal.webp",
  },
  {
    id: 2,
    name: "MacBook Air 13″ M5",
    category: "Mac",
    description: "Fanless, ultralight, and perfect for students.",
    price: "$1,099",
    originalPrice: "$1,199",
    sold: 58,
    filter: "mac",
    img: "images/features/macbookair.webp",
  },
  {
    id: 3,
    name: "iPad Air M4",
    category: "iPad",
    description: "Powerful M4 chip with 11-inch Liquid Retina display.",
    price: "$599",
    originalPrice: "$699",
    sold: 45,
    filter: "ipad",
    img: "images/features/ipad-1.webp",
  },
  {
    id: 4,
    name: "Apple Watch SE",
    category: "Watch",
    description: "Crash detection, fitness tracking, and swimproof design.",
    price: "$249",
    originalPrice: "$299",
    sold: 83,
    filter: "watch",
    img: "images/features/applewatchse.webp",
  },
];


const newArrivals = [
  {
    id: 5,
    name: "iPhone 17 Pro",
    category: "iPhone",
    description: "Titanium design, A18 Pro chip, and 5x optical zoom.",
    price: "$999",
    filter: "iphone",
    img: "images/new-arrivals/iPhone17-1.webp",
  },
  {
    id: 6,
    name: "MacBook Pro 14″ M5",
    category: "Mac",
    description: "Pro-level performance with mini-LED display.",
    price: "$1,599",
    filter: "mac",
    img: "images/new-arrivals/macbookpro13.webp",
  },
  {
    id: 7,
    name: "iPad Pro M5",
    category: "iPad",
    description: "Ultra-thin OLED display and incredible M4 performance.",
    price: "$999",
    filter: "ipad",
    img: "images/features/ipad-1.webp",
  },
  {
    id: 8,
    name: "Apple Watch Series 11",
    category: "Watch",
    description: "Thinnest Apple Watch ever with advanced health features.",
    price: "$399",
    filter: "watch",
    img: "images/new-arrivals/applewatchseries11.webp",
  },
];


function renderFeaturedProducts() {
  if (!featuredGrid) return;

  featuredGrid.innerHTML = featuredProducts
    .map((product) => `
      <article class="product-card">
        <div class="product-card-img">
          <img src="${product.img}" alt="${product.name}">
        <div class="product-card-body">
          <span class="product-category">${product.category}</span>
          <h3 class="product-name">${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-price-row">
            <span class="price-current">${product.price}</span>
            <span class="price-original">${product.originalPrice}</span>
          </div>
          <div class="sold-bar" role="progressbar"
               aria-valuenow="${product.sold}"
               aria-valuemin="0"
               aria-valuemax="100"
               aria-label="${product.sold}% sold">
            <div class="sold-bar-fill" style="width: ${product.sold}%"></div>
          </div>
          <p class="sold-label">${product.sold}% Sold</p>
        </div>
      </article>
    `)
    .join("");
}


function renderNewArrivals() {
  if (!arrivalsGrid) return;

  arrivalsGrid.innerHTML = newArrivals
    .map((product) => `
      <article class="product-card arrival-card">
        <div class="product-card-img">
          <img src="${product.img}" alt="${product.name}">
        <div class="product-card-body">
          <span class="product-category">${product.category}</span>
          <h3 class="product-name">${product.name}</h3>
          <p>${product.description}</p>
          <span class="price-current">${product.price}</span>
        </div>
      </article>
    `)
    .join("");
}



function initCategoryChips() {
  if (!categoryChips.length) return;

  categoryChips.forEach((chip) => {
    chip.addEventListener("click", () => {

      categoryChips.forEach((c) => c.classList.remove("chip--active"));
      chip.classList.add("chip--active");

      const filter = chip.dataset.filter;
      localStorage.setItem("icamba_filter", filter);

      if (filter !== "all") {
        window.location.href = `products.html?filter=${filter}`;
      }
    });
  });
}



renderFeaturedProducts();
renderNewArrivals();
startCountdown();
initCategoryChips();
