const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const sections   = $$(".section");
const navLinks   = $$(".nav-link");
const navMenu    = $(".nav-menu");
const menuToggle = $(".menu-toggle");
const logoBtn    = $(".logo");

function showSection(id) {
  sections.forEach(s => s.classList.toggle("active", s.id === id));
  navLinks.forEach(l => l.classList.toggle("active", l.dataset.target === id));
  history.replaceState(null, "", `#${id}`);
}

function initFromHash() {
  const hash  = location.hash.replace("#", "") || "accueil";
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

const floatingContact = $(".floating-contact-btn");
if (floatingContact) {
  floatingContact.addEventListener("click", e => {
    e.preventDefault();
    showSection("contact");
    navMenu.classList.remove("show");
  });
}

$$("[data-target]").forEach(el => {
  if (
    !el.classList.contains("nav-link") &&
    el !== logoBtn &&
    !el.classList.contains("floating-contact-btn")
  ) {
    el.addEventListener("click", e => {
      e.preventDefault();
      showSection(el.dataset.target);
      navMenu.classList.remove("show");
    });
  }
});

window.addEventListener("DOMContentLoaded", initFromHash);

const catBtns      = $$(".cat-btn");
const skillChips   = $$(".hskill");
const projectCards = $$(".project-card");

let activeCategory = "all";
let activeSkill    = "all";

function applyFilters() {
  projectCards.forEach(card => {
    const cat    = card.dataset.category;
    const skills = (card.dataset.skills || "").split(" ").filter(Boolean);

    const catMatch   = activeCategory === "all" || cat === activeCategory;
    const skillMatch = activeSkill === "all" || skills.includes(activeSkill);

    card.style.display = (catMatch && skillMatch) ? "flex" : "none";
  });
}

catBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    catBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.filter;

    activeSkill = "all";
    skillChips.forEach(c => c.classList.remove("active-skill"));
    skillChips[0]?.classList.add("active-skill");

    applyFilters();
  });
});

skillChips.forEach(chip => {
  chip.addEventListener("click", () => {
    skillChips.forEach(c => c.classList.remove("active-skill"));
    chip.classList.add("active-skill");
    activeSkill = chip.dataset.skillFilter;

    activeCategory = "all";
    catBtns.forEach(b => b.classList.remove("active"));
    catBtns[0]?.classList.add("active");

    applyFilters();
  });
});

const phrases     = ["Étudiante à Epitech", "Passionnée de cybersécurité", "À la recherche d'un stage"];
let phraseIndex   = 0;
const dynamicText = $("#dynamic-text");

function changeText() {
  if (!dynamicText) return;
  dynamicText.style.opacity = 0;
  setTimeout(() => {
    dynamicText.textContent = phrases[phraseIndex];
    dynamicText.style.opacity = 1;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }, 300);
}

changeText();
setInterval(changeText, 2500);

const themeToggle = $("#theme-toggle");
const body        = document.body;

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