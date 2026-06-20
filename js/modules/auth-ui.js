import {
  initAuth,
  onUserChange,
  loginWithEmail,
  signupWithEmail,
  loginWithGoogle,
  logout,
  isFirebaseReady,
  isFirebaseConfigured
} from "./auth.js";
import { openModal, closeModal, showToast } from "./ui.js";
import { renderProfile, initProfile } from "./profile.js";
import { refreshLessonProgress } from "./lessons.js";
import { getApp } from "./auth.js";
import { initProgress } from "./progress.js";

export function initAuthUI() {
  const authBtn = document.querySelector("#authBtn");
  const authForm = document.querySelector("#authForm");
  const googleBtn = document.querySelector("#googleLoginBtn");
  const logoutBtn = document.querySelector("#logoutBtn");
  const tabLogin = document.querySelector("#tabLogin");
  const tabSignup = document.querySelector("#tabSignup");
  const authError = document.querySelector("#authError");
  const firebaseNotice = document.querySelector("#firebaseNotice");

  let mode = "login";

  if (isFirebaseConfigured()) {
    initAuth().then(ready => {
      if (ready) {
        initProgress(getApp());
        firebaseNotice?.classList.add("hidden");
      }
    });
  } else {
    firebaseNotice?.classList.remove("hidden");
  }

  function setMode(newMode) {
    mode = newMode;
    tabLogin?.classList.toggle("active", mode === "login");
    tabSignup?.classList.toggle("active", mode === "signup");
    const nameField = document.querySelector("#authNameField");
    if (nameField) nameField.hidden = mode !== "signup";
    const submitBtn = document.querySelector("#authSubmit");
    if (submitBtn) submitBtn.textContent = mode === "login" ? "Sign In" : "Create Account";
    if (authError) authError.textContent = "";
  }

  function updateAuthButton(user) {
    if (!authBtn) return;
    if (user) {
      const name = user.displayName || user.email?.split("@")[0] || "Profile";
      authBtn.textContent = name;
      authBtn.dataset.action = "profile";
    } else {
      authBtn.textContent = "Sign In";
      authBtn.dataset.action = "login";
    }
  }

  authBtn?.addEventListener("click", () => {
    if (authBtn.dataset.action === "profile") {
      document.querySelector("#profile")?.scrollIntoView({ behavior: "smooth" });
    } else {
      openModal("authModal");
    }
  });

  tabLogin?.addEventListener("click", () => setMode("login"));
  tabSignup?.addEventListener("click", () => setMode("signup"));

  authForm?.addEventListener("submit", async event => {
    event.preventDefault();
    const email = document.querySelector("#authEmail")?.value?.trim();
    const password = document.querySelector("#authPassword")?.value;
    const name = document.querySelector("#authName")?.value?.trim();

    if (!email || !password) {
      if (authError) authError.textContent = "Please enter email and password.";
      return;
    }

    try {
      if (mode === "login") {
        await loginWithEmail(email, password);
        showToast("Welcome back!", "success");
      } else {
        await signupWithEmail(name, email, password);
        showToast("Account created successfully!", "success");
      }
      closeModal("authModal");
      authForm.reset();
    } catch (err) {
      if (authError) authError.textContent = err.message || "Authentication failed.";
    }
  });

  googleBtn?.addEventListener("click", async () => {
    try {
      await loginWithGoogle();
      showToast("Signed in with Google!", "success");
      closeModal("authModal");
    } catch (err) {
      if (authError) authError.textContent = err.message || "Google sign-in failed.";
    }
  });

  logoutBtn?.addEventListener("click", async () => {
    await logout();
    showToast("Signed out.", "info");
    await renderProfile();
    await refreshLessonProgress();
  });

  onUserChange(async user => {
    updateAuthButton(user);
    await renderProfile();
    await refreshLessonProgress();
  });

  setMode("login");
  initProfile();
}
