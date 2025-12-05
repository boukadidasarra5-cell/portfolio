// Helpers
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const sections = $$(".section");
const navLinks = $$(".nav-link");
const navMenu = $(".nav-menu");
const menuToggle = $(".menu-toggle");
const logoBtn = $(".logo");

// Navigation: show section + active state + update hash
function showSection(id) {
  sections.forEach(s => s.classList.toggle("active", s.id === id));
  navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("data-target") === id));
  history.replaceState(null, "", `#${id}`);
}

// Init from URL hash
function initFromHash() {
  const hash = location.hash.replace("#", "") || "accueil";
  const exists = sections.some(s => s.id === hash);
  showSection(exists ? hash : "accueil");
}

// Click on nav links
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.getAttribute("data-target");
    showSection(target);
    navMenu.classList.remove("show"); // close mobile menu
  });
});

// Logo returns home
logoBtn.addEventListener("click", () => showSection("accueil"));

// Mobile menu toggle
menuToggle.addEventListener("click", () => navMenu.classList.toggle("show"));

// Enable any element with data-target (if needed later)
$$("[data-target]").forEach(el => {
  if (!el.classList.contains("nav-link") && el !== logoBtn) {
    el.addEventListener("click", (e) => {
      const target = el.getAttribute("data-target");
      if (target) {
        e.preventDefault();
        showSection(target);
        navMenu.classList.remove("show");
      }
    });
  }
});

// Initialize
window.addEventListener("DOMContentLoaded", initFromHash);
