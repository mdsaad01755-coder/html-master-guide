import { getUser, isFirebaseReady } from "./auth.js";
import { LESSONS } from "../data/lessons.js";
import { CSS_LESSONS } from "../data/css-content.js";

const LOCAL_KEY = "html-master-progress";

let db = null;
let firestore = {};

export async function initProgress(firebaseApp) {
  if (firebaseApp) {
    try {
      const { getFirestore, ...rest } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");
      firestore = rest;
      db = getFirestore(firebaseApp);
    } catch (err) {
      console.error("Firestore initialization failed:", err);
    }
  }
}

function defaultProgress() {
  return {
    completedLessons: [],
    quizScores: [],
    practiceHistory: [],
    lastActive: new Date().toISOString()
  };
}

function getLocalProgress() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY)) || defaultProgress();
  } catch {
    return defaultProgress();
  }
}

function saveLocalProgress(data) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
}

async function getFirestoreProgress(uid) {
  if (!db) return null;
  const ref = firestore.doc(db, "users", uid);
  const snap = await firestore.getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

async function saveFirestoreProgress(uid, data) {
  if (!db) return;
  const ref = firestore.doc(db, "users", uid);
  const existing = await firestore.getDoc(ref);
  if (existing.exists()) {
    await firestore.updateDoc(ref, { ...data, lastActive: new Date().toISOString() });
  } else {
    await firestore.setDoc(ref, { ...data, createdAt: new Date().toISOString(), lastActive: new Date().toISOString() });
  }
}

export async function loadProgress() {
  const user = getUser();
  if (user && isFirebaseReady() && db) {
    const remote = await getFirestoreProgress(user.uid);
    if (remote) {
      saveLocalProgress(remote);
      return remote;
    }
  }
  return getLocalProgress();
}

export async function saveProgress(data) {
  saveLocalProgress(data);
  const user = getUser();
  if (user && isFirebaseReady() && db) {
    await saveFirestoreProgress(user.uid, data);
  }
  return data;
}

export async function markLessonComplete(lessonId) {
  const progress = await loadProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
  }
  progress.lastActive = new Date().toISOString();
  return saveProgress(progress);
}

export async function saveQuizScore(level, score, total, percentage) {
  const progress = await loadProgress();
  progress.quizScores.push({
    level,
    score,
    total,
    percentage,
    date: new Date().toISOString()
  });
  progress.lastActive = new Date().toISOString();
  return saveProgress(progress);
}

export async function savePracticeAttempt(lessonId, success) {
  const progress = await loadProgress();
  progress.practiceHistory.push({
    lessonId,
    success,
    date: new Date().toISOString()
  });
  progress.lastActive = new Date().toISOString();
  return saveProgress(progress);
}

export async function savePlaygroundProject(name, html, css, js) {
  const progress = await loadProgress();
  if (!progress.savedProjects) progress.savedProjects = [];
  const existing = progress.savedProjects.findIndex(p => p.name === name);
  const project = { name, html, css, js, savedAt: new Date().toISOString() };
  if (existing >= 0) {
    progress.savedProjects[existing] = project;
  } else {
    progress.savedProjects.push(project);
  }
  return saveProgress(progress);
}

export function getProgressStats(progress) {
  const totalLessons = LESSONS.length + CSS_LESSONS.length;
  const completed = progress.completedLessons?.length || 0;
  const lessonPercent = Math.round((completed / totalLessons) * 100);
  const quizzes = progress.quizScores || [];
  const practices = progress.practiceHistory || [];
  const avgQuiz = quizzes.length
    ? Math.round(quizzes.reduce((sum, q) => sum + q.percentage, 0) / quizzes.length)
    : 0;
  return { totalLessons, completed, lessonPercent, quizzes, practices, avgQuiz };
}
