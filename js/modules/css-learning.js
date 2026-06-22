import {
  CSS_ROADMAP,
  CSS_LESSONS,
  CSS_PROPERTIES,
  CSS_CHEAT_SHEET,
  CSS_QUIZ_LEVELS,
  CSS_QUIZ_BANK,
  CSS_PROJECTS
} from "../data/css-content.js";
import { escapeHtml, showToast } from "./ui.js";
import { loadProgress, markLessonComplete, savePracticeAttempt, saveQuizScore } from "./progress.js";

let completedSet = new Set();
let cssQuizState = {
  level: "css-beginner",
  questions: [],
  index: 0,
  score: 0,
  answered: false,
  finished: false
};

function buildPreviewDoc(html, css) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; padding: 18px; font-family: system-ui, sans-serif; color: #10201c; }
    ${css}
  </style>
</head>
<body>${html}</body>
</html>`;
}

function renderRoadmap() {
  const el = document.querySelector("#cssRoadmapContent");
  if (!el) return;
  el.innerHTML = CSS_ROADMAP.map((item, index) => `
    <li>
      <span class="roadmap-step">${String(index + 1).padStart(2, "0")}</span>
      <strong>${escapeHtml(item)}</strong>
    </li>
  `).join("");
}

function renderLessons() {
  const el = document.querySelector("#cssLessonsContent");
  if (!el) return;
  el.innerHTML = CSS_LESSONS.map((lesson, index) => {
    const isComplete = completedSet.has(lesson.id);
    return `
      <article class="lesson-card css-lesson-card reveal visible" data-css-lesson="${lesson.id}">
        <div class="lesson-header">
          <span class="lesson-number">CSS Lesson ${index + 1}</span>
          <span class="lesson-status ${isComplete ? "complete" : ""}">${isComplete ? "Completed" : "Not started"}</span>
        </div>
        <h3>${escapeHtml(lesson.title)}</h3>
        <p class="lesson-summary">${escapeHtml(lesson.summary)}</p>
        <p class="muted">${escapeHtml(lesson.explanation)}</p>
        <div class="tag-section">
          <p class="tag-label">Example</p>
          <pre class="code-block"><code>${escapeHtml(lesson.code)}</code></pre>
        </div>
        <div class="css-live-lab">
          <div class="editor-panel">
            <div class="panel-title">HTML</div>
            <textarea class="css-live-html" spellcheck="false" aria-label="${escapeHtml(lesson.title)} HTML editor">${escapeHtml(lesson.html)}</textarea>
          </div>
          <div class="editor-panel">
            <div class="panel-title">CSS</div>
            <textarea class="css-live-css" spellcheck="false" aria-label="${escapeHtml(lesson.title)} CSS editor">${escapeHtml(lesson.css)}</textarea>
          </div>
          <div class="preview-panel">
            <div class="panel-title">Live Preview</div>
            <iframe class="css-live-preview" title="${escapeHtml(lesson.title)} live preview"></iframe>
          </div>
        </div>
        <div class="practice-box">
          <p><strong>Goal:</strong> ${escapeHtml(lesson.goal)}</p>
          <div class="practice-actions">
            <button class="btn primary small css-check" data-css-lesson="${lesson.id}" type="button">Check CSS</button>
            <button class="btn ghost small css-mark-complete" data-css-lesson="${lesson.id}" type="button">${isComplete ? "Completed" : "Mark as complete"}</button>
          </div>
          <p class="practice-feedback" id="css-feedback-${lesson.id}" aria-live="polite"></p>
        </div>
      </article>
    `;
  }).join("");
  updateAllLivePreviews();
}

function updateLessonPreview(card) {
  const html = card.querySelector(".css-live-html")?.value || "";
  const css = card.querySelector(".css-live-css")?.value || "";
  const preview = card.querySelector(".css-live-preview");
  if (preview) preview.srcdoc = buildPreviewDoc(html, css);
}

function updateAllLivePreviews() {
  document.querySelectorAll(".css-lesson-card").forEach(updateLessonPreview);
}

function checkLesson(card, lesson) {
  const css = card.querySelector(".css-live-css")?.value.toLowerCase().replace(/\s+/g, " ") || "";
  return lesson.patterns.every(pattern => css.includes(pattern.toLowerCase()));
}

function updateCssProgressBar(progress) {
  const bar = document.querySelector("#cssProgressBar");
  const text = document.querySelector("#cssProgressText");
  const completed = CSS_LESSONS.filter(lesson => progress.completedLessons?.includes(lesson.id)).length;
  const pct = Math.round((completed / CSS_LESSONS.length) * 100);
  if (bar) bar.style.width = `${pct}%`;
  if (text) text.textContent = `${completed} of ${CSS_LESSONS.length} CSS lessons complete (${pct}%)`;
}

async function refreshCssProgress() {
  const progress = await loadProgress();
  completedSet = new Set(progress.completedLessons || []);
  updateCssProgressBar(progress);
  renderLessons();
}

function renderReference(items = CSS_PROPERTIES) {
  const el = document.querySelector("#cssReferenceBody");
  if (!el) return;
  if (!items.length) {
    el.innerHTML = `<tr><td colspan="5">No CSS properties found.</td></tr>`;
    return;
  }
  el.innerHTML = items.map(item => `
    <tr>
      <td><code>${escapeHtml(item.property)}</code></td>
      <td><code>${escapeHtml(item.syntax)}</code></td>
      <td>${escapeHtml(item.values)}</td>
      <td>${escapeHtml(item.support)}</td>
      <td><code>${escapeHtml(item.example)}</code></td>
    </tr>
  `).join("");
}

function renderCheatSheet() {
  const el = document.querySelector("#cssCheatSheetContent");
  if (!el) return;
  el.innerHTML = CSS_CHEAT_SHEET.map(category => `
    <article class="cheat-category reveal visible">
      <h3>${escapeHtml(category.category)}</h3>
      <div class="cheat-items">
        ${category.items.map(item => `
          <div class="cheat-item">
            <code>${escapeHtml(item.tag)}</code>
            <span>${escapeHtml(item.desc)}</span>
          </div>
        `).join("")}
      </div>
    </article>
  `).join("");
}

function renderProjects() {
  const el = document.querySelector("#cssProjectsContent");
  if (!el) return;
  el.innerHTML = CSS_PROJECTS.map(project => `
    <article class="project-card reveal visible">
      <div class="project-meta">
        <span class="badge">${escapeHtml(project.level)}</span>
        <span class="badge ghost">${escapeHtml(project.time)}</span>
      </div>
      <h3>${escapeHtml(project.title)}</h3>
      <p>${escapeHtml(project.description)}</p>
      <ol class="project-steps">
        ${project.steps.map(step => `<li>${escapeHtml(step)}</li>`).join("")}
      </ol>
      <div class="skill-tags">
        ${project.skills.map(skill => `<span class="skill-tag">${escapeHtml(skill)}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickQuestions(level) {
  const bank = CSS_QUIZ_BANK[level] || [];
  const count = CSS_QUIZ_LEVELS.find(item => item.id === level)?.questionCount || 6;
  return shuffle(bank).slice(0, Math.min(count, bank.length));
}

function renderCssQuizTabs() {
  const tabs = document.querySelector("#cssQuizLevelTabs");
  if (!tabs) return;
  tabs.innerHTML = CSS_QUIZ_LEVELS.map(level => `
    <button class="quiz-tab ${cssQuizState.level === level.id ? "active" : ""}" data-css-quiz-level="${level.id}" type="button">
      ${escapeHtml(level.label)}
    </button>
  `).join("");
}

function renderCssQuiz() {
  const quizBox = document.querySelector("#cssQuizBox");
  const resultBox = document.querySelector("#cssQuizResult");
  if (!quizBox || !resultBox) return;

  if (cssQuizState.finished) {
    const pct = Math.round((cssQuizState.score / cssQuizState.questions.length) * 100);
    quizBox.hidden = true;
    resultBox.hidden = false;
    resultBox.innerHTML = `
      <div class="quiz-result-card reveal visible">
        <p class="eyebrow">CSS Quiz Complete</p>
        <h3>${escapeHtml(CSS_QUIZ_LEVELS.find(item => item.id === cssQuizState.level)?.label || "CSS Quiz")}</h3>
        <div class="result-score">
          <span class="result-percent">${pct}%</span>
          <span class="result-detail">${cssQuizState.score} out of ${cssQuizState.questions.length} correct</span>
        </div>
        <p class="result-message">${pct >= 70 ? "Strong CSS instincts. Keep building projects." : "Review the CSS lessons, then try this level again."}</p>
        <button class="btn primary" id="retryCssQuiz" type="button">Try Again</button>
      </div>
    `;
    resultBox.querySelector("#retryCssQuiz")?.addEventListener("click", () => startCssQuiz(cssQuizState.level));
    return;
  }

  quizBox.hidden = false;
  resultBox.hidden = true;
  const quiz = cssQuizState.questions[cssQuizState.index];
  if (!quiz) return;

  document.querySelector("#cssQuestionCount").textContent = `Question ${cssQuizState.index + 1} of ${cssQuizState.questions.length}`;
  document.querySelector("#cssScoreText").textContent = `Score: ${cssQuizState.score}`;
  document.querySelector("#cssQuizQuestion").textContent = quiz.question;
  document.querySelector("#cssQuizExplanation").textContent = "";
  document.querySelector("#cssQuizOptions").innerHTML = quiz.options.map((option, index) => `
    <button class="quiz-option" type="button" data-index="${index}">${escapeHtml(option)}</button>
  `).join("");
  document.querySelector("#cssNextQuestion").textContent = cssQuizState.index === cssQuizState.questions.length - 1 ? "Finish Quiz" : "Next Question";
  cssQuizState.answered = false;
}

function startCssQuiz(level) {
  cssQuizState = {
    level,
    questions: pickQuestions(level),
    index: 0,
    score: 0,
    answered: false,
    finished: false
  };
  renderCssQuizTabs();
  renderCssQuiz();
}

async function finishCssQuiz() {
  cssQuizState.finished = true;
  const pct = Math.round((cssQuizState.score / cssQuizState.questions.length) * 100);
  await saveQuizScore(cssQuizState.level, cssQuizState.score, cssQuizState.questions.length, pct);
  showToast(`CSS quiz saved! You scored ${pct}%`, "success");
  renderCssQuiz();
}

export function initCssLearning() {
  renderRoadmap();
  renderReference();
  renderCheatSheet();
  renderProjects();
  refreshCssProgress();
  startCssQuiz("css-beginner");

  document.querySelector("#cssReferenceSearch")?.addEventListener("input", event => {
    const query = event.target.value.toLowerCase().trim();
    const filtered = CSS_PROPERTIES.filter(item => Object.values(item).join(" ").toLowerCase().includes(query));
    renderReference(filtered);
  });

  document.querySelector("#cssLessonsContent")?.addEventListener("input", event => {
    const card = event.target.closest(".css-lesson-card");
    if (card) updateLessonPreview(card);
  });

  document.querySelector("#cssLessonsContent")?.addEventListener("click", async event => {
    const card = event.target.closest(".css-lesson-card");
    if (!card) return;
    const id = event.target.closest("[data-css-lesson]")?.dataset.cssLesson;
    const lesson = CSS_LESSONS.find(item => item.id === id);
    if (!lesson) return;

    if (event.target.closest(".css-check")) {
      const feedback = document.querySelector(`#css-feedback-${id}`);
      const correct = checkLesson(card, lesson);
      if (feedback) {
        feedback.textContent = correct ? "Nice. Your CSS includes the key pattern for this lesson." : "Almost there. Compare your CSS with the goal and example.";
        feedback.className = `practice-feedback ${correct ? "success" : "error"}`;
      }
      await savePracticeAttempt(id, correct);
      if (correct) showToast("CSS practice completed!", "success");
    }

    if (event.target.closest(".css-mark-complete")) {
      await markLessonComplete(id);
      const progress = await loadProgress();
      completedSet.add(id);
      updateCssProgressBar(progress);
      const status = card.querySelector(".lesson-status");
      const button = card.querySelector(".css-mark-complete");
      if (status) {
        status.textContent = "Completed";
        status.classList.add("complete");
      }
      if (button) button.textContent = "Completed";
      showToast("CSS lesson marked complete!", "success");
    }
  });

  document.querySelector("#cssQuizLevelTabs")?.addEventListener("click", event => {
    const tab = event.target.closest("[data-css-quiz-level]");
    if (tab) startCssQuiz(tab.dataset.cssQuizLevel);
  });

  document.querySelector("#cssQuizOptions")?.addEventListener("click", event => {
    const option = event.target.closest(".quiz-option");
    if (!option || cssQuizState.answered) return;
    cssQuizState.answered = true;
    const chosen = Number(option.dataset.index);
    const quiz = cssQuizState.questions[cssQuizState.index];
    const buttons = [...document.querySelectorAll("#cssQuizOptions .quiz-option")];

    buttons.forEach((button, index) => {
      button.classList.toggle("correct", index === quiz.answer);
      button.disabled = true;
    });
    if (chosen === quiz.answer) {
      cssQuizState.score += 1;
    } else {
      option.classList.add("wrong");
    }
    document.querySelector("#cssScoreText").textContent = `Score: ${cssQuizState.score}`;
    document.querySelector("#cssQuizExplanation").textContent = quiz.explanation;
  });

  document.querySelector("#cssNextQuestion")?.addEventListener("click", () => {
    if (!cssQuizState.answered) return;
    if (cssQuizState.index >= cssQuizState.questions.length - 1) {
      finishCssQuiz();
    } else {
      cssQuizState.index += 1;
      renderCssQuiz();
    }
  });
}
