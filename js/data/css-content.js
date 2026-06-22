export const CSS_ROADMAP = [
  "Selectors",
  "Box Model",
  "Colors & Typography",
  "Flexbox",
  "Grid",
  "Responsive Design",
  "Transitions & Animations",
  "CSS Variables",
  "Best Practices"
];

export const CSS_LESSONS = [
  {
    id: "css-selectors",
    title: "Selectors",
    summary: "Target elements with type, class, id, grouped, descendant, and state selectors.",
    explanation: "CSS selectors choose which HTML elements receive a style rule. Start with element selectors, then use classes for reusable styling and pseudo-classes for states like hover or focus.",
    code: ".card {\n  padding: 1rem;\n}\n\n.card:hover {\n  border-color: #45f5a7;\n}",
    html: "<article class=\"card\">\n  <h3>Profile Card</h3>\n  <p>Hover over this card.</p>\n</article>",
    css: ".card {\n  max-width: 260px;\n  padding: 20px;\n  border: 2px solid #94a3b8;\n  border-radius: 8px;\n  font-family: system-ui;\n}\n.card:hover {\n  border-color: #45f5a7;\n}",
    goal: "Style the .card selector and add a hover state.",
    patterns: [".card", ":hover"]
  },
  {
    id: "css-box-model",
    title: "Box Model",
    summary: "Control content, padding, border, and margin with predictable sizing.",
    explanation: "Every element is a box. Padding creates inner space, borders wrap the padding, and margin creates space outside the element. box-sizing: border-box makes layouts easier to reason about.",
    code: "* {\n  box-sizing: border-box;\n}\n\n.panel {\n  padding: 24px;\n  border: 1px solid #ddd;\n  margin: 16px;\n}",
    html: "<div class=\"panel\">Box model practice</div>",
    css: "* { box-sizing: border-box; }\n.panel {\n  width: 260px;\n  padding: 24px;\n  border: 4px solid #4fc3ff;\n  margin: 20px;\n  background: #e6fff6;\n}",
    goal: "Use padding, border, margin, and box-sizing.",
    patterns: ["padding", "border", "margin", "box-sizing"]
  },
  {
    id: "css-colors-typography",
    title: "Colors & Typography",
    summary: "Choose readable colors, font stacks, size, line height, and weight.",
    explanation: "Good typography is mostly restraint: readable font sizes, comfortable line height, enough contrast, and consistent weights. Use CSS colors with named colors, hex, rgb, hsl, or custom properties.",
    code: "body {\n  color: #10201c;\n  font-family: Inter, system-ui, sans-serif;\n  line-height: 1.6;\n}",
    html: "<section class=\"article-copy\">\n  <h3>Readable CSS</h3>\n  <p>Typography makes content easier to scan and understand.</p>\n</section>",
    css: ".article-copy {\n  color: #17231f;\n  font-family: Georgia, serif;\n  line-height: 1.7;\n}\n.article-copy h3 {\n  color: #008f62;\n  font-size: 28px;\n}",
    goal: "Set color, font-family, font-size, and line-height.",
    patterns: ["color", "font-family", "font-size", "line-height"]
  },
  {
    id: "css-flexbox",
    title: "Flexbox",
    summary: "Align items in one dimension for navbars, toolbars, cards, and centering.",
    explanation: "Flexbox lays items in a row or column and distributes space along one axis. It is ideal for navigation bars, button groups, and vertically centering content.",
    code: ".nav {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}",
    html: "<nav class=\"demo-nav\"><strong>Logo</strong><a>Docs</a><a>Practice</a><button>Start</button></nav>",
    css: ".demo-nav {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 14px;\n  background: #10201c;\n  color: white;\n}\n.demo-nav a { color: #45f5a7; }",
    goal: "Use display flex with alignment, spacing, and distribution.",
    patterns: ["display: flex", "align-items", "justify-content", "gap"]
  },
  {
    id: "css-grid",
    title: "Grid",
    summary: "Build two-dimensional layouts with rows, columns, and responsive tracks.",
    explanation: "CSS Grid controls rows and columns together. Use repeat(), minmax(), and gap to build responsive galleries, dashboards, and page layouts.",
    code: ".gallery {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}",
    html: "<div class=\"gallery\"><span>One</span><span>Two</span><span>Three</span><span>Four</span></div>",
    css: ".gallery {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 12px;\n}\n.gallery span {\n  padding: 24px;\n  background: #dff8ff;\n  border: 1px solid #4fc3ff;\n}",
    goal: "Create a grid with columns and gap.",
    patterns: ["display: grid", "grid-template-columns", "gap"]
  },
  {
    id: "css-responsive",
    title: "Responsive Design",
    summary: "Use fluid layouts and media queries so pages work on every screen.",
    explanation: "Responsive CSS starts with flexible widths, then uses media queries to adjust layout when the screen changes. Design for small screens first, then enhance larger screens.",
    code: ".layout {\n  display: grid;\n  gap: 1rem;\n}\n\n@media (min-width: 720px) {\n  .layout { grid-template-columns: 1fr 1fr; }\n}",
    html: "<div class=\"layout\"><article>Lesson</article><article>Preview</article></div>",
    css: ".layout { display: grid; gap: 12px; }\n.layout article { padding: 24px; background: #e6fff6; }\n@media (min-width: 720px) {\n  .layout { grid-template-columns: 1fr 1fr; }\n}",
    goal: "Add a media query that changes the layout.",
    patterns: ["@media", "grid-template-columns"]
  },
  {
    id: "css-animations",
    title: "Transitions & Animations",
    summary: "Add motion that communicates state without distracting users.",
    explanation: "Transitions animate changes between states, such as hover color. Keyframe animations define multi-step movement. Keep motion fast, purposeful, and respectful.",
    code: ".button {\n  transition: transform 200ms ease;\n}\n\n.button:hover {\n  transform: translateY(-2px);\n}",
    html: "<button class=\"motion-btn\">Hover me</button>",
    css: ".motion-btn {\n  padding: 12px 18px;\n  border: 0;\n  border-radius: 8px;\n  background: #45f5a7;\n  transition: transform 200ms ease, box-shadow 200ms ease;\n}\n.motion-btn:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 10px 24px #0002;\n}",
    goal: "Use transition and transform on hover.",
    patterns: ["transition", ":hover", "transform"]
  },
  {
    id: "css-variables",
    title: "CSS Variables",
    summary: "Store reusable design values for colors, spacing, and themes.",
    explanation: "Custom properties begin with -- and are read with var(). They make themes and repeated values easier to maintain.",
    code: ":root {\n  --accent: #45f5a7;\n}\n\n.button {\n  background: var(--accent);\n}",
    html: "<button class=\"variable-btn\">Theme Button</button>",
    css: ":root { --accent: #45f5a7; --ink: #10201c; }\n.variable-btn {\n  padding: 12px 18px;\n  color: var(--ink);\n  background: var(--accent);\n  border: 0;\n  border-radius: 8px;\n}",
    goal: "Create and use a CSS custom property.",
    patterns: ["--", "var("]
  },
  {
    id: "css-best-practices",
    title: "Best Practices",
    summary: "Write CSS that is readable, reusable, accessible, and maintainable.",
    explanation: "Prefer class selectors, meaningful names, consistent spacing, accessible contrast, and reusable tokens. Avoid over-specific selectors and large inline style blocks.",
    code: ".profile-card__title {\n  margin: 0;\n  color: var(--text);\n}",
    html: "<article class=\"profile-card\"><h3 class=\"profile-card__title\">Clean CSS</h3><p>Readable styles scale.</p></article>",
    css: ".profile-card {\n  max-width: 280px;\n  padding: 20px;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n}\n.profile-card__title {\n  margin: 0 0 8px;\n  color: #008f62;\n}",
    goal: "Use class selectors and consistent reusable styles.",
    patterns: [".profile-card", "border-radius", "color"]
  }
];

