/**
 * Virtual Console Module
 * Captures and displays console.log() output in the playground
 */

export function initVirtualConsole() {
  const consoleOutput = document.querySelector("#consoleOutput");
  const clearConsoleBtn = document.querySelector("#clearConsole");
  
  if (!consoleOutput) return;

  // Store original console methods
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalInfo = console.info;

  // Function to add message to console
  function addMessage(message, type = "log") {
    const line = document.createElement("div");
    line.className = `console-line console-${type}`;
    
    // Format the message
    let formattedMessage = message;
    if (typeof message === "object") {
      formattedMessage = JSON.stringify(message, null, 2);
    }
    
    line.textContent = formattedMessage;
    consoleOutput.appendChild(line);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  }

  // Override console methods
  console.log = function(...args) {
    originalLog.apply(console, args);
    args.forEach(arg => addMessage(arg, "log"));
  };

  console.error = function(...args) {
    originalError.apply(console, args);
    args.forEach(arg => addMessage(arg, "error"));
  };

  console.warn = function(...args) {
    originalWarn.apply(console, args);
    args.forEach(arg => addMessage(arg, "warn"));
  };

  console.info = function(...args) {
    originalInfo.apply(console, args);
    args.forEach(arg => addMessage(arg, "info"));
  };

  // Clear console button
  clearConsoleBtn?.addEventListener("click", () => {
    consoleOutput.innerHTML = "";
  });

  // Initial message
  addMessage("Console ready. Run your code to see output here.", "info");
}

/**
 * Clean up virtual console when switching contexts
 */
export function resetVirtualConsole() {
  const consoleOutput = document.querySelector("#consoleOutput");
  if (consoleOutput) {
    consoleOutput.innerHTML = "";
  }
}
