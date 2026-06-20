import { firebaseConfig, isFirebaseConfigured } from "../firebase-config.js";

let app = null;
let auth = null;
let currentUser = null;
const listeners = new Set();

// Internal Firebase methods to be loaded dynamically
let firebaseAuth = {};

export async function initAuth() {
  if (!isFirebaseConfigured()) return false;
  if (app) return true;
  try {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js");
    const authModule = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js");
    
    firebaseAuth = authModule;
    app = initializeApp(firebaseConfig);
    auth = authModule.getAuth(app);
    
    authModule.onAuthStateChanged(auth, user => {
      currentUser = user;
      listeners.forEach(fn => fn(user));
    });
    return true;
  } catch (err) {
    console.error("Firebase initialization failed:", err);
    return false;
  }
}

export function onUserChange(callback) {
  listeners.add(callback);
  callback(currentUser);
  return () => listeners.delete(callback);
}

export function getUser() {
  return currentUser;
}

export function isLoggedIn() {
  return Boolean(currentUser);
}

export function isFirebaseReady() {
  return isFirebaseConfigured() && auth !== null;
}

export function getApp() {
  return app;
}

export async function loginWithEmail(email, password) {
  if (!auth) throw new Error("Firebase is not configured. Add your credentials in js/firebase-config.js");
  return firebaseAuth.signInWithEmailAndPassword(auth, email, password);
}

export async function signupWithEmail(name, email, password) {
  if (!auth) throw new Error("Firebase is not configured. Add your credentials in js/firebase-config.js");
  const result = await firebaseAuth.createUserWithEmailAndPassword(auth, email, password);
  if (name) await firebaseAuth.updateProfile(result.user, { displayName: name });
  return result;
}

export async function loginWithGoogle() {
  if (!auth) throw new Error("Firebase is not configured. Add your credentials in js/firebase-config.js");
  const provider = new firebaseAuth.GoogleAuthProvider();
  return firebaseAuth.signInWithPopup(auth, provider);
}

export async function logout() {
  if (!auth) return;
  await firebaseAuth.signOut(auth);
}
export { isFirebaseConfigured };