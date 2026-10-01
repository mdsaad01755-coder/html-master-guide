# HTML Master Guide — Project Summary

## Project Overview

**HTML Master Guide** হলো একটি interactive web development learning platform, যেখানে beginner থেকে intermediate level পর্যন্ত HTML, CSS এবং JavaScript শেখানো হয়।

- **Technology:** Vanilla HTML, CSS, JavaScript (ES6 modules)
- **Build system:** কোনো build step নেই; browser সরাসরি ES modules চালায়
- **Live site:** https://mdsaad01755-coder.github.io/html-master-guide/
- **GitHub repository:** https://github.com/mdsaad01755-coder/html-master-guide
- **Repository owner:** Saad — https://github.com/mdsaad01755-coder
- **Current branch:** `main`
- **Latest commit:** `ce4edee` — `Add Firebase authentication and improve auth UX`

## Main Features

### 1. Premium Design System

প্রজেক্টে Teal/Blue ভিত্তিক একটি refined premium design system ব্যবহার করা হয়েছে।

- Dark mode এবং light mode
- CSS custom properties ভিত্তিক spacing scale
- Typography scale
- Border-radius scale
- Shadow scale
- Smooth 200–300ms transitions
- Responsive layout
- WCAG-friendly contrast-এর দিকে নজর রাখা হয়েছে
- Font pairing: Inter এবং JetBrains Mono

Design documentation:

- `DESIGN_SYSTEM.md`

### 2. Premium Hero Section

Hero section-এ রয়েছে:

- বড় modern “SAAD” নামের typography
- Smooth gradient ও glowing effect
- Soft shadow
- Fade-up entrance animation
- Subtle floating animation
- “Start Learning” এবং “Open Playground” CTA
- Animated statistic counters
- Realistic code-editor style preview
- Line numbers ও syntax-highlighted code
- Responsive mobile/desktop layout

### 3. Learning Sections

#### HTML

- Beginner থেকে advanced HTML learning path
- Interactive lesson cards
- Practice editor
- Live preview
- Lesson completion tracking
- Actual progress bar
- Sticky lesson navigation
- HTML tag reference table
- Search/filter functionality
- HTML cheat sheet
- Quiz support

#### CSS

- CSS roadmap
- Interactive CSS lessons
- Live HTML/CSS editor এবং preview
- CSS properties reference table
- Search/filter functionality
- Sticky table header
- Zebra-striped/hover-highlighted reference rows
- CSS cheat sheet
- CSS quiz
- CSS mini projects

#### JavaScript

- JavaScript essentials learning path
- Variables, functions, DOM, arrays, events, async ইত্যাদি topics
- Interactive JavaScript lessons
- JavaScript reference table
- Search/filter functionality
- JavaScript cheat sheet
- JavaScript quiz
- JavaScript mini projects

### 4. Playground

Built-in Web Dev Playground-এ HTML, CSS এবং JavaScript একসাথে লেখা যায়।

- Live preview iframe
- Run button
- Reset button
- Save Project button
- Ctrl + Enter shortcut
- Virtual console
- `console.log()` output capture
- Console clear functionality

### 5. Code Examples

Lesson ও reference code examples-এ রয়েছে:

- Syntax highlighting
- Line numbers
- Copy button
- Copy হলে “✓ Copied” confirmation
- Toast notification

### 6. User Profile and Progress Dashboard

Profile section-এ logged-in user তার learning progress দেখতে পারে।

Dashboard-এ রয়েছে:

- User name ও email
- Profile avatar বা initial
- Cloud sync status
- Completed lessons count
- Course progress percentage
- Average quiz score
- Practice wins
- Lesson progress list
- Recent quiz history

## Firebase Integration

Firebase authentication এবং cloud progress save ইতিমধ্যে যুক্ত করা হয়েছে।

### Enabled Features

- Email/Password Sign In
- Email/Password Sign Up
- Google Sign In
- Firebase authentication state listener
- User profile display
- Firestore progress sync
- LocalStorage fallback
- Sign Out

### Firebase Project Configuration

বর্তমানে user-provided Firebase project ব্যবহার করা হয়েছে:

- Project ID: `ecommerce-site-836f2`
- Auth domain: `ecommerce-site-836f2.firebaseapp.com`
- Storage bucket: `ecommerce-site-836f2.firebasestorage.app`

Firebase config file:

- `js/firebase-config.js`

Firebase core auth file:

- `js/modules/auth.js`

Auth UI file:

- `js/modules/auth-ui.js`

Progress persistence file:

- `js/modules/progress.js`

### Important Firebase Console Setup

Firebase Console-এ নিশ্চিত করতে হবে:

1. Authentication → Sign-in method-এ **Email/Password** enable করা আছে
2. Google provider enable করা আছে
3. Firestore Database তৈরি করা হয়েছে
4. Authentication → Settings → Authorized domains-এ নিচের domain আছে:

```text
mdsaad01755-coder.github.io
```

### Security Note

Firebase Web API key browser code-এ থাকা স্বাভাবিক। তবে কখনোই নিচের secretগুলো frontend বা chat-এ দেওয়া যাবে না:

- Service account private key
- Admin SDK credentials
- Database server password
- Private API secret

Firestore Security Rules অবশ্যই production অনুযায়ী secure রাখতে হবে।

## Important Project Files

