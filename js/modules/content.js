import { CHEAT_SHEET, COMMON_MISTAKES, MINI_PROJECTS, INTERVIEW_QUESTIONS, DEVELOPER_TIPS } from "../data/content.js";
import { escapeHtml } from "./ui.js";

export function initContent() {
  renderCheatSheet();
  renderMistakes();
  renderProjects();
  renderInterview();
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

function renderInterview() {
  const el = document.querySelector("#interviewContent");
  if (!el) return;
  el.innerHTML = INTERVIEW_QUESTIONS.map((q, i) => `
    <details class="interview-item reveal visible">
      <summary><span class="q-number">Q${i + 1}.</span> ${escapeHtml(q.question)}</summary>
      <p>${escapeHtml(q.answer)}</p>
    </details>
  `).join("");
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
