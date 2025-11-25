// main.js

// ========= 0. Header 滚动变色效果 =========
function setupHeaderScrollEffect() {
  const header = document.querySelector("header");
  if (!header) return; // 安全防护

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// ========= 1. 数据 & OOP：作品信息 =========

// 用一个类来表示作品（OOP 示例）
class Project {
  constructor(title, type, image, link, description) {
    this.title = title;
    this.type = type;
    this.image = image;
    this.link = link;
    this.description = description;
  }
}


// 用数组保存你的作品数据（数据与代码分离）
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


// ========= 2. 函数：渲染首页 gallery =========

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


// ========= 3. Contact 页面：表单验证 =========

function setupContactFormValidation() {
  // 只在 CONTACT 页面执行
  const form = document.querySelector("form");
  if (!form) return;

  // 创建错误信息容器
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

    // 简单 email 格式检测
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
      event.preventDefault(); // 阻止真正提交
      errorBox.innerHTML = errors.map((e) => `<p>${e}</p>`).join("");
      errorBox.style.display = "block";
    } else {
      // 简单提示一下（实际提交会刷新页面）
      alert("Thank you! Your message has been sent.");
    }
  });
}

// ========= 4. 回到顶部按钮 =========

function setupBackToTopButton() {
  const btn = document.createElement("button");
  btn.textContent = "↑ TOP";
  btn.id = "back-to-top";

  document.body.appendChild(btn);

  // 初始隐藏
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

// ========= 5. 页面加载完后统一初始化 =========

document.addEventListener("DOMContentLoaded", () => {
  renderHomeProjects();
  setupContactFormValidation();
  setupBackToTopButton();
  setupHeaderScrollEffect();
});