```text
index.html                         Main page structure
style.css                          Global design system and UI styles
DESIGN_SYSTEM.md                   Design system documentation
js/app.js                          Main application entrypoint
js/firebase-config.js              Firebase project configuration
js/modules/auth.js                 Firebase authentication logic
js/modules/auth-ui.js              Login/signup modal logic
js/modules/progress.js             Local and Firestore progress persistence
js/modules/profile.js               User profile dashboard rendering
js/modules/lessons.js              HTML lessons and progress
js/modules/css-learning.js         CSS lessons and reference
js/modules/js-learning.js          JavaScript lessons and reference
js/modules/playground.js            Playground editor and save logic
js/modules/virtual-console.js      Virtual console implementation
js/modules/ui.js                   Theme, nav, modal, reveal, copy utilities
js/modules/stat-counter.js         Hero statistic count-up animation
js/modules/tags.js                 HTML reference table
js/modules/quiz.js                 Quiz logic
js/modules/content.js              Dynamic content rendering
js/data/lessons.js                 HTML lesson data
js/data/css-content.js              CSS content and quiz data
js/data/js-content.js              JavaScript content and quiz data
js/data/quizzes.js                 Quiz data
js/data/tags.js                    HTML tag data
```

## Recent Firebase Work

Firebase integration-এর সময় GitHub repository-এর latest snapshot restore করে missing modules ঠিক করা হয়েছে। এরপর:

- User-provided Firebase credentials বসানো হয়েছে
- Firebase dynamic loading রাখা হয়েছে, যাতে page load blocking না হয়
- Email/password authentication যুক্ত করা হয়েছে
- Google sign-in যুক্ত করা হয়েছে
- Auth error-এর জন্য friendly Bengali messages যোগ করা হয়েছে
- Sign in/sign up button-এ loading state যোগ করা হয়েছে
- Firestore এবং localStorage progress persistence রাখা হয়েছে
- সব JavaScript module syntax check করা হয়েছে
- সব local import verify করা হয়েছে
- Local HTTP test সফল হয়েছে
- Live GitHub Pages response HTTP 200 পাওয়া গেছে

## Current Validation Status

- JavaScript syntax: Passed
- Local module imports: No missing imports
- Local HTTP page: Passed
- Live GitHub Pages: HTTP 200
- Authentication markup present on live page
- Git working tree: Clean after commit

## Suggested Next Improvements

### High Priority

1. Firebase Console-এ Email/Password ও Google providers verify করা
2. Firestore Security Rules production-safe করা
3. Real account দিয়ে Sign Up, Sign In, Sign Out test করা
4. Mobile browser-এ auth modal test করা
5. Google popup/redirect behaviour verify করা

### Medium Priority

1. Password reset বা “Forgot password” feature যোগ করা
2. Email verification flow যোগ করা
3. User profile name update option যোগ করা
4. Delete account option যোগ করা
5. More detailed progress dashboard যোগ করা
6. CSS animation এবং transition lessons যোগ করা

### Future Features

1. React learning roadmap
2. Git এবং GitHub learning roadmap
3. Certificate/progress milestone system
4. Project submission system
5. Search across all lessons
6. Accessibility audit এবং keyboard navigation refinement
7. Performance optimization এবং duplicate logic refactoring

## New Chat Starter Prompt

নতুন chat-এ এই prompt ব্যবহার করা যাবে:

> আমি `HTML Master Guide` project নিয়ে কাজ করছি। এটি Vanilla HTML, CSS এবং JavaScript দিয়ে তৈরি একটি interactive web development learning platform।
>
> Live site: https://mdsaad01755-coder.github.io/html-master-guide/
>
> GitHub repo: https://github.com/mdsaad01755-coder/html-master-guide
>
> Project-এ HTML, CSS, JavaScript lessons, quizzes, cheat sheets, live playground, virtual console, progress tracking, dark/light theme এবং Firebase Authentication যুক্ত আছে। Firebase Email/Password Sign In, Sign Up, Google Sign In এবং Firestore progress sync ইতিমধ্যে implemented।
>
> Design system হলো premium Teal/Blue theme, responsive layout, Inter + JetBrains Mono fonts, smooth transitions এবং WCAG-friendly contrast ভিত্তিক।
>
> কাজ শুরুর আগে বর্তমান `index.html`, `style.css`, `js/app.js`, `js/modules/auth.js`, `js/modules/auth-ui.js`, `js/modules/progress.js` এবং সংশ্লিষ্ট data/module files দেখে existing functionality preserve করতে হবে।
>
> Firebase config file: `js/firebase-config.js`। কোনো service-account private key বা secret frontend-এ যোগ করা যাবে না।
>
> যে পরিবর্তন করা হবে তা existing premium design-এর সঙ্গে consistent, responsive এবং accessible হতে হবে। কাজ শেষে modified files, test result এবং GitHub commit জানাতে হবে।

## Quick Reference

যদি authentication কাজ না করে, প্রথমে check করতে হবে:

1. Firebase Console-এ Email/Password provider enabled কি না
2. Google provider enabled কি না
3. Authorized domain-এ GitHub Pages domain আছে কি না
4. Firestore database তৈরি হয়েছে কি না
5. Browser console-এ Firebase error code কী দেখাচ্ছে
6. GitHub Pages deployment নতুন commit থেকে update হয়েছে কি না
