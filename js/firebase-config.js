/**
 * Firebase configuration — replace with your own project credentials.
 * Create a project at https://console.firebase.google.com
 * Enable Authentication (Email/Password + Google) and Firestore Database.
 */
export const firebaseConfig = {
  apiKey: "AIzaSyCP-ioLQd_KPe0__j7QVbTvf5CjNvAexIw",
  authDomain: "ecommerce-site-836f2.firebaseapp.com",
  projectId: "ecommerce-site-836f2",
  storageBucket: "ecommerce-site-836f2.firebasestorage.app",
  messagingSenderId: "396450998465",
  appId: "1:396450998465:web:52e0e1efd531662e3f8c40",
  measurementId: "G-F4D5G2CYR2"
};

export function isFirebaseConfigured() {
  return !firebaseConfig.apiKey.includes("YOUR_");
}
