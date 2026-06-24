export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function initTheme() {
  const themeToggle = document.querySelector("#themeToggle");
  const themeIcon = document.querySelector("#themeIcon");

  function setTheme(mode) {
    document.body.classList.toggle("light", mode === "light");
    localStorage.setItem("html-master-theme", mode);
    if (themeIcon) themeIcon.textContent = mode === "light" ? "☀" : "☾";
  }

  themeToggle?.addEventListener("click", () => {
    const next = document.body.classList.contains("light") ? "dark" : "light";
    setTheme(next);
  });

  setTheme(localStorage.getItem("html-master-theme") || "dark");
}

export function initNav() {
  const menuToggle = document.querySelector("#menuToggle");
  const navLinks = document.querySelector("#navLinks");

  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks?.addEventListener("click", event => {
    if (event.target.tagName === "A") {
      navLinks.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    }
  });
}

export function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

export function initCodeCopyButtons() {
  function enhance(root = document) {
    root.querySelectorAll("pre").forEach(block => {
      if (block.dataset.copyReady === "true") return;
      const code = block.querySelector("code");
      if (!code) return;

      block.dataset.copyReady = "true";
      block.classList.add("copyable-code");
      const button = document.createElement("button");
      button.className = "copy-code-btn";
      button.type = "button";
      button.textContent = "Copy Code";
      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(code.textContent || "");
          button.textContent = "Copied";
          showToast("Code copied", "success");
          setTimeout(() => {
            button.textContent = "Copy Code";
          }, 1400);
        } catch {
          showToast("Copy failed. Select the code manually.", "info");
        }
      });
      block.appendChild(button);
    });
  }

  enhance();
  document.addEventListener("html-master:content-rendered", () => enhance());
}

export function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

export function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }
}

export function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }
}

export function initModals() {
  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", () => closeModal(btn.dataset.closeModal));
  });
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", event => {
      if (event.target === overlay) closeModal(overlay.id);
    });
  });
}
