import { QUIZ_BANK, QUIZ_LEVELS } from "../data/quizzes.js";
import { escapeHtml, showToast } from "./ui.js";
import { saveQuizScore } from "./progress.js";

let state = {
  level: "beginner",
  questions: [],
  index: 0,
  score: 0,
  answered: false,
  finished: false
};

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickQuestions(level) {
  const bank = QUIZ_BANK[level] || [];
  const count = QUIZ_LEVELS.find(l => l.id === level)?.questionCount || 8;
  return shuffle(bank).slice(0, Math.min(count, bank.length));
}

function renderLevelTabs() {
  const tabs = document.querySelector("#quizLevelTabs");
  if (!tabs) return;
  tabs.innerHTML = QUIZ_LEVELS.map(level => `
    <button class="quiz-tab ${state.level === level.id ? "active" : ""}" data-level="${level.id}" type="button">
      ${escapeHtml(level.label)}
    </button>
  `).join("");
}

function renderQuizUI() {
  const quizBox = document.querySelector("#quizBox");
  const resultBox = document.querySelector("#quizResult");
  if (!quizBox || !resultBox) return;

  if (state.finished) {
    quizBox.hidden = true;
    resultBox.hidden = false;
    const pct = Math.round((state.score / state.questions.length) * 100);
    resultBox.innerHTML = `
      <div class="quiz-result-card reveal visible">
        <p class="eyebrow">Quiz Complete</p>
        <h3>${escapeHtml(QUIZ_LEVELS.find(l => l.id === state.level)?.label || "Quiz")} Results</h3>
        <div class="result-score">
          <span class="result-percent">${pct}%</span>
          <span class="result-detail">${state.score} out of ${state.questions.length} correct</span>
        </div>
        <p class="result-message">${getResultMessage(pct)}</p>
        <div class="result-actions">
          <button class="btn primary" id="retryQuiz" type="button">Try Again</button>
          <button class="btn secondary" id="newLevelQuiz" type="button">Choose Another Level</button>
        </div>
      </div>
    `;
    resultBox.querySelector("#retryQuiz")?.addEventListener("click", () => startQuiz(state.level));
    resultBox.querySelector("#newLevelQuiz")?.addEventListener("click", () => {
      resultBox.hidden = true;
      quizBox.hidden = false;
      state.finished = false;
    });
    return;
  }

  quizBox.hidden = false;
  resultBox.hidden = true;

  const quiz = state.questions[state.index];
  const questionCount = document.querySelector("#questionCount");
  const scoreText = document.querySelector("#scoreText");
  const quizQuestion = document.querySelector("#quizQuestion");
  const quizOptions = document.querySelector("#quizOptions");
  const quizExplanation = document.querySelector("#quizExplanation");
  const nextBtn = document.querySelector("#nextQuestion");

  if (!quiz) return;

  questionCount.textContent = `Question ${state.index + 1} of ${state.questions.length}`;
  scoreText.textContent = `Score: ${state.score}`;
  quizQuestion.textContent = quiz.question;
  quizExplanation.textContent = "";
  quizOptions.innerHTML = quiz.options.map((opt, i) =>
    `<button class="quiz-option" type="button" data-index="${i}">${escapeHtml(opt)}</button>`
  ).join("");
  nextBtn.textContent = state.index === state.questions.length - 1 ? "Finish Quiz" : "Next Question";
  state.answered = false;
}

function getResultMessage(pct) {
  if (pct >= 90) return "Outstanding! You have mastered this level.";
  if (pct >= 70) return "Great work! Keep practicing to reach 100%.";
  if (pct >= 50) return "Good effort! Review the lessons and try again.";
  return "Keep learning! Go through the roadmap lessons and come back.";
}

async function finishQuiz() {
  state.finished = true;
  const pct = Math.round((state.score / state.questions.length) * 100);
  await saveQuizScore(state.level, state.score, state.questions.length, pct);
  showToast(`Quiz saved! You scored ${pct}%`, "success");
  renderQuizUI();
}

function startQuiz(level) {
  state = {
    level,
    questions: pickQuestions(level),
    index: 0,
    score: 0,
    answered: false,
    finished: false
  };
  renderLevelTabs();
  renderQuizUI();
}

export function initQuiz() {
  const tabs = document.querySelector("#quizLevelTabs");
  const quizOptions = document.querySelector("#quizOptions");
  const nextBtn = document.querySelector("#nextQuestion");

  tabs?.addEventListener("click", event => {
    const tab = event.target.closest(".quiz-tab");
    if (!tab) return;
    startQuiz(tab.dataset.level);
  });

  quizOptions?.addEventListener("click", event => {
    const option = event.target.closest(".quiz-option");
    if (!option || state.answered) return;

    state.answered = true;
    const chosen = Number(option.dataset.index);
    const quiz = state.questions[state.index];
    const buttons = [...quizOptions.querySelectorAll(".quiz-option")];

    buttons.forEach((btn, i) => {
      btn.classList.toggle("correct", i === quiz.answer);
      btn.disabled = true;
    });

    if (chosen === quiz.answer) {
      state.score += 1;
    } else {
      option.classList.add("wrong");
    }

    document.querySelector("#scoreText").textContent = `Score: ${state.score}`;
    document.querySelector("#quizExplanation").textContent = quiz.explanation;
  });

  nextBtn?.addEventListener("click", () => {
    if (!state.answered) return;
    if (state.index >= state.questions.length - 1) {
      finishQuiz();
    } else {
      state.index += 1;
      renderQuizUI();
    }
  });

  startQuiz("beginner");
}
