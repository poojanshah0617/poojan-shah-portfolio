document.getElementById("year").textContent = new Date().getFullYear();

const buttons = document.querySelectorAll(".acc-btn");
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!expanded));

    const panel = btn.nextElementSibling;
    panel.style.display = expanded ? "none" : "block";

    const icon = btn.querySelector(".acc-icon");
    if (icon) icon.textContent = expanded ? "+" : "–";
  });
});
