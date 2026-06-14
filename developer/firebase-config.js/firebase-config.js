import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCP-ioLQd_KPeO__j7QVbTvf5CjNvAexIw",
  authDomain: "ecommerce-site-836f2.firebaseapp.com",
  projectId: "ecommerce-site-836f2",
  storageBucket: "ecommerce-site-836f2.firebasestorage.app",
  messagingSenderId: "396450998465",
  appId: "1:396450998465:web:f8147ecc6c5e9de73f8c40",
  measurementId: "G-1YDV83853F"
};

// Firebase অ্যাপ ইনিশিয়ালাইজ করা
const app = initializeApp(firebaseConfig);

// Authentication সার্ভিসটি এক্সপোর্ট করা
export const auth = getAuth(app);
