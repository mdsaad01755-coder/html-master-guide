export const JS_ROADMAP = [
  "Variables & Data Types",
  "Functions & Scope",
  "Control Flow (If/Else, Loops)",
  "Arrays & Objects",
  "DOM Manipulation",
  "Events & Listeners",
  "Asynchronous JS (Fetch/Async/Await)",
  "ES6+ Features",
  "Best Practices"
];

export const JS_LESSONS = [
  {
    id: "js-variables",
    title: "Variables & Data Types",
    summary: "Store data using let, const, and var. Understand strings, numbers, booleans, and null/undefined.",
    explanation: "Variables are containers for storing data values. Use 'const' for values that won't change and 'let' for values that will. JavaScript is dynamic, meaning variables can hold any type of data.",
    code: "const name = 'Saad';\nlet age = 25;\nage = 26; // allowed\n// name = 'Ali'; // error",
    html: "<div id=\"output\">Hello, Guest!</div>",
    js: "const name = 'Saad';\nlet age = 25;\ndocument.getElementById('output').innerText = `Hello, ${name}! You are ${age} years old.`;",
    goal: "Change the variable values and see the output update.",
    patterns: ["const", "let", "innerText"]
  },
  {
    id: "js-functions",
    title: "Functions & Scope",
    summary: "Write reusable code blocks and understand where variables are accessible.",
    explanation: "Functions allow you to group code together and run it whenever you need. Scope determines where your variables can be seen (global vs local).",
    code: "function greet(user) {\n  return `Welcome, ${user}!`;\n}\nconsole.log(greet('Saad'));",
    html: "<button id=\"btn\">Click Me</button>\n<p id=\"msg\"></p>",
    js: "function showMessage() {\n  document.getElementById('msg').innerText = 'Button was clicked!';\n}\ndocument.getElementById('btn').onclick = showMessage;",
    goal: "Create a function and link it to a button click.",
    patterns: ["function", "onclick"]
  },
  {
    id: "js-dom",
    title: "DOM Manipulation",
    summary: "Select and modify HTML elements dynamically.",
    explanation: "The Document Object Model (DOM) is the data representation of the objects that comprise the structure and content of a document on the web. You can use JS to change styles, text, and structure.",
    code: "const el = document.querySelector('.title');\nel.style.color = 'red';\nel.textContent = 'Updated Title';",
    html: "<h1 id=\"title\">Old Title</h1>\n<button id=\"change\">Change Title</button>",
    js: "const btn = document.getElementById('change');\nbtn.onclick = () => {\n  const title = document.getElementById('title');\n  title.innerText = 'New Title';\n  title.style.color = '#45f5a7';\n};",
    goal: "Change the text and color of the heading.",
    patterns: ["getElementById", "style.color", "innerText"]
  },
  {
    id: "js-arrays",
    title: "Arrays & Objects",
    summary: "Work with collections of data using arrays and key-value pairs with objects.",
    explanation: "Arrays store multiple values in a single variable. Objects store data as key-value pairs. Both are essential for organizing and managing complex data.",
    code: "const fruits = ['Apple', 'Banana', 'Orange'];\nconst user = { name: 'Saad', age: 25, city: 'NYC' };\nconsole.log(fruits[0]);\nconsole.log(user.name);",
    html: "<ul id=\"list\"></ul>\n<div id=\"info\"></div>",
    js: "const items = ['Learn', 'Practice', 'Build'];\nconst list = document.getElementById('list');\nitems.forEach(item => {\n  const li = document.createElement('li');\n  li.textContent = item;\n  list.appendChild(li);\n});",
    goal: "Create a list by looping through an array.",
    patterns: ["forEach", "createElement", "appendChild"]
  },
  {
    id: "js-events",
    title: "Events & Event Listeners",
    summary: "Respond to user interactions like clicks, typing, and form submissions.",
    explanation: "Events are actions or occurrences that happen in the browser. You can listen for these events and run code in response using addEventListener.",
    code: "const btn = document.getElementById('myBtn');\nbtn.addEventListener('click', () => {\n  console.log('Button clicked!');\n});",
    html: "<input type=\"text\" id=\"input\" placeholder=\"Type something...\">\n<p id=\"display\"></p>",
    js: "const input = document.getElementById('input');\nconst display = document.getElementById('display');\ninput.addEventListener('input', (e) => {\n  display.textContent = `You typed: ${e.target.value}`;\n});",
    goal: "Type in the input and see the text appear below in real-time.",
    patterns: ["addEventListener", "event.target", "input event"]
  },
  {
    id: "js-async",
    title: "Asynchronous JavaScript",
    summary: "Handle operations that take time, like fetching data from APIs.",
    explanation: "Asynchronous code allows your program to continue running while waiting for operations to complete. Use async/await for cleaner, more readable code.",
    code: "async function fetchData() {\n  const response = await fetch('https://api.example.com/data');\n  const data = await response.json();\n  console.log(data);\n}",
    html: "<button id=\"fetchBtn\">Fetch Data</button>\n<div id=\"result\"></div>",
    js: "document.getElementById('fetchBtn').addEventListener('click', async () => {\n  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');\n  const data = await response.json();\n  document.getElementById('result').innerHTML = `<p>${data.title}</p>`;\n});",
    goal: "Click the button to fetch and display data from an API.",
    patterns: ["async", "await", "fetch"]
  }
];

