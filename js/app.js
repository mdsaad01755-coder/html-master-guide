import { initTheme, initNav, initReveal, initModals, initCodeCopyButtons } from "./modules/ui.js";
import { initTags } from "./modules/tags.js";
import { initLessons } from "./modules/lessons.js";
import { initPlayground } from "./modules/playground.js";
import { initQuiz } from "./modules/quiz.js";
import { initContent } from "./modules/content.js";
import { initAuthUI } from "./modules/auth-ui.js";
import { initCssLearning } from "./modules/css-learning.js";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNav();
  initModals();
  initAuthUI();
  initTags();
  initLessons();
  initPlayground();
  initQuiz();
  initContent();
  initCssLearning();
  initCodeCopyButtons();
  initReveal();
});
