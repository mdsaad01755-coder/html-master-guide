/**
 * Firebase configuration for HTML Master Guide.
 *
 * Firebase Web API keys are intended to be used in browser applications.
 * Keep Firebase Authentication and Firestore Security Rules enabled in the
 * Firebase Console; never place service-account private keys in this file.
 */
export const firebaseConfig = {
  apiKey: "AIzaSyCP-ioLQd_KPeO__j7QVbTvf5CjNvAexIw",
  authDomain: "ecommerce-site-836f2.firebaseapp.com",
  projectId: "ecommerce-site-836f2",
  storageBucket: "ecommerce-site-836f2.firebasestorage.app",
  messagingSenderId: "396450998465",
  appId: "1:396450998465:web:18826883d9afa1cb3f8c40",
  measurementId: "G-MHM800B6CJ"
};

export function isFirebaseConfigured() {
  return Boolean(firebaseConfig.apiKey && !firebaseConfig.apiKey.includes("YOUR_"));
}