export const JS_CONCEPTS = [
  { property: "console.log()", syntax: "console.log(value);", values: "any data type", support: "All browsers", example: "console.log('Hello World');" },
  { property: "const / let", syntax: "const x = 10; let y = 20;", values: "immutable / mutable", support: "ES6+", example: "const pi = 3.14;" },
  { property: "Arrow Functions", syntax: "const fn = () => {};", values: "shorthand syntax", support: "ES6+", example: "const add = (a, b) => a + b;" },
  { property: "addEventListener", syntax: "el.addEventListener(event, fn);", values: "click, submit, etc.", support: "All browsers", example: "btn.addEventListener('click', run);" },
  { property: "fetch()", syntax: "fetch(url).then(...);", values: "API endpoints", support: "Modern browsers", example: "fetch('/api/data').then(res => res.json());" }
];

export const JS_CHEAT_SHEET = [
  { category: "Basics", items: [
    { tag: "let x = 5;", desc: "Declare a reassignable variable" },
    { tag: "const y = 10;", desc: "Declare a constant variable" },
    { tag: "// comment", desc: "Single line comment" },
    { tag: "/* comment */", desc: "Multi-line comment" }
  ]},
  { category: "DOM", items: [
    { tag: "document.getElementById()", desc: "Select element by ID" },
    { tag: "el.innerText = 'hi';", desc: "Change text content" },
    { tag: "el.style.display = 'none';", desc: "Hide an element" },
    { tag: "el.classList.add('active');", desc: "Add a CSS class" }
  ]}
];

export const JS_QUIZ_LEVELS = [
  { id: "js-beginner", label: "Beginner JS", questionCount: 5 },
  { id: "js-advanced", label: "Advanced JS", questionCount: 5 }
];

export const JS_QUIZ_BANK = {
  "js-beginner": [
    { question: "Which keyword is used to declare a constant?", options: ["var", "let", "const", "constant"], answer: 2, explanation: "const is used for values that should not be reassigned." },
    { question: "How do you select an element with ID 'app'?", options: [".getElementById('app')", "#getElementById('app')", "getElementById('app')", "document.getElementById('app')"], answer: 3, explanation: "document.getElementById is the standard way to select by ID." },
    { question: "What is the output of console.log(typeof 'hello')?", options: ["string", "text", "String", "object"], answer: 0, explanation: "The typeof operator returns 'string' for text values." },
    { question: "How do you add an element to the end of an array?", options: ["push()", "add()", "append()", "insert()"], answer: 0, explanation: "The push() method adds elements to the end of an array." },
    { question: "Which method is used to execute a function after a delay?", options: ["wait()", "delay()", "setTimeout()", "pause()"], answer: 2, explanation: "setTimeout() executes code after a specified number of milliseconds." }
  ],
  "js-advanced": [
    { question: "What does 'this' refer to in a global context?", options: ["The function", "The window object", "Undefined", "Null"], answer: 1, explanation: "In a browser, 'this' in the global scope refers to the window object." },
    { question: "What is the difference between == and ===?", options: ["No difference", "== checks type, === doesn't", "=== checks type, == doesn't", "=== is faster"], answer: 2, explanation: "=== is strict equality (checks both value and type), while == is loose equality (type coercion)." },
    { question: "How do you create a Promise?", options: ["new Promise()", "Promise()", "createPromise()", "promise()"], answer: 0, explanation: "Promises are created using the 'new' keyword: new Promise((resolve, reject) => {})." },
    { question: "What is the purpose of async/await?", options: ["To make code faster", "To handle asynchronous operations more readably", "To replace callbacks", "To create loops"], answer: 1, explanation: "async/await provides a cleaner way to handle asynchronous code compared to .then() chains." },
    { question: "What does Array.map() do?", options: ["Finds elements", "Transforms each element and returns a new array", "Filters elements", "Sorts elements"], answer: 1, explanation: "map() creates a new array by applying a function to each element of the original array." }
  ]
};

export const JS_PROJECTS = [
  {
    level: "Beginner",
    time: "30 mins",
    title: "Digital Clock",
    description: "Create a clock that updates every second using setInterval.",
    steps: ["Create a div for the clock", "Use new Date() to get time", "Update innerText every 1000ms"],
    skills: ["DOM", "Intervals", "Date Object"]
  }
];
