

const contactForm = document.getElementById("contact-form");
const formFeedback = document.getElementById("form-feedback");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const topicSelect = document.getElementById("topic");
const messageInput = document.getElementById("message");
const newsletterBox = document.getElementById("newsletter");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");
const messageHistory = document.getElementById("message-history");
const clearBtn = document.getElementById("clear-btn");

const STORAGE_KEY = "icamba_messages";


function isMinLength(value, min) {
  return value.trim().length >= min;
}
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function showFieldError(inputEl, errorEl, message) {
  inputEl.setAttribute("aria-invalid", "true");
  errorEl.textContent = message;
}
function clearFieldError(inputEl, errorEl) {
  inputEl.removeAttribute("aria-invalid");
  errorEl.textContent = "";
}


function validateForm() {
  let isValid = true;

  if (!isMinLength(nameInput.value, 2)) {
    showFieldError(nameInput, nameError, "Please enter your full name (at least 2 characters).");
    isValid = false;
  } else {
    clearFieldError(nameInput, nameError);
  }

  if (!isValidEmail(emailInput.value)) {
    showFieldError(emailInput, emailError, "Please enter a valid email address.");
    isValid = false;
  } else {
    clearFieldError(emailInput, emailError);
  }

  if (!isMinLength(messageInput.value, 10)) {
    showFieldError(messageInput, messageError, "Please write a message (at least 10 characters).");
    isValid = false;
  } else {
    clearFieldError(messageInput, messageError);
  }

  return isValid;
}



function showFeedback(type, text) {
  formFeedback.textContent = text;
  formFeedback.className   = `feedback--${type}`;
}

function hideFeedback() {
  formFeedback.className   = "";
  formFeedback.textContent = "";
}



function saveMessage(entry) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  existing.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}


function buildMessageCard(entry) {
  const topicLabel = entry.topic
    ? entry.topic.replace(/-/g, " ")
    : "General";

  return `
    <div class="msg-card">
      <div class="msg-meta">
        <span class="msg-name">${entry.name}</span>
        <span class="msg-date">${entry.timestamp}</span>
      </div>
      <span class="msg-topic">${topicLabel}</span>
      <p class="msg-text">${entry.message}</p>
    </div>
  `;
}



function loadMessageHistory() {
  if (!messageHistory) return;

  const messages = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  if (messages.length === 0) {
    messageHistory.innerHTML = `<p class="msg-empty">No messages submitted yet.</p>`;
    if (clearBtn) clearBtn.style.display = "none";
    return;
  }

  messageHistory.innerHTML = messages.map(buildMessageCard).join("");

  if (clearBtn) clearBtn.style.display = "inline-block";
}



function handleFormSubmit(event) {
  event.preventDefault();
  hideFeedback();

  const formIsValid = validateForm();

  if (!formIsValid) {
    showFeedback("error", "Please correct the errors above before submitting.");
    return;
  }

  const entry = {
    id:        Date.now(),
    name:      nameInput.value.trim(),
    email:     emailInput.value.trim(),
    topic:     topicSelect.value,
    message:   messageInput.value.trim(),
    timestamp: new Date().toLocaleString("en-US", {
      year:   "numeric",
      month:  "short",
      day:    "numeric",
      hour:   "2-digit",
      minute: "2-digit",
    }),
  }

  if (newsletterBox && newsletterBox.checked) {
    const subscribers = JSON.parse(localStorage.getItem("icamba_subscribers") || "[]");
    if (!subscribers.includes(entry.email)) {
      subscribers.push(entry.email);
      localStorage.setItem("icamba_subscribers", JSON.stringify(subscribers));
    }
  }

  saveMessage(entry);
  loadMessageHistory();

  showFeedback("success", `Thank you, ${entry.name}! Your message has been received.`);
  contactForm.reset();

  contactForm.scrollIntoView({ behavior: "smooth", block: "start" });
}



function handleClearHistory() {
  localStorage.removeItem(STORAGE_KEY);
  loadMessageHistory();
}


function initContactPage() {
  if (!contactForm) return;

  contactForm.addEventListener("submit", handleFormSubmit);

  if (clearBtn) {
    clearBtn.addEventListener("click", handleClearHistory);
  }

  loadMessageHistory();
}


initContactPage();
