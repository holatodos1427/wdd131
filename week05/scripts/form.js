const productSelect = document.getElementById("product-name");
const selectWrapper = document.querySelector(".select-wrapper");
const ratingRadios  = document.querySelectorAll('input[name="rating"]');
const ratingHint    = document.getElementById("rating-hint");
const currentyear = document.getElementById("currentyear");

const products = [
  { id: "fc-1888", name: "Flux Capacitor", averageRating: 4.5 },
  { id: "fc-2050", name: "Power Laces", averageRating: 4.7 },
  { id: "fs-1987", name: "Time Circuits", averageRating: 3.5 },
  { id: "ac-2000", name: "Low Voltage Reactor", averageRating: 3.9 },
  { id: "jj-1969", name: "Warp Equalizer", averageRating: 5.0 },
];

const ratingLabels = {
  "1": "1 star — Poor",
  "2": "2 stars — Fair",
  "3": "3 stars — Good",
  "4": "4 stars — Great",
  "5": "5 stars — Outstanding",
};

function populateProductSelect() {
  if (!productSelect) return;

  products.forEach(({ id, name, averageRating }) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = name;
    option.dataset.averageRating = averageRating;
    productSelect.appendChild(option);
  });

  productSelect.addEventListener("change", () => {
    const selected = productSelect.options[productSelect.selectedIndex];
    showAverageRating(selected.dataset.averageRating, selected.textContent);
  });
}

function showAverageRating(rating, productName) {
  if (!selectWrapper) return;

  let productRatingHint = document.getElementById("product-rating-hint");

  if (!productRatingHint) {
    productRatingHint = document.createElement("p");
    productRatingHint.id = "product-rating-hint";
    productRatingHint.className = "rating-hint";
    selectWrapper.insertAdjacentElement("afterend", productRatingHint);
  }

  const rounded = Math.round(rating);
  const stars   = "★".repeat(rounded) + "☆".repeat(5 - rounded);
  productRatingHint.textContent = `Community rating for ${productName}: ${stars} (${rating} / 5)`;
}

function initStarRatingHint() {
  if (!ratingHint) return;

  ratingRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      ratingHint.textContent = ratingLabels[radio.value] ?? "";
    });
  });
}
currentyear.textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
  populateProductSelect();
  initStarRatingHint();
  setFooterYear();
});