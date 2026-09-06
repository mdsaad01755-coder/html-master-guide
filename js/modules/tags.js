import { TAGS } from "../data/tags.js";
import { escapeHtml } from "./ui.js";

const tagList = document.querySelector("#tagList");
const tagSearch = document.querySelector("#tagSearch");

function renderTagRow(tag, index) {
  const mistakes = tag.mistakes.map(m => escapeHtml(m)).join("; ");
  return `
    <tr id="tag-${escapeHtml(tag.name)}" class="reference-row">
      <td><strong class="tag-name">&lt;${escapeHtml(tag.name)}&gt;</strong><span class="table-index">${String(index + 1).padStart(2, "0")}</span><small>${escapeHtml(tag.label)}</small></td>
      <td>${escapeHtml(tag.explanation)}</td>
      <td><code>${escapeHtml(tag.attributes)}</code></td>
      <td><code>${escapeHtml(tag.syntax)}</code></td>
      <td><pre class="table-code"><code>${escapeHtml(tag.example)}</code></pre></td>
      <td>${escapeHtml(tag.usage)}</td>
      <td><div class="output-preview">${tag.output}</div></td>
      <td>${mistakes}</td>
    </tr>
  `;
}

export function renderTags(items = TAGS) {
  if (!tagList) return;
  if (!items.length) {
    tagList.innerHTML = '<tr><td colspan="8" class="table-empty">No HTML tags found. Try another search keyword.</td></tr>';
    return;
  }
  tagList.innerHTML = items.map((tag, i) => renderTagRow(tag, i)).join("");
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
