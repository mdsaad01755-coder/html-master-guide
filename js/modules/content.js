import { CHEAT_SHEET, COMMON_MISTAKES, MINI_PROJECTS, INTERVIEW_QUESTIONS, DEVELOPER_TIPS } from "../data/content.js";
import { escapeHtml } from "./ui.js";

let interviewDifficulty = "all";
let interviewQuery = "";

export function initContent() {
  renderCheatSheet();
  renderMistakes();
  renderProjects();
  renderInterview();
  initInterviewControls();
  renderTips();
}

function renderCheatSheet() {
  const el = document.querySelector("#cheatSheetContent");
  if (!el) return;
  el.innerHTML = CHEAT_SHEET.map(cat => `
    <article class="cheat-category reveal visible">
      <h3>${escapeHtml(cat.category)}</h3>
      <div class="cheat-items">
        ${cat.items.map(item => `
          <div class="cheat-item">
            <code>${escapeHtml(item.tag)}</code>
            <span>${escapeHtml(item.desc)}</span>
          </div>
        `).join("")}
      </div>
    </article>
  `).join("");
}

function renderMistakes() {
  const el = document.querySelector("#mistakesContent");
  if (!el) return;
  el.innerHTML = COMMON_MISTAKES.map(m => `
    <article class="mistake-card reveal visible">
      <h3>${escapeHtml(m.title)}</h3>
      <p>${escapeHtml(m.description)}</p>
      <div class="mistake-compare">
        <div class="mistake-wrong">
          <p class="tag-label">Wrong</p>
          <pre class="code-block"><code>${escapeHtml(m.wrong)}</code></pre>
        </div>
        <div class="mistake-right">
          <p class="tag-label">Right</p>
          <pre class="code-block"><code>${escapeHtml(m.right)}</code></pre>
        </div>
      </div>
      <p class="mistake-tip"><strong>Tip:</strong> ${escapeHtml(m.tip)}</p>
    </article>
  `).join("");
}

function renderProjects() {
  const el = document.querySelector("#projectsContent");
  if (!el) return;
  el.innerHTML = MINI_PROJECTS.map(p => `
    <article class="project-card reveal visible">
      <div class="project-meta">
        <span class="badge">${escapeHtml(p.level)}</span>
        <span class="badge ghost">${escapeHtml(p.time)}</span>
      </div>
      <h3>${escapeHtml(p.title)}</h3>
      <p>${escapeHtml(p.description)}</p>
      <ol class="project-steps">
        ${p.steps.map(s => `<li>${escapeHtml(s)}</li>`).join("")}
      </ol>
      <div class="skill-tags">
        ${p.skills.map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function getQuestionDifficulty(question, index) {
  if (question.difficulty) return question.difficulty;
  if (index < 4) return "beginner";
  if (index < 8) return "intermediate";
  return "advanced";
}

function renderInterview() {
  const el = document.querySelector("#interviewContent");
  if (!el) return;
  const filtered = INTERVIEW_QUESTIONS
    .map((question, index) => ({ ...question, index, difficulty: getQuestionDifficulty(question, index) }))
    .filter(q => interviewDifficulty === "all" || q.difficulty === interviewDifficulty)
    .filter(q => {
      const haystack = `${q.question} ${q.answer} ${q.difficulty}`.toLowerCase();
      return haystack.includes(interviewQuery);
    });

  if (!filtered.length) {
    el.innerHTML = '<p class="notice">No interview questions match that filter.</p>';
    return;
  }

  el.innerHTML = filtered.map(q => `
    <details class="interview-item reveal visible">
      <summary><span class="q-number">Q${q.index + 1}.</span> ${escapeHtml(q.question)} <span class="badge ghost">${escapeHtml(q.difficulty)}</span></summary>
      <p>${escapeHtml(q.answer)}</p>
    </details>
  `).join("");
}

function initInterviewControls() {
  const filters = document.querySelector("#interviewDifficultyFilters");
  const search = document.querySelector("#interviewSearch");

  filters?.addEventListener("click", event => {
    const button = event.target.closest("[data-difficulty]");
    if (!button) return;
    interviewDifficulty = button.dataset.difficulty;
    filters.querySelectorAll("[data-difficulty]").forEach(item => {
      item.classList.toggle("active", item === button);
    });
    renderInterview();
  });

  search?.addEventListener("input", () => {
    interviewQuery = search.value.trim().toLowerCase();
    renderInterview();
  });
}

function renderTips() {
  const el = document.querySelector("#tipsContent");
  if (!el) return;
  el.innerHTML = DEVELOPER_TIPS.map(t => `
    <article class="tip-card reveal visible">
      <span class="tip-icon">${escapeHtml(t.icon)}</span>
      <h3>${escapeHtml(t.title)}</h3>
      <p>${escapeHtml(t.tip)}</p>
    </article>
  `).join("");
}
