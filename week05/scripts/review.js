
const reviewCountBadge  = document.getElementById("review-count-badge");
const footerYear        = document.getElementById("footer-year");
const STORAGE_KEY = "reviewCount";


function incrementReviewCount() {
  const current = parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0;
  const updated = current + 1;
  localStorage.setItem(STORAGE_KEY, updated);
  return updated;
}

function renderReviewBadge(count) {
  if (!reviewCountBadge) return;

  const label = count === 1 ? "review submitted" : "reviews submitted";
  reviewCountBadge.textContent = `${count} ${label} total`;
}

function setFooterYear() {
  if (footerYear) footerYear.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  const count = incrementReviewCount();
  renderReviewBadge(count);
  setFooterYear();
});