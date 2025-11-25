// main.js

// ========= 0. Header Scrolling color change effect =========
function setupHeaderScrollEffect() {
  const header = document.querySelector("header");
  if (!header) return; // security denfense

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// ========= 1. date & OOP：works info =========

// Use a class to represent a work (OOP example)
class Project {
  constructor(title, type, image, link, description) {
    this.title = title;
    this.type = type;
    this.image = image;
    this.link = link;
    this.description = description;
  }
}


// Use an array to save your work data (separate data from code)
const projectsData = [
  new Project(
    "FIGHTBOYS",
    "FILM PRODUCTION",
    "images/图片3.png",
    "film.html",
    "A campus action film about self-discovery and fighting inner demons."
  ),
  new Project(
    "STARLIGHT",
    "DOCUMENTARY",
    "images/2.jpg",
    "documentary.html",
    "A micro-documentary following three fitness enthusiasts on their journeys."
  ),
  new Project(
    "SCARLET WITCH EDITING",
    "REELS EDITION",
    "images/1.jpg",
    "video editing.html",
    "A fan-made edit that reimagines Wanda Maximoff with dynamic rhythm and style."
  )
];


// ========= 2. Function: Render Home Page gallery =========

function renderHomeProjects() {
  const gallery = document.querySelector(".gallery");
  if (!gallery) return;

  gallery.innerHTML = "";

  projectsData.forEach((project) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <a href="${project.link}" class="card-link">
        <div class="card-image-wrapper">
          <img src="${project.image}" alt="${project.title}">
          <div class="card-overlay">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
          </div>
        </div>
        <p class="card-type">${project.type}</p>
      </a>
    `;

    gallery.appendChild(card);
  });
}


// ========= 3. Contact Page: Form Validation =========

function setupContactFormValidation() {
  // Only execute on the CONTACT page
  const form = document.querySelector("form");
  if (!form) return;

  // Create an error message container
  let errorBox = document.querySelector(".form-error");
  if (!errorBox) {
    errorBox = document.createElement("div");
    errorBox.className = "form-error";
    form.prepend(errorBox);
  }

  form.addEventListener("submit", (event) => {
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const messageInput = form.querySelector("textarea");

    const errors = [];

    if (!nameInput.value.trim()) {
      errors.push("Please enter your name.");
    }

    // Simple email format check
    const emailValue = emailInput.value.trim();
    if (!emailValue) {
      errors.push("Please enter your email.");
    } else if (!/^\S+@\S+\.\S+$/.test(emailValue)) {
      errors.push("Please enter a valid email address.");
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      errors.push("Your message should be at least 10 characters.");
    }

    if (errors.length > 0) {
      event.preventDefault(); // prevent form submission
      errorBox.innerHTML = errors.map((e) => `<p>${e}</p>`).join("");
      errorBox.style.display = "block";
    } else {
      // simply hint（refresh page when submitted）
      alert("Thank you! Your message has been sent.");
    }
  });
}

// ========= 4. button of back-to-top =========

function setupBackToTopButton() {
  const btn = document.createElement("button");
  btn.textContent = "↑ TOP";
  btn.id = "back-to-top";

  document.body.appendChild(btn);

  // initially hidden
  btn.style.display = "none";

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// ========= 6. Scroll Reveal animation =========
function setupScrollReveal() {
  // Select the elements that need a fade-in animation (you can add more as needed)
  const selectors = [
    ".gallery .card",          // main gallery cards
    ".about-text",             // About text block
    ".about-image",            // About imgage
    ".project-container",      // Film main container
    ".description-section",    // Film description on the right
    ".media-section",          // Film media area on the left
    ".doc-description",        // Documentary text card
    ".doc-top-image",
    ".doc-bottom-image",
    ".video-center",           // Documentary video area
    ".content-section",        // Video editing content area on the right
    ".video-section-edit"      // Video editing video area
  ];

  const elements = [];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add("reveal-on-scroll");
      elements.push(el);
    });
  });

  if (!("IntersectionObserver" in window) || elements.length === 0) {
    // Compatibility protection: If the observer is unavailable, display everything directly
    elements.forEach((el) => el.classList.add("reveal-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          obs.unobserve(entry.target); // Animate only once to avoid repeated flashing
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  elements.forEach((el) => observer.observe(el));
}

// ========= 7. automatically update footeryear =========
function setupFooterYear() {
  const yearSpan = document.getElementById("current-year");
  if (!yearSpan) return;
  yearSpan.textContent = new Date().getFullYear();
}


// ========= B. Initialize uniformly after the page has loaded =========

document.addEventListener("DOMContentLoaded", () => {
  renderHomeProjects();
  setupContactFormValidation();
  setupBackToTopButton();
  setupHeaderScrollEffect();
  setupScrollReveal();
  setupFooterYear();
});



