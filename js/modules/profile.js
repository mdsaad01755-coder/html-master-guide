import { getUser, isLoggedIn, isFirebaseReady, isFirebaseConfigured } from "./auth.js";
import { loadProgress, getProgressStats } from "./progress.js";
import { LESSONS } from "../data/lessons.js";
import { CSS_LESSONS } from "../data/css-content.js";
import { escapeHtml } from "./ui.js";

export async function renderProfile() {
  const container = document.querySelector("#profileContent");
  const guestView = document.querySelector("#profileGuest");
  const profileActions = document.querySelector("#profileActions");
  if (!container) return;

  const user = getUser();

  const showLocalProfile = !isLoggedIn() && !isFirebaseConfigured();

  if (!isLoggedIn() && !showLocalProfile) {
    container.hidden = true;
    if (profileActions) profileActions.hidden = true;
    if (guestView) guestView.hidden = false;
    return;
  }

  container.hidden = false;
  if (profileActions) profileActions.hidden = false;
  if (guestView) guestView.hidden = true;

  const progress = await loadProgress();
  const stats = getProgressStats(progress);

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Local Learner";
  const avatar = user?.photoURL
    ? `<img src="${escapeHtml(user.photoURL)}" alt="Profile photo" class="profile-avatar">`
    : `<div class="profile-avatar placeholder">${displayName.charAt(0).toUpperCase()}</div>`;

  const allLessons = [...LESSONS, ...CSS_LESSONS.map(lesson => ({ ...lesson, title: `CSS: ${lesson.title}` }))];
  const lessonList = allLessons.map(lesson => {
    const done = progress.completedLessons?.includes(lesson.id);
    return `<li class="${done ? "done" : ""}">${done ? "✓" : "○"} ${escapeHtml(lesson.title)}</li>`;
  }).join("");

  const quizHistory = (progress.quizScores || []).slice(-5).reverse().map(q => `
    <li>
      <span>${escapeHtml(q.level)} quiz</span>
      <strong>${q.percentage}%</strong>
      <span class="muted">${new Date(q.date).toLocaleDateString()}</span>
    </li>
  `).join("") || "<li>No quizzes taken yet.</li>";

  const practiceCount = (progress.practiceHistory || []).filter(p => p.success).length;

  container.innerHTML = `
    <div class="profile-header reveal">
      ${avatar}
      <div>
        <h3>${escapeHtml(displayName)}</h3>
        <p class="muted">${escapeHtml(user?.email || "Saved in this browser")}</p>
        ${isFirebaseReady() ? '<span class="badge success">Cloud sync active</span>' : '<span class="badge">Local progress only</span>'}
      </div>
    </div>
    <div class="profile-stats reveal">
      <div class="stat-card">
        <strong>${stats.completed}/${stats.totalLessons}</strong>
        <span>Lessons completed</span>
      </div>
      <div class="stat-card">
        <strong>${stats.lessonPercent}%</strong>
        <span>Course progress</span>
      </div>
      <div class="stat-card">
        <strong>${stats.avgQuiz}%</strong>
        <span>Avg quiz score</span>
      </div>
      <div class="stat-card">
        <strong>${practiceCount}</strong>
        <span>Practice wins</span>
      </div>
    </div>
    <div class="profile-grid reveal">
      <div class="profile-panel">
        <h4>Lesson Progress</h4>
        <ul class="progress-list">${lessonList}</ul>
      </div>
      <div class="profile-panel">
        <h4>Recent Quiz Scores</h4>
        <ul class="quiz-history">${quizHistory}</ul>
      </div>
    </div>
  `;
}

export function initProfile() {
  renderProfile();
}
