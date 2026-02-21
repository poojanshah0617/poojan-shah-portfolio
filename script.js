// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Accordion (accessible + animated)
const accButtons = document.querySelectorAll(".acc-btn");

accButtons.forEach((btn, idx) => {
  const panel = btn.nextElementSibling;
  if (!panel) return;

  // Add IDs for aria-controls
  const panelId = panel.id || `acc-panel-${idx}`;
  panel.id = panelId;
  btn.setAttribute("aria-controls", panelId);

  // Default state
  btn.setAttribute("aria-expanded", "false");
  panel.style.display = "none";

  const icon = btn.querySelector(".acc-icon");

  const closePanel = () => {
    btn.setAttribute("aria-expanded", "false");
    if (icon) icon.textContent = "+";
    panel.style.display = "none";
    panel.style.height = "";
  };

  const openPanel = () => {
    btn.setAttribute("aria-expanded", "true");
    if (icon) icon.textContent = "–";

    panel.style.display = "block";
    panel.style.height = "0px";
    const target = panel.scrollHeight;

    requestAnimationFrame(() => {
      panel.style.transition = "height 180ms ease";
      panel.style.height = `${target}px`;
    });

    panel.addEventListener(
      "transitionend",
      () => {
        panel.style.transition = "";
        panel.style.height = "";
      },
      { once: true }
    );
  };

  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    expanded ? closePanel() : openPanel();
  });

  // Keyboard support
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      btn.click();
    }
  });
});

// Active nav highlighting on scroll
const navLinks = Array.from(document.querySelectorAll(".nav a"))
  .filter(a => a.getAttribute("href")?.startsWith("#"));

const sections = navLinks
  .map(a => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

if (navLinks.length && sections.length) {
  const setActive = () => {
    const scrollY = window.scrollY + 120; // offset for sticky nav
    let activeIndex = 0;

    sections.forEach((sec, i) => {
      if (sec.offsetTop <= scrollY) activeIndex = i;
    });

    navLinks.forEach((a, i) => {
      if (i === activeIndex) a.classList.add("active");
      else a.classList.remove("active");
    });
  };

  setActive();
  window.addEventListener("scroll", setActive, { passive: true });
}