export const CSS_PROPERTIES = [
  { property: "color", syntax: "color: <color>;", values: "named, hex, rgb(), hsl(), var()", support: "All modern browsers", example: "color: #45f5a7;" },
  { property: "background", syntax: "background: <color|image|gradient>;", values: "color, url(), linear-gradient()", support: "All modern browsers", example: "background: linear-gradient(135deg, #45f5a7, #4fc3ff);" },
  { property: "font-family", syntax: "font-family: <family-list>;", values: "system-ui, serif, sans-serif, custom fonts", support: "All modern browsers", example: "font-family: Inter, system-ui, sans-serif;" },
  { property: "font-size", syntax: "font-size: <length|percentage|keyword>;", values: "rem, px, em, %, clamp()", support: "All modern browsers", example: "font-size: 1.25rem;" },
  { property: "line-height", syntax: "line-height: <number|length>;", values: "1.5, 24px, normal", support: "All modern browsers", example: "line-height: 1.6;" },
  { property: "margin", syntax: "margin: <length>;", values: "px, rem, %, auto", support: "All modern browsers", example: "margin: 0 auto;" },
  { property: "padding", syntax: "padding: <length>;", values: "px, rem, %, logical values", support: "All modern browsers", example: "padding: 1rem 1.25rem;" },
  { property: "border", syntax: "border: <width> <style> <color>;", values: "solid, dashed, none", support: "All modern browsers", example: "border: 1px solid #94a3b8;" },
  { property: "border-radius", syntax: "border-radius: <length>;", values: "px, rem, %, logical corners", support: "All modern browsers", example: "border-radius: 8px;" },
  { property: "display", syntax: "display: <keyword>;", values: "block, inline, flex, grid, none", support: "All modern browsers", example: "display: flex;" },
  { property: "gap", syntax: "gap: <length>;", values: "px, rem, row/column gap", support: "Modern browsers", example: "gap: 16px;" },
  { property: "grid-template-columns", syntax: "grid-template-columns: <track-list>;", values: "1fr, repeat(), minmax()", support: "Modern browsers", example: "grid-template-columns: repeat(3, 1fr);" },
  { property: "justify-content", syntax: "justify-content: <alignment>;", values: "start, center, space-between, end", support: "Modern browsers", example: "justify-content: space-between;" },
  { property: "align-items", syntax: "align-items: <alignment>;", values: "stretch, center, start, end", support: "Modern browsers", example: "align-items: center;" },
  { property: "position", syntax: "position: <keyword>;", values: "static, relative, absolute, fixed, sticky", support: "All modern browsers", example: "position: sticky;" },
  { property: "z-index", syntax: "z-index: <integer>;", values: "auto, 0, 10, 100", support: "All modern browsers", example: "z-index: 100;" },
  { property: "transition", syntax: "transition: <property> <duration> <timing>;", values: "all 200ms ease, transform 180ms", support: "All modern browsers", example: "transition: transform 200ms ease;" },
  { property: "transform", syntax: "transform: <function>;", values: "translate(), scale(), rotate()", support: "All modern browsers", example: "transform: translateY(-2px);" },
  { property: "animation", syntax: "animation: <name> <duration> <timing>;", values: "keyframe name, duration, iteration", support: "All modern browsers", example: "animation: fade 400ms ease;" },
  { property: "box-shadow", syntax: "box-shadow: <offset-x> <offset-y> <blur> <color>;", values: "none, shadow lists", support: "All modern browsers", example: "box-shadow: 0 12px 30px #0002;" },
  { property: "overflow", syntax: "overflow: <keyword>;", values: "visible, hidden, auto, scroll", support: "All modern browsers", example: "overflow: auto;" },
  { property: "object-fit", syntax: "object-fit: <keyword>;", values: "cover, contain, fill", support: "Modern browsers", example: "object-fit: cover;" },
  { property: "aspect-ratio", syntax: "aspect-ratio: <ratio>;", values: "1 / 1, 16 / 9, auto", support: "Modern browsers", example: "aspect-ratio: 16 / 9;" },
  { property: "var()", syntax: "property: var(--token, fallback);", values: "custom property references", support: "Modern browsers", example: "color: var(--accent);" }
];

