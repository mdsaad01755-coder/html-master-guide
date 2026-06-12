import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { firebaseConfig, isFirebaseConfigured } from "../firebase-config.js";

let app = null;
let auth = null;
let currentUser = null;
const listeners = new Set();

export function initAuth() {
  if (!isFirebaseConfigured()) return false;
  if (app) return true;
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    onAuthStateChanged(auth, user => {
      currentUser = user;
      listeners.forEach(fn => fn(user));
    });
    return true;
  } catch {
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
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signupWithEmail(name, email, password) {
  if (!auth) throw new Error("Firebase is not configured. Add your credentials in js/firebase-config.js");
  const result = await createUserWithEmailAndPassword(auth, email, password);
  if (name) await updateProfile(result.user, { displayName: name });
  return result;
}

export async function loginWithGoogle() {
  if (!auth) throw new Error("Firebase is not configured. Add your credentials in js/firebase-config.js");
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export async function logout() {
  if (!auth) return;
  await signOut(auth);
}
