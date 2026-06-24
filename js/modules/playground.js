import { savePlaygroundProject } from "./progress.js";
import { showToast } from "./ui.js";

const PLAYGROUND_DRAFT_KEY = "html-master-playground-draft";

const STARTER_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Project</title>
</head>
<body>
  <h1>Hello HTML Learner</h1>
  <p>Edit this code, then click Run.</p>
</body>
</html>`;

const STARTER_CSS = `body {
  font-family: system-ui, sans-serif;
  padding: 20px;
  background: #f0f4f8;
}

h1 {
  color: #2563eb;
}`;

const STARTER_JS = `// Write JavaScript here
document.querySelector("h1").addEventListener("click", () => {
  alert("You clicked the heading!");
});`;

export function initPlayground() {
  const htmlEditor = document.querySelector("#htmlEditor");
  const cssEditor = document.querySelector("#cssEditor");
  const jsEditor = document.querySelector("#jsEditor");
  const preview = document.querySelector("#previewFrame");
  const runCode = document.querySelector("#runCode");
  const resetCode = document.querySelector("#resetCode");
  const saveProject = document.querySelector("#saveProject");

  if (!htmlEditor || !preview) return;

  function buildDocument() {
    const html = htmlEditor.value;
    const css = cssEditor?.value || "";
    const js = jsEditor?.value || "";
    const hasFullDoc = /<html[\s>]/i.test(html);

    if (hasFullDoc) {
      let doc = html;
      if (css) {
        doc = doc.replace(/<\/head>/i, `<style>${css}</style></head>`);
      }
      if (js) {
        doc = doc.replace(/<\/body>/i, `<script>${js}<\/script></body>`);
      }
      return doc;
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>${css}</style>
</head>
<body>
${html}
<script>${js}<\/script>
</body>
</html>`;
  }

  function runPreview() {
    preview.srcdoc = buildDocument();
  }

  function saveDraft() {
    localStorage.setItem(PLAYGROUND_DRAFT_KEY, JSON.stringify({
      html: htmlEditor.value,
      css: cssEditor?.value || "",
      js: jsEditor?.value || ""
    }));
  }

  function loadDraft() {
    try {
      return JSON.parse(localStorage.getItem(PLAYGROUND_DRAFT_KEY));
    } catch {
      return null;
    }
  }

  const draft = loadDraft();
  htmlEditor.value = draft?.html || STARTER_HTML;
  if (cssEditor) cssEditor.value = draft?.css || STARTER_CSS;
  if (jsEditor) jsEditor.value = draft?.js || STARTER_JS;
  runPreview();

  runCode?.addEventListener("click", runPreview);
  resetCode?.addEventListener("click", () => {
    htmlEditor.value = STARTER_HTML;
    if (cssEditor) cssEditor.value = STARTER_CSS;
    if (jsEditor) jsEditor.value = STARTER_JS;
    saveDraft();
    runPreview();
    showToast("Playground reset", "info");
  });

  saveProject?.addEventListener("click", async () => {
    const name = prompt("Project name:", "My HTML Project");
    if (!name) return;
    await savePlaygroundProject(name, htmlEditor.value, cssEditor?.value || "", jsEditor?.value || "");
    showToast(`Project "${name}" saved!`, "success");
  });

  let debounce;
  [htmlEditor, cssEditor, jsEditor].forEach(editor => {
    editor?.addEventListener("input", () => {
      saveDraft();
      clearTimeout(debounce);
      debounce = setTimeout(runPreview, 600);
    });

    editor?.addEventListener("keydown", event => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        runPreview();
        showToast("Code ran", "success");
      }
    });
  });
}