export const CSS_CHEAT_SHEET = [
  { category: "Selectors", items: [
    { tag: "p", desc: "Targets every paragraph" },
    { tag: ".card", desc: "Targets elements with class card" },
    { tag: "#hero", desc: "Targets one id" },
    { tag: ".nav a:hover", desc: "Targets links on hover inside nav" }
  ]},
  { category: "Box Model", items: [
    { tag: "box-sizing: border-box;", desc: "Include padding and border in width" },
    { tag: "margin: 0 auto;", desc: "Center fixed-width blocks" },
    { tag: "padding: 1rem;", desc: "Add inner spacing" },
    { tag: "border-radius: 8px;", desc: "Round corners" }
  ]},
  { category: "Typography", items: [
    { tag: "font-family: system-ui;", desc: "Use a system font stack" },
    { tag: "font-size: 1rem;", desc: "Set text size" },
    { tag: "line-height: 1.6;", desc: "Improve readability" },
    { tag: "font-weight: 700;", desc: "Make text bold" }
  ]},
  { category: "Flexbox", items: [
    { tag: "display: flex;", desc: "Enable one-dimensional layout" },
    { tag: "align-items: center;", desc: "Align cross axis" },
    { tag: "justify-content: space-between;", desc: "Distribute main axis" },
    { tag: "gap: 12px;", desc: "Space flex children" }
  ]},
  { category: "Grid", items: [
    { tag: "display: grid;", desc: "Enable two-dimensional layout" },
    { tag: "grid-template-columns: repeat(3, 1fr);", desc: "Create equal columns" },
    { tag: "minmax(0, 1fr)", desc: "Create flexible safe tracks" },
    { tag: "grid-column: span 2;", desc: "Span columns" }
  ]},
  { category: "Responsive", items: [
    { tag: "width: min(100%, 960px);", desc: "Fluid max width" },
    { tag: "@media (min-width: 768px)", desc: "Apply larger-screen rules" },
    { tag: "max-width: 100%;", desc: "Prevent overflow" },
    { tag: "repeat(auto-fit, minmax(220px, 1fr))", desc: "Responsive grid tracks" }
  ]},
  { category: "Motion", items: [
    { tag: "transition: transform 200ms ease;", desc: "Animate state changes" },
    { tag: "transform: translateY(-2px);", desc: "Move without layout shift" },
    { tag: "@keyframes fade", desc: "Define animation steps" },
    { tag: "animation: fade 300ms ease;", desc: "Run a keyframe animation" }
  ]},
  { category: "Variables", items: [
    { tag: "--accent: #45f5a7;", desc: "Declare a design token" },
    { tag: "color: var(--accent);", desc: "Use a design token" },
    { tag: "var(--space, 1rem)", desc: "Use fallback value" },
    { tag: "body.light { --bg: #fff; }", desc: "Theme by overriding tokens" }
  ]}
];

