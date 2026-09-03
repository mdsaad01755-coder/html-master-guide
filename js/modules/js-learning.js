import {
  JS_ROADMAP,
  JS_LESSONS,
  JS_CONCEPTS,
  JS_CHEAT_SHEET,
  JS_QUIZ_LEVELS,
  JS_QUIZ_BANK,
  JS_PROJECTS
} from "../data/js-content.js";
import { escapeHtml, showToast, renderHighlightedCode } from "./ui.js";
import { loadProgress, markLessonComplete, savePracticeAttempt, saveQuizScore } from "./progress.js";

let completedSet = new Set();
let jsQuizState = {
  level: "js-beginner",
  questions: [],
  index: 0,
  score: 0,
  answered: false,
  finished: false
};

function buildPreviewDoc(html, js) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; padding: 18px; font-family: system-ui, sans-serif; color: #10201c; }
  </style>
</head>
<body>
  ${html}
  <script>
    try {
      ${js}
    } catch (err) {
      console.error(err);
      document.body.innerHTML += '<p style="color:red;font-family:monospace;margin-top:20px;">Error: ' + err.message + '</p>';
    }
  </script>
</body>
</html>`;
}

function renderRoadmap() {
  const el = document.querySelector("#jsRoadmapContent");
  if (!el) return;
  el.innerHTML = JS_ROADMAP.map((item, index) => `
    <li>
      <span class="roadmap-step">${String(index + 1).padStart(2, "0")}</span>
      <strong>${escapeHtml(item)}</strong>
    </li>
  `).join("");
}

function renderLessons() {
  const el = document.querySelector("#jsLessonsContent");
  if (!el) return;
  el.innerHTML = JS_LESSONS.map((lesson, index) => {
    const isComplete = completedSet.has(lesson.id);
    return `
      <article class="lesson-card js-lesson-card ${isComplete ? "complete" : ""} reveal visible" data-js-lesson="${lesson.id}" id="js-lesson-${lesson.id}">
        <div class="lesson-header">
          <span class="lesson-number">JS Lesson ${index + 1}</span>
          <span class="lesson-status ${isComplete ? "complete" : ""}">${isComplete ? "Completed" : "In Progress"}</span>
        </div>
        <h3>${escapeHtml(lesson.title)}</h3>
        <p class="lesson-summary">${escapeHtml(lesson.summary)}</p>
        <p class="muted">${escapeHtml(lesson.explanation)}</p>
        <div class="tag-section">
          <p class="tag-label">Example</p>
          <pre class="code-block"><code>${renderHighlightedCode(lesson.code, "javascript")}</code></pre>
        </div>
        <div class="css-live-lab">
          <div class="editor-panel">
            <div class="panel-title">HTML</div>
            <textarea class="js-live-html" spellcheck="false" aria-label="${escapeHtml(lesson.title)} HTML editor">${escapeHtml(lesson.html)}</textarea>
          </div>
          <div class="editor-panel">
            <div class="panel-title">JavaScript</div>
            <textarea class="js-live-js" spellcheck="false" aria-label="${escapeHtml(lesson.title)} JS editor">${escapeHtml(lesson.js)}</textarea>
          </div>
          <div class="preview-panel">
            <div class="panel-title">Live Preview</div>
            <iframe class="js-live-preview" title="${escapeHtml(lesson.title)} live preview"></iframe>
          </div>
        </div>
        <div class="practice-box">
          <p><strong>Goal:</strong> ${escapeHtml(lesson.goal)}</p>
          <div class="practice-actions">
            <button class="btn primary small js-check" data-js-lesson="${lesson.id}" type="button">Check JS</button>
            <button class="btn ghost small js-mark-complete" data-js-lesson="${lesson.id}" type="button">${isComplete ? "Completed" : "Mark as complete"}</button>
          </div>
          <p class="practice-feedback" id="js-feedback-${lesson.id}" aria-live="polite"></p>
        </div>
      </article>
    `;
  }).join("");
  updateAllLivePreviews();
  document.dispatchEvent(new CustomEvent("html-master:content-rendered"));
}

function updateLessonPreview(card) {
  const html = card.querySelector(".js-live-html")?.value || "";
  const js = card.querySelector(".js-live-js")?.value || "";
  const preview = card.querySelector(".js-live-preview");
  if (preview) preview.srcdoc = buildPreviewDoc(html, js);
}

function updateAllLivePreviews() {
  document.querySelectorAll(".js-lesson-card").forEach(updateLessonPreview);
}

function checkLesson(card, lesson) {
  const js = card.querySelector(".js-live-js")?.value.toLowerCase().replace(/\s+/g, " ") || "";
  return lesson.patterns.every(pattern => js.includes(pattern.toLowerCase()));
}

function updateJsProgressBar(progress) {
  const container = document.querySelector(".js-section .progress-tracker");
  if (!container) return;
  const completed = JS_LESSONS.filter(lesson => (progress.completedLessons || []).includes(lesson.id)).length;
  const total = JS_LESSONS.length;
  const pct = Math.round((completed / total) * 100);
  const completedIds = new Set(progress.completedLessons || []);
  container.innerHTML = `
    <div class="progress-info">
      <span class="progress-count">${completed} of ${total} JS lessons complete</span>
      <span class="progress-percentage">${pct}%</span>
    </div>
    <div class="progress-bar-wrap"><div class="progress-bar" style="width: ${pct}%"></div></div>
    <nav class="sticky-nav" aria-label="JavaScript lesson navigation">
      ${JS_LESSONS.map((lesson, index) => {
        const done = completedIds.has(lesson.id);
        return `<a class="sticky-nav-item ${done ? "complete" : ""}" href="#js-lesson-${lesson.id}" aria-label="JavaScript lesson ${index + 1}${done ? ", complete" : ""}">${done ? "✓" : index + 1}</a>`;
      }).join("")}
    </nav>
  `;
}

async function refreshJsProgress() {
  const progress = await loadProgress();
  completedSet = new Set(progress.completedLessons || []);
  updateJsProgressBar(progress);
  renderLessons();
}

function renderReference(items = JS_CONCEPTS) {
  const el = document.querySelector("#jsReferenceBody");
  if (!el) return;
  if (!items.length) {
    el.innerHTML = `<tr><td colspan="5">No JS concepts found.</td></tr>`;
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
  const el = document.querySelector("#jsCheatSheetContent");
  if (!el) return;
  el.innerHTML = JS_CHEAT_SHEET.map(category => `
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
  const el = document.querySelector("#jsProjectsContent");
  if (!el) return;
  el.innerHTML = JS_PROJECTS.map(project => `
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
  const bank = JS_QUIZ_BANK[level] || [];
  const count = JS_QUIZ_LEVELS.find(item => item.id === level)?.questionCount || 5;
  return shuffle(bank).slice(0, Math.min(count, bank.length));
}

function renderJsQuizTabs() {
  const tabs = document.querySelector("#jsQuizLevelTabs");
  if (!tabs) return;
  tabs.innerHTML = JS_QUIZ_LEVELS.map(level => `
    <button class="quiz-tab ${jsQuizState.level === level.id ? "active" : ""}" data-js-quiz-level="${level.id}" type="button">
      ${escapeHtml(level.label)}
    </button>
  `).join("");
}

function renderJsQuiz() {
  const quizBox = document.querySelector("#jsQuizBox");
  const resultBox = document.querySelector("#jsQuizResult");
  if (!quizBox || !resultBox) return;

  if (jsQuizState.finished) {
    const pct = Math.round((jsQuizState.score / jsQuizState.questions.length) * 100);
    quizBox.hidden = true;
    resultBox.hidden = false;
    resultBox.innerHTML = `
      <div class="quiz-result-card reveal visible">
        <p class="eyebrow">JS Quiz Complete</p>
        <h3>${escapeHtml(JS_QUIZ_LEVELS.find(item => item.id === jsQuizState.level)?.label || "JS Quiz")}</h3>
        <div class="result-score">
          <span class="result-percent">${pct}%</span>
          <span class="result-detail">${jsQuizState.score} out of ${jsQuizState.questions.length} correct</span>
        </div>
        <p class="result-message">${pct >= 70 ? "Excellent! You have a solid grasp of JavaScript." : "Keep practicing the JS lessons and try again."}</p>
        <button class="btn primary" id="retryJsQuiz" type="button">Try Again</button>
      </div>
    `;
    resultBox.querySelector("#retryJsQuiz")?.addEventListener("click", () => startJsQuiz(jsQuizState.level));
    return;
  }

  quizBox.hidden = false;
  resultBox.hidden = true;
  const quiz = jsQuizState.questions[jsQuizState.index];
  if (!quiz) return;

  document.querySelector("#jsQuestionCount").textContent = `Question ${jsQuizState.index + 1} of ${jsQuizState.questions.length}`;
  document.querySelector("#jsScoreText").textContent = `Score: ${jsQuizState.score}`;
  document.querySelector("#jsQuizQuestion").textContent = quiz.question;
  document.querySelector("#jsQuizExplanation").textContent = "";
  document.querySelector("#jsQuizOptions").innerHTML = quiz.options.map((option, index) => `
    <button class="quiz-option" type="button" data-index="${index}">${escapeHtml(option)}</button>
  `).join("");
  document.querySelector("#jsNextQuestion").textContent = jsQuizState.index === jsQuizState.questions.length - 1 ? "Finish Quiz" : "Next Question";
  jsQuizState.answered = false;
}

function startJsQuiz(level) {
  jsQuizState = {
    level,
    questions: pickQuestions(level),
    index: 0,
    score: 0,
    answered: false,
    finished: false
  };
  renderJsQuizTabs();
  renderJsQuiz();
}

async function finishJsQuiz() {
  jsQuizState.finished = true;
  const pct = Math.round((jsQuizState.score / jsQuizState.questions.length) * 100);
  await saveQuizScore(jsQuizState.level, jsQuizState.score, jsQuizState.questions.length, pct);
  showToast(`JS quiz saved! You scored ${pct}%`, "success");
  renderJsQuiz();
}

export function initJsLearning() {
  renderRoadmap();
  renderReference();
  renderCheatSheet();
  renderProjects();
  refreshJsProgress();
  startJsQuiz("js-beginner");

  document.querySelector("#jsReferenceSearch")?.addEventListener("input", event => {
    const query = event.target.value.toLowerCase().trim();
    const filtered = JS_CONCEPTS.filter(item => Object.values(item).join(" ").toLowerCase().includes(query));
    renderReference(filtered);
  });

  document.querySelector("#jsLessonsContent")?.addEventListener("input", event => {
    const card = event.target.closest(".js-lesson-card");
    if (card) updateLessonPreview(card);
  });

  document.querySelector("#jsLessonsContent")?.addEventListener("click", async event => {
    const card = event.target.closest(".js-lesson-card");
    if (!card) return;
    const id = event.target.closest("[data-js-lesson]")?.dataset.jsLesson;
    const lesson = JS_LESSONS.find(item => item.id === id);
    if (!lesson) return;

    if (event.target.closest(".js-check")) {
      const feedback = document.querySelector(`#js-feedback-${id}`);
      const correct = checkLesson(card, lesson);
      if (feedback) {
        feedback.textContent = correct ? "Correct! You used the required JS patterns." : "Not quite. Check your code and try again.";
        feedback.className = `practice-feedback ${correct ? "success" : "error"}`;
      }
      await savePracticeAttempt(id, correct);
      if (correct) showToast("JS practice completed!", "success");
    }

    if (event.target.closest(".js-mark-complete")) {
      await markLessonComplete(id);
      const progress = await loadProgress();
      completedSet.add(id);
      updateJsProgressBar(progress);
      const status = card.querySelector(".lesson-status");
      const button = card.querySelector(".js-mark-complete");
      if (status) {
        status.textContent = "Completed";
        status.classList.add("complete");
      }
      if (button) button.textContent = "Completed";
      showToast("JS lesson marked complete!", "success");
    }
  });

  document.querySelector("#jsQuizLevelTabs")?.addEventListener("click", event => {
    const tab = event.target.closest("[data-js-quiz-level]");
    if (tab) startJsQuiz(tab.dataset.jsQuizLevel);
  });

  document.querySelector("#jsQuizOptions")?.addEventListener("click", event => {
    const option = event.target.closest(".quiz-option");
    if (!option || jsQuizState.answered) return;
    jsQuizState.answered = true;
    const chosen = Number(option.dataset.index);
    const quiz = jsQuizState.questions[jsQuizState.index];
    const buttons = [...document.querySelectorAll("#jsQuizOptions .quiz-option")];

    buttons.forEach((button, index) => {
      button.classList.toggle("correct", index === quiz.answer);
      button.disabled = true;
    });
    if (chosen === quiz.answer) {
      jsQuizState.score += 1;
    } else {
      option.classList.add("wrong");
    }
    document.querySelector("#jsScoreText").textContent = `Score: ${jsQuizState.score}`;
    document.querySelector("#jsQuizExplanation").textContent = quiz.explanation;
  });

  document.querySelector("#jsNextQuestion")?.addEventListener("click", () => {
    if (!jsQuizState.answered) return;
    if (jsQuizState.index >= jsQuizState.questions.length - 1) {
      finishJsQuiz();
    } else {
      jsQuizState.index += 1;
      renderJsQuiz();
    }
  });
}
