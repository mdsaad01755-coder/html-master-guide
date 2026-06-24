import { TAGS } from "../data/tags.js";
import { escapeHtml } from "./ui.js";

const tagList = document.querySelector("#tagList");
const tagSearch = document.querySelector("#tagSearch");

function renderTagCard(tag, index) {
  const mistakes = tag.mistakes.map(m => `<li>${escapeHtml(m)}</li>`).join("");
  return `
    <article class="tag-card reveal visible" id="tag-${tag.name}">
      <div class="tag-head">
        <h3><span class="tag-index">${index + 1}.</span> <span class="tag-name">&lt;${escapeHtml(tag.name)}&gt;</span> ${escapeHtml(tag.label)}</h3>
        <span class="tag-attrs">${escapeHtml(tag.attributes)}</span>
      </div>
      <div class="tag-section">
        <p class="tag-label">Explanation:</p>
        <p>${escapeHtml(tag.explanation)}</p>
      </div>
      <div class="tag-section">
        <p class="tag-label">Syntax:</p>
        <pre class="code-block"><code>${escapeHtml(tag.syntax)}</code></pre>
      </div>
      <div class="tag-section">
        <p class="tag-label">Example:</p>
        <pre class="code-block"><code>${escapeHtml(tag.example)}</code></pre>
      </div>
      <div class="tag-grid">
        <div class="tag-section">
          <p class="tag-label">Output:</p>
          <div class="output-preview">${tag.output}</div>
        </div>
        <div class="tag-section">
          <p class="tag-label">Usage:</p>
          <p>${escapeHtml(tag.usage)}</p>
        </div>
      </div>
      <div class="tag-section">
        <p class="tag-label">Common mistakes:</p>
        <ul class="mistake-list">${mistakes}</ul>
      </div>
    </article>
  `;
}

export function renderTags(items = TAGS) {
  if (!tagList) return;
  if (!items.length) {
    tagList.innerHTML = '<p class="notice">No tags found. Try another search keyword.</p>';
    return;
  }
  tagList.innerHTML = items.map((tag, i) => renderTagCard(tag, i)).join("");
  document.dispatchEvent(new CustomEvent("html-master:content-rendered"));
}

export function initTags() {
  tagSearch?.addEventListener("input", () => {
    const query = tagSearch.value.toLowerCase().trim();
    const filtered = TAGS.filter(tag =>
      [tag.name, tag.label, tag.explanation, tag.usage, tag.attributes]
        .join(" ").toLowerCase().includes(query)
    );
    renderTags(filtered);
  });
  renderTags();
}
