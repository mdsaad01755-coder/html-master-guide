export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function highlightCode(value, language = "javascript") {
  const escaped = escapeHtml(value);
  const tokenPattern = /(&quot;.*?&quot;|&#39;.*?&#39;|`.*?`|\/\/[^\n]*|<!--[\s\S]*?-->|#[a-fA-F0-9]{3,8}\b|\b(?:const|let|var|function|return|if|else|for|while|async|await|new|class|true|false|null|undefined|import|from)\b|\b(?:console|document|window|Array|Object)\b)/g;
  return escaped.replace(tokenPattern, token => {
    if (token.startsWith("//") || token.startsWith("<!--")) return `<span class="syntax-comment">${token}</span>`;
    if (token.startsWith("&quot;") || token.startsWith("&#39;") || token.startsWith("`")) return `<span class="syntax-string">${token}</span>`;
    if (token.startsWith("#")) return `<span class="syntax-number">${token}</span>`;
    if (/^(console|document|window|Array|Object)$/.test(token)) return `<span class="syntax-object">${token}</span>`;
    return `<span class="syntax-keyword">${token}</span>`;
  });
}

export function addLineNumbers(value) {
  return String(value).split("\n").map((line, index) => `<span class="lesson-line"><span class="lesson-line-number">${index + 1}</span>${line || " "}</span>`).join("\n");
}

export function renderHighlightedCode(value, language = "javascript") {
  return addLineNumbers(highlightCode(value, language));
}

export function createCopyButton(code, label = "Copy") {
  const button = document.createElement("button");
  button.className = "copy-btn";
  button.type = "button";
  button.innerHTML = `<span>${label}</span>`;
  button.setAttribute("aria-label", "Copy code snippet");
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      button.innerHTML = `<span>✓ Copied</span>`;
      button.classList.add("copied");
      showToast("Code copied to clipboard", "success");
      setTimeout(() => {
        button.innerHTML = `<span>${label}</span>`;
        button.classList.remove("copied");
      }, 2000);
    } catch {
      showToast("Copy failed. Select the code manually.", "error");
    }
  });
  return button;
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
    // Find all pre blocks, including those inside code-example-wrap
    const blocks = root.querySelectorAll("pre, .code-example-wrap pre, .code-block");
    
    blocks.forEach(block => {
      if (block.dataset.copyReady === "true") return;
      const code = block.querySelector("code") || block;
      if (!code || code.tagName === "BUTTON") return;

      block.dataset.copyReady = "true";
      block.style.position = "relative";
      
      const button = document.createElement("button");
      button.className = "copy-btn";
      button.type = "button";
      button.innerHTML = `<span>Copy</span>`;
      button.setAttribute("aria-label", "Copy code snippet");
      
      button.addEventListener("click", async () => {
        try {
          const copySource = code.cloneNode(true);
          copySource.querySelectorAll(".lesson-line-number").forEach(number => number.remove());
          const textToCopy = copySource.innerText || copySource.textContent || "";
          await navigator.clipboard.writeText(textToCopy.trim());
          
          const originalHTML = button.innerHTML;
          button.innerHTML = `<span>✓ Copied</span>`;
          button.classList.add("copied");
          
          showToast("Code copied to clipboard", "success");
          
          setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove("copied");
          }, 2000);
        } catch (err) {
          console.error("Copy failed:", err);
          showToast("Copy failed", "error");
        }
      });
      
      block.appendChild(button);
    });
  }

  enhance();
  // Re-run when content is dynamically rendered
  document.addEventListener("html-master:content-rendered", () => {
    setTimeout(() => enhance(), 100);
  });
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

export function initSplashScreen() {
  const splash = document.getElementById('splashScreen');
  if (!splash) return;

  // Only show splash screen once per session
  if (sessionStorage.getItem('splashPlayed')) {
    splash.style.display = 'none';
    return;
  }

  setTimeout(() => {
    splash.classList.add('fade-out');
    sessionStorage.setItem('splashPlayed', 'true');
    setTimeout(() => {
      splash.style.display = 'none';
    }, 600);
  }, 2500);
}
