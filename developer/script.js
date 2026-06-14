/**
 * Legacy entry point — this file is kept for reference.
 * The platform now uses modular JavaScript via js/app.js
 * All features have been migrated and expanded there.
 */
console.info("HTML Master Guide now loads via js/app.js — see index.html");
// firebase-config.js থেকে auth অবজেক্ট ইম্পোর্ট করা
import { auth } from "./firebase-config.js";
// ফায়ারবেসের লগইন মেথড ইম্পোর্ট করা
import { signInWithEmailAndPassword } from "firebase/auth";

// আপনার HTML পেজের ফর্ম এবং ইনপুট ফিল্ডগুলোকে জাভাস্ক্রিপ্টে ধরা
// (নিশ্চিত হয়ে নিন আপনার HTML ফর্মে এই id বা class গুলো আছে কি না)
const loginForm = document.querySelector("form"); 

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // পেজ যাতে রিফ্রেশ না হয়

    // আপনার ইনপুট ফিল্ডের id অনুযায়ী এগুলো চেক করে নিন
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    // ফায়ারবেস দিয়ে লগইন করার আসল কোড
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // লগইন সফল হলে
        const user = userCredential.user;
        alert("অভিনন্দন! লগইন সফল হয়েছে।");
        console.log("Logged in user:", user);
        
        // লগইন হওয়ার পর ইউজারকে হোমপেজে নিয়ে যেতে চাইলে নিচের লাইনটি চালু করতে পারেন:
        // window.location.href = "index.html"; 
      })
      .catch((error) => {
        // লগইন ব্যর্থ হলে বা ভুল ইমেইল/পাসওয়ার্ড দিলে
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("লগইন হয়নি! দয়া করে সঠিক ইমেইল ও পাসওয়ার্ড দিন।");
        console.error("Error:", errorMessage);
      });
  });
}
// firebase-config.js থেকে auth অবজেক্ট ইম্পোর্ট করা
import { auth } from "./firebase-config.js";
// ফায়ারবেসের লগইন মেথড ইম্পোর্ট করা
import { signInWithEmailAndPassword } from "firebase/auth";

// গ্লোবাল ফাংশন তৈরি করা যাতে HTML এর onclick এটি খুঁজে পায়
window.handleLogin = function() {
  
  // আপনার HTML পেজের ইনপুট আইডি অনুযায়ী এলিমেন্টগুলো ধরা
  const emailInput = document.querySelector("#loginEmail") || document.querySelector("#email");
  const passwordInput = document.querySelector("#loginPassword"); // আপনার HTML এর id="loginPassword"

  // ইনপুট ফিল্ডের ভ্যালু বা টেক্সট নেওয়া
  const email = emailInput ? emailInput.value : "";
  const password = passwordInput ? passwordInput.value : "";

  if (!email || !password) {
    alert("দয়া করে ইমেইল এবং পাসওয়ার্ড দুটোই সঠিকভাবে লিখুন!");
    return;
  }

  // ফায়ারবেস দিয়ে লগইন করার কোড
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("অভিনন্দন! লগইন সফল হয়েছে।");
      console.log("Logged in user:", user);
      
      // লগইন সফল হলে ইউজারকে হোমপেজে নিয়ে যাওয়ার জন্য:
      window.location.href = "index.html"; 
    })
    .catch((error) => {
      alert("লগইন হয়নি! সঠিক ইমেইল ও পাসওয়ার্ড দিন বা ইন্টারনেট কানেকশন চেক করুন।");
      console.error("Error:", error.message);
    });
}