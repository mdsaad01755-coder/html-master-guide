/**
 * Firebase configuration — replace with your own project credentials.
 * Create a project at https://console.firebase.google.com
 * Enable Authentication (Email/Password + Google) and Firestore Database.
 */
export const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForYourProject-836f2",
  authDomain: "ecommerce-site-836f2.firebaseapp.com",
  projectId: "ecommerce-site-836f2",
  storageBucket: "ecommerce-site-836f2.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:dummyappid123456"
};

export function isFirebaseConfigured() {
  return !firebaseConfig.apiKey.includes("YOUR_");
}
