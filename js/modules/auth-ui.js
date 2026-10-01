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

function friendlyAuthError(error) {
  const messages = {
    "auth/invalid-credential": "Email বা password সঠিক নয়। আবার চেষ্টা করুন।",
    "auth/invalid-login-credentials": "Email বা password সঠিক নয়। আবার চেষ্টা করুন।",
    "auth/user-not-found": "এই email দিয়ে কোনো account পাওয়া যায়নি।",
    "auth/wrong-password": "Password সঠিক নয়।",
    "auth/email-already-in-use": "এই email দিয়ে account আগে থেকেই আছে। Sign In করুন।",
    "auth/weak-password": "Password কমপক্ষে ৬ অক্ষরের হতে হবে।",
    "auth/invalid-email": "একটি সঠিক email address দিন।",
    "auth/popup-closed-by-user": "Google sign-in window বন্ধ করা হয়েছে।",
    "auth/popup-blocked": "Browser popup block করেছে। Google sign-in চালাতে popup allow করুন।",
    "auth/operation-not-allowed": "Firebase Console-এ এই sign-in method enable করা হয়নি।"
  };
  return messages[error?.code] || "Authentication ব্যর্থ হয়েছে। আবার চেষ্টা করুন।";
}

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

    const submitBtn = document.querySelector("#authSubmit");
    const originalLabel = submitBtn?.textContent || "Continue";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = mode === "login" ? "Signing in…" : "Creating account…";
      submitBtn.setAttribute("aria-busy", "true");
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
      if (authError) authError.textContent = friendlyAuthError(err);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
        submitBtn.removeAttribute("aria-busy");
      }
    }
  });

  googleBtn?.addEventListener("click", async () => {
    googleBtn.disabled = true;
    googleBtn.setAttribute("aria-busy", "true");
    try {
      await loginWithGoogle();
      showToast("Signed in with Google!", "success");
      closeModal("authModal");
    } catch (err) {
      if (authError) authError.textContent = friendlyAuthError(err);
    } finally {
      googleBtn.disabled = false;
      googleBtn.removeAttribute("aria-busy");
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
