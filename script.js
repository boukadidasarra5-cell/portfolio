const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const sections = $$(".section");
const navLinks = $$(".nav-link");
const navMenu = $(".nav-menu");
const menuToggle = $(".menu-toggle");
const logoBtn = $(".logo");

function showSection(id) {
  sections.forEach(s => s.classList.toggle("active", s.id === id));
  navLinks.forEach(l => l.classList.toggle("active", l.dataset.target === id));
  history.replaceState(null, "", `#${id}`);
}

function initFromHash() {
  const hash = location.hash.replace("#", "") || "accueil";
  const valid = sections.some(s => s.id === hash);
  showSection(valid ? hash : "accueil");
}

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    showSection(link.dataset.target);
    navMenu.classList.remove("show");
  });
});

logoBtn.addEventListener("click", () => showSection("accueil"));
menuToggle.addEventListener("click", () => navMenu.classList.toggle("show"));

$$("[data-target]").forEach(el => {
  if (!el.classList.contains("nav-link") && el !== logoBtn) {
    el.addEventListener("click", e => {
      e.preventDefault();
      showSection(el.dataset.target);
      navMenu.classList.remove("show");
    });
  }
});

window.addEventListener("DOMContentLoaded", initFromHash);

const filterButtons = $$(".filter-btn");
const projectCards = $$(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const category = card.dataset.category;
      card.style.display = (filter === "all" || category === filter) ? "flex" : "none";
    });
  });
});

const phrases = [
  "Étudiante à Epitech",
  "Passionnée de cybersécurité",
  "À la recherche d'un stage"
];

let index = 0;
const dynamicText = $("#dynamic-text");

function changeText() {
  if (!dynamicText) return;
  dynamicText.style.opacity = 0;

  setTimeout(() => {
    dynamicText.textContent = phrases[index];
    dynamicText.style.opacity = 1;
    index = (index + 1) % phrases.length;
  }, 300);
}

changeText();
setInterval(changeText, 2500);
const themeToggle = $("#theme-toggle");
const body = document.body;
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");

  const isLight = body.classList.contains("light-mode");
  themeToggle.innerHTML = isLight
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';

  localStorage.setItem("theme", isLight ? "light" : "dark");
});