export const CSS_QUIZ_LEVELS = [
  { id: "css-beginner", label: "Beginner CSS", questionCount: 6 },
  { id: "css-intermediate", label: "Intermediate CSS", questionCount: 6 },
  { id: "css-advanced", label: "Advanced CSS", questionCount: 6 }
];

export const CSS_QUIZ_BANK = {
  "css-beginner": [
    { question: "Which selector targets all elements with class card?", options: [".card", "#card", "card", "*card"], answer: 0, explanation: ".card targets every element with class=\"card\"." },
    { question: "Which property changes text color?", options: ["color", "background", "font-style", "paint"], answer: 0, explanation: "The color property sets foreground text color." },
    { question: "Which property adds space inside an element?", options: ["padding", "margin", "outline", "gap"], answer: 0, explanation: "Padding adds inner space between content and border." },
    { question: "Which declaration enables Flexbox?", options: ["display: flex;", "layout: flex;", "position: flex;", "flex: display;"], answer: 0, explanation: "display: flex turns an element into a flex container." },
    { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style Syntax", "Computer Style System", "Coded Sheet Styles"], answer: 0, explanation: "CSS stands for Cascading Style Sheets." },
    { question: "Which selector targets an id named main?", options: ["#main", ".main", "main#", "id(main)"], answer: 0, explanation: "#main targets the element with id=\"main\"." }
  ],
  "css-intermediate": [
    { question: "Which property creates grid columns?", options: ["grid-template-columns", "grid-columns", "column-template", "display-columns"], answer: 0, explanation: "grid-template-columns defines the column tracks in CSS Grid." },
    { question: "What does box-sizing: border-box do?", options: ["Includes padding and border in the element size", "Removes margins", "Makes the box inline", "Disables borders"], answer: 0, explanation: "border-box makes width and height include content, padding, and border." },
    { question: "Which at-rule writes responsive breakpoints?", options: ["@media", "@screen", "@responsive", "@query"], answer: 0, explanation: "@media applies CSS only when media conditions match." },
    { question: "Which value spaces flex items with room between them?", options: ["space-between", "center-between", "gap-between", "around-center"], answer: 0, explanation: "justify-content: space-between distributes available space between flex items." },
    { question: "Which property animates hover changes smoothly?", options: ["transition", "transform", "animation-name", "motion"], answer: 0, explanation: "transition animates a property when its value changes." },
    { question: "Which unit is relative to the root font size?", options: ["rem", "px", "vh", "%"], answer: 0, explanation: "rem is relative to the root element font size." }
  ],
  "css-advanced": [
    { question: "How do you read a custom property named --accent?", options: ["var(--accent)", "use(--accent)", "$accent", "custom(--accent)"], answer: 0, explanation: "CSS custom properties are read with var(--name)." },
    { question: "Which grid function creates responsive lower and upper bounds?", options: ["minmax()", "clamp-grid()", "between()", "range()"], answer: 0, explanation: "minmax() defines a grid track's minimum and maximum size." },
    { question: "Which selector has the highest specificity?", options: ["#hero .card", ".hero .card", "section card", "*"], answer: 0, explanation: "ID selectors add more specificity than classes and elements." },
    { question: "Which transform avoids document layout recalculation for movement?", options: ["transform: translateX(10px)", "margin-left: 10px", "left: 10px", "padding-left: 10px"], answer: 0, explanation: "Transforms can move elements without changing normal document flow." },
    { question: "Which feature helps users who prefer less motion?", options: ["prefers-reduced-motion media query", "motion-safe selector only", "no-animation attribute", "disable-transition property"], answer: 0, explanation: "@media (prefers-reduced-motion: reduce) lets you reduce or remove motion." },
    { question: "What is a maintainable approach for theme colors?", options: ["Use CSS variables", "Repeat hex values everywhere", "Use inline styles", "Use ids for every color"], answer: 0, explanation: "Variables centralize theme values so they can be changed in one place." }
  ]
};

export const CSS_PROJECTS = [
  {
    title: "Style a Card Component",
    level: "Beginner",
    time: "25 minutes",
    description: "Create a clean content card with spacing, border, typography, and a call-to-action button.",
    steps: ["Create a card container with a class", "Add padding, border, and border-radius", "Style the heading and paragraph", "Add a button hover state"],
    skills: ["selectors", "box model", "typography", "hover"]
  },
  {
    title: "Build a Navbar with Flexbox",
    level: "Beginner",
    time: "35 minutes",
    description: "Build a horizontal navigation bar that aligns a logo, links, and a button.",
    steps: ["Set the nav to display flex", "Use align-items center", "Use gap for spacing", "Push the action button with margin-left auto or space-between"],
    skills: ["flexbox", "alignment", "spacing"]
  },
  {
    title: "Create a Responsive Grid Layout",
    level: "Intermediate",
    time: "45 minutes",
    description: "Create a gallery or course grid that adapts from one column to multiple columns.",
    steps: ["Create repeated card elements", "Set the parent to display grid", "Use repeat(auto-fit, minmax())", "Test narrow and wide screens"],
    skills: ["grid", "responsive design", "minmax"]
  },
  {
    title: "Animate a Button on Hover",
    level: "Intermediate",
    time: "20 minutes",
    description: "Add a polished hover effect with transform, transition, and shadow.",
    steps: ["Style a button base state", "Add transition", "Use :hover with transform", "Keep the motion subtle"],
    skills: ["transitions", "transform", "states"]
  }
];
