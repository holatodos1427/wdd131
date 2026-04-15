

const productGrid = document.getElementById("product-grid");
const comparisonTable = document.getElementById("comparison-table");
const filterButtons = document.querySelectorAll(".filter-btn");


const allProducts = [
  {
    id: 1,
    name: "iPhone 17",
    category: "iPhone",
    filter: "iphone",
    description: "A18 chip, 48 MP camera system, and all-day battery life.",
    price: "$799",
    img: "images/features/iPhone17normal.webp",
  },
  {
    id: 2,
    name: "iPhone 17 Pro",
    category: "iPhone",
    filter: "iphone",
    description: "Titanium design, A18 Pro chip, and 5× optical zoom camera.",
    price: "$999",
    img: "images/iphone17pro-blue.webp",
  },
  {
    id: 3,
    name: "iPhone 17 Pro Max",
    category: "iPhone",
    filter: "iphone",
    description: "The largest Pro display ever on an iPhone. Up to 33 hours of video playback.",
    price: "$1,199",
    img: "images/new-arrivals/iPhone17-1.webp",
  },
  {
    id: 4,
    name: "iPad Air M4",
    category: "iPad",
    filter: "ipad",
    description: "Powerful M4 chip with 11-inch Liquid Retina display and Apple Pencil support.",
    price: "$799",
    img: "images/features/ipad-1.webp",
  },
  {
    id: 5,
    name: "iPad Pro M4",
    category: "iPad",
    filter: "ipad",
    description: "Ultra-thin OLED Liquid Retina XDR display and the blazing-fast M4 chip.",
    price: "$999",
    img: "images/features/ipad-1.webp",
  },
  {
    id: 6,
    name: "iPad mini",
    category: "iPad",
    filter: "ipad",
    description: "Powerful and portable. The most affordable way to enjoy iPad.",
    price: "$499",
    img: "images/ipad-mini.webp",
  },
  {
    id: 7,
    name: "MacBook Air 13″ M5",
    category: "Mac",
    filter: "mac",
    description: "Fanless design, all-day battery, and the M5 chip. Perfect for students.",
    price: "$1,099",
    img: "images/new-arrivals/macbooc-air.webp",
  },
  {
    id: 8,
    name: "MacBook Air 15″ M5",
    category: "Mac",
    filter: "mac",
    description: "Everything in the 13-inch model with a larger Liquid Retina display.",
    price: "$1,299",
    img: "images/new-arrivals/macbooc-air.webp",
  },
  {
    id: 9,
    name: "MacBook Pro 14″ M5",
    category: "Mac",
    filter: "mac",
    description: "Pro-level M5 performance with mini-LED display and advanced connectivity.",
    price: "$1,599",
    img: "images/new-arrivals/macbookpro13.webp",
  },
  {
    id: 10,
    name: "Apple Watch SE",
    category: "Apple Watch",
    filter: "watch",
    description: "Essential smartwatch features: crash detection, fitness tracking, swimproof.",
    price: "$249",
    img: "images/features/applewatchse.webp",
  },
  {
    id: 11,
    name: "Apple Watch Series 11",
    category: "Apple Watch",
    filter: "watch",
    description: "The thinnest Apple Watch ever with a wider, brighter display.",
    price: "$399",
    img: "images/new-arrivals/applewatchseries11.webp",
  },
  {
    id:12,
    name: "Apple Watch Ultra 3",
    category: "Apple Watch",
    filter: "watch",
    description: "Built for extreme adventures. Titanium case and 60-hour battery life.",
    price: "$799",
    img: "images/apple-watch.webp",
  },
];



const macbookComparison = [
  {
    model: "MacBook Air 13″ M5",
    chip:  "Apple M5",
    ram: "8 GB",
    storage: "256 GB SSD",
    battery: "Up to 18 h",
    price: "$1,099",
    bestFor: "Best for most students",
    recommended: true,
  },
  {
    model: "MacBook Air 15″ M5",
    chip: "Apple M5",
    ram: "8 GB",
    storage: "256 GB SSD",
    battery: "Up to 18 h",
    price: "$1,299",
    bestFor: "Students who prefer a larger screen",
    recommended: false,
  },
  {
    model: "MacBook Pro 14″ M5",
    chip: "Apple M5",
    ram: "16 GB",
    storage: "512 GB SSD",
    battery: "Up to 24 h",
    price: "$1,599",
    bestFor: "Video editing and heavy workloads",
    recommended: false,
  },
];



function renderProducts(filter) {
  if (!productGrid) return;

  const filtered = filter === "all"
    ? allProducts
    : allProducts.filter((product) => product.filter === filter);

  if (filtered.length === 0) {
    productGrid.innerHTML = `
      <p class="empty-state">No products found for this category.</p>
    `;
    return;
  }

  productGrid.innerHTML = filtered
    .map((product) => `
      <article class="product-card" data-filter="${product.filter}">
        <div class="product-card-img">
          <img src="${product.img}" alt="${product.name}">
          <button class="quick-btn" aria-label="Quick view ${product.name}">Quick View</button>
        </div>
        <div class="product-card-body">
          <span class="product-category">${product.category}</span>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-desc">${product.description}</p>
          <span class="product-price">${product.price}</span>
        </div>
      </article>
    `)
    .join("");
}



function renderComparisonTable() {
  if (!comparisonTable) return;

  const columnHeaders = ["Model", "Chip", "RAM", "Storage", "Battery", "Price", "Best For"];
  const dataKeys      = ["model", "chip", "ram", "storage", "battery", "price", "bestFor"];

  comparisonTable.innerHTML = `
    <table class="comparison-table">
      <thead>
        <tr>
          ${columnHeaders.map((header) => `<th>${header}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${macbookComparison
          .map((row) => `
            <tr class="${row.recommended ? "recommended" : ""}">
              <td>
                ${row.model}
                ${row.recommended ? `<span class="recommended-badge">Recommended</span>` : ""}
              </td>
              ${dataKeys.slice(1).map((key) => `<td>${row[key]}</td>`).join("")}
            </tr>
          `)
          .join("")}
      </tbody>
    </table>
  `;
}


function initFilterButtons(activeFilter) {
  if (!filterButtons.length) return;

  filterButtons.forEach((btn) => {
    if (btn.dataset.filter === activeFilter) {
      btn.classList.add("filter-btn--active");
    } else {
      btn.classList.remove("filter-btn--active");
    }
  });

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedFilter = btn.dataset.filter;

      filterButtons.forEach((b) => b.classList.remove("filter-btn--active"));
      btn.classList.add("filter-btn--active");

      localStorage.setItem("icamba_filter", selectedFilter);

      renderProducts(selectedFilter);
    });
  });
}

function getFilterFromURL() {
  const params        = new URLSearchParams(window.location.search);
  const urlFilter     = params.get("filter");
  const storedFilter  = localStorage.getItem("icamba_filter");

  if (urlFilter) {
    localStorage.setItem("icamba_filter", urlFilter);
    return urlFilter;
  }

  return storedFilter || "all";
}


const initialFilter = getFilterFromURL();

renderProducts(initialFilter);
renderComparisonTable();
initFilterButtons(initialFilter);
