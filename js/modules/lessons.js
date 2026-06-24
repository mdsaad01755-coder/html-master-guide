import { LESSONS, LESSON_LEVELS } from "../data/lessons.js";
import { escapeHtml, showToast } from "./ui.js";
import { markLessonComplete, savePracticeAttempt, loadProgress } from "./progress.js";

let completedSet = new Set();

function checkPractice(code, practice) {
  const normalized = code.toLowerCase().replace(/\s+/g, " ");
  return practice.patterns.every(p => normalized.includes(p.toLowerCase()));
}

function buildLessonPreview(code) {
  if (/<html[\s>]/i.test(code)) return code;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; color: #10201c; }
  </style>
</head>
<body>
${code}
</body>
</html>`;
}

function renderLessonCard(lesson, index) {
  const isComplete = completedSet.has(lesson.id);
  return `
    <article class="lesson-card reveal visible" data-lesson="${lesson.id}" id="lesson-${lesson.id}">
      <div class="lesson-header">
        <span class="lesson-number">Lesson ${index + 1}</span>
        <span class="lesson-status ${isComplete ? "complete" : ""}">${isComplete ? "Completed" : "Not started"}</span>
      </div>
      <h3>${escapeHtml(lesson.title)}</h3>
      <p class="lesson-summary">${escapeHtml(lesson.summary)}</p>
      <div class="lesson-content">
        ${lesson.content.map(p => `<p>${escapeHtml(p)}</p>`).join("")}
        <ul class="key-points">
          ${lesson.keyPoints.map(k => `<li>${escapeHtml(k)}</li>`).join("")}
        </ul>
      </div>
      <div class="practice-box">
        <p class="tag-label">Try it yourself</p>
        <p><strong>Task:</strong> ${escapeHtml(lesson.practice.task)}</p>
        <div class="lesson-live-lab">
          <div class="editor-panel mini-editor-panel">
            <div class="panel-title"><span>Code</span></div>
            <label class="sr-only" for="practice-${lesson.id}">Code editor for ${lesson.title}</label>
            <textarea class="practice-editor" id="practice-${lesson.id}" spellcheck="false" aria-label="Practice code editor">${escapeHtml(lesson.practice.starter)}</textarea>
          </div>
          <div class="preview-panel mini-preview-panel">
            <div class="panel-title"><span>Live Preview</span></div>
            <iframe class="lesson-preview" id="preview-${lesson.id}" title="${escapeHtml(lesson.title)} practice preview" sandbox="allow-scripts allow-same-origin"></iframe>
          </div>
        </div>
        <div class="practice-actions">
          <button class="btn primary small check-answer" data-lesson="${lesson.id}" type="button">Check Answer</button>
          <button class="btn ghost small mark-complete" data-lesson="${lesson.id}" type="button">${isComplete ? "Completed" : "Mark as Complete"}</button>
        </div>
        <p class="practice-feedback" id="feedback-${lesson.id}" aria-live="polite"></p>
      </div>
    </article>
  `;
}

function updateLessonPreview(card) {
  const editor = card.querySelector(".practice-editor");
  const preview = card.querySelector(".lesson-preview");
  if (editor && preview) preview.srcdoc = buildLessonPreview(editor.value);
}

function updateAllLessonPreviews() {
  document.querySelectorAll(".lesson-card").forEach(updateLessonPreview);
}

function renderRoadmap() {
  const container = document.querySelector("#roadmapContent");
  if (!container) return;

  container.innerHTML = LESSON_LEVELS.map(level => {
    const lessons = LESSONS.filter(l => l.level === level.id);
    return `
      <div class="roadmap-level ${level.color} reveal visible">
        <h3>${escapeHtml(level.label)}</h3>
        <div class="lesson-grid">
          ${lessons.map((lesson, i) => {
            const globalIndex = LESSONS.indexOf(lesson);
            return renderLessonCard(lesson, globalIndex);
          }).join("")}
        </div>
      </div>
    `;
  }).join("");
  updateAllLessonPreviews();
  document.dispatchEvent(new CustomEvent("html-master:content-rendered"));
}

async function refreshProgress() {
  const progress = await loadProgress();
  completedSet = new Set(progress.completedLessons || []);
  updateProgressBar(progress);
  renderRoadmap();
}

function updateProgressBar(progress) {
  const steps = document.querySelector("#overallProgressSteps");
  const text = document.querySelector("#overallProgressText");
  const completed = progress.completedLessons?.length || 0;
  const total = LESSONS.length;
  const pct = Math.round((completed / total) * 100);
  const completedIds = new Set(progress.completedLessons || []);
  if (steps) {
    steps.innerHTML = LESSONS.map((lesson, index) => {
      const done = completedIds.has(lesson.id);
      return `
        <a class="progress-step ${done ? "complete" : ""}" href="#lesson-${lesson.id}" aria-label="Lesson ${index + 1}: ${escapeHtml(lesson.title)}${done ? ", complete" : ""}">
          <span class="step-check" aria-hidden="true"></span>
          <span class="step-number">${index + 1}</span>
        </a>
      `;
    }).join("");
  }
  if (text) text.textContent = `${completed} of ${total} lessons complete (${pct}%)`;
}

export function initLessons() {
  const container = document.querySelector("#roadmapContent");
  if (!container) return;

  container.addEventListener("click", async event => {
    const checkBtn = event.target.closest(".check-answer");
    const completeBtn = event.target.closest(".mark-complete");

    if (checkBtn) {
      const id = checkBtn.dataset.lesson;
      const lesson = LESSONS.find(l => l.id === id);
      const editor = document.querySelector(`#practice-${id}`);
      const feedback = document.querySelector(`#feedback-${id}`);
      if (!lesson || !editor || !feedback) return;

      const correct = checkPractice(editor.value, lesson.practice);
      feedback.textContent = correct ? lesson.practice.success : lesson.practice.fail;
      feedback.className = `practice-feedback ${correct ? "success" : "error"}`;
      await savePracticeAttempt(id, correct);
      if (correct) showToast("Practice completed!", "success");
    }

    if (completeBtn) {
      const id = completeBtn.dataset.lesson;
      await markLessonComplete(id);
      completedSet.add(id);
      completeBtn.textContent = "Completed";
      completeBtn.closest(".lesson-card")?.querySelector(".lesson-status")?.classList.add("complete");
      const status = completeBtn.closest(".lesson-card")?.querySelector(".lesson-status");
      if (status) status.textContent = "Completed";
      const progress = await loadProgress();
      updateProgressBar(progress);
      showToast("Lesson marked as complete!", "success");
    }
  });

  container.addEventListener("input", event => {
    const card = event.target.closest(".lesson-card");
    if (card && event.target.matches(".practice-editor")) updateLessonPreview(card);
  });

  refreshProgress();
}

export async function refreshLessonProgress() {
  await refreshProgress();
}
