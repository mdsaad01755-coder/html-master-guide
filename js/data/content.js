export const CHEAT_SHEET = [
  { category: "Document Structure", items: [
    { tag: "<!DOCTYPE html>", desc: "Declares HTML5 document" },
    { tag: "<html lang=\"en\">", desc: "Root element with language" },
    { tag: "<head>", desc: "Metadata container" },
    { tag: "<body>", desc: "Visible page content" }
  ]},
  { category: "Text Content", items: [
    { tag: "<h1> to <h6>", desc: "Headings (h1 = most important)" },
    { tag: "<p>", desc: "Paragraph" },
    { tag: "<br>", desc: "Line break" },
    { tag: "<strong>", desc: "Important text" },
    { tag: "<em>", desc: "Emphasized text" }
  ]},
  { category: "Links and Media", items: [
    { tag: "<a href=\"url\">", desc: "Hyperlink" },
    { tag: "<img src=\"\" alt=\"\">", desc: "Image with alt text" },
    { tag: "<video controls>", desc: "Video player" },
    { tag: "<audio controls>", desc: "Audio player" }
  ]},
  { category: "Lists", items: [
    { tag: "<ul><li>", desc: "Unordered (bullet) list" },
    { tag: "<ol><li>", desc: "Ordered (numbered) list" }
  ]},
  { category: "Tables", items: [
    { tag: "<table>", desc: "Table container" },
    { tag: "<tr>", desc: "Table row" },
    { tag: "<th>", desc: "Header cell" },
    { tag: "<td>", desc: "Data cell" }
  ]},
  { category: "Forms", items: [
    { tag: "<form>", desc: "Form container" },
    { tag: "<input type=\"text\">", desc: "Text input" },
    { tag: "<textarea>", desc: "Multi-line text" },
    { tag: "<select><option>", desc: "Dropdown" },
    { tag: "<button type=\"submit\">", desc: "Submit button" },
    { tag: "<label for=\"id\">", desc: "Input label" }
  ]},
  { category: "Semantic Layout", items: [
    { tag: "<header>", desc: "Page or section header" },
    { tag: "<nav>", desc: "Navigation links" },
    { tag: "<main>", desc: "Main content (once per page)" },
    { tag: "<article>", desc: "Self-contained content" },
    { tag: "<section>", desc: "Themed content section" },
    { tag: "<aside>", desc: "Sidebar content" },
    { tag: "<footer>", desc: "Page or section footer" }
  ]}
];

export const COMMON_MISTAKES = [
  {
    title: "Missing closing tags",
    description: "Every opening tag like <p>, <div>, or <li> needs a matching closing tag like </p>, </div>, or </li>.",
    wrong: "<p>Hello\n<p>World",
    right: "<p>Hello</p>\n<p>World</p>",
    tip: "Indent your code — misaligned tags are easy to spot."
  },
  {
    title: "Incorrect nesting",
    description: "Tags must close in reverse order of how they open. You cannot close an outer tag before an inner tag.",
    wrong: "<p><strong>Text</p></strong>",
    right: "<p><strong>Text</strong></p>",
    tip: "Think of tags like nested boxes — close the inner box first."
  },
  {
    title: "Using headings for font size",
    description: "Do not use <h1> just because you want big text. Headings define structure, not appearance.",
    wrong: "<h1>Contact Us</h1>\n<h1>About Us</h1>",
    right: "<h1>My Website</h1>\n<h2>Contact Us</h2>\n<h2>About Us</h2>",
    tip: "Use CSS font-size for visual styling, not heading levels."
  },
  {
    title: "Missing alt text on images",
    description: "Images without alt text are invisible to screen readers and show nothing when the image fails to load.",
    wrong: "<img src=\"photo.jpg\">",
    right: "<img src=\"photo.jpg\" alt=\"Team photo at the office\">",
    tip: "Describe what the image shows, not just 'image' or 'photo'."
  },
  {
    title: "Broken links",
    description: "Links without href, with typos in URLs, or pointing to missing pages frustrate users.",
    wrong: "<a>Click here</a>",
    right: "<a href=\"/about\">Read about us</a>",
    tip: "Use descriptive link text instead of 'click here'."
  },
  {
    title: "Tables for layout",
    description: "Using tables to position page elements is outdated and breaks on mobile devices.",
    wrong: "<table><tr><td>Sidebar</td><td>Content</td></tr></table>",
    right: "<div class=\"layout\"><aside>Sidebar</aside><main>Content</main></div>",
    tip: "Use CSS Grid or Flexbox for page layout. Tables are for data only."
  },
  {
    title: "Inline styles everywhere",
    description: "Putting style=\"...\" on every element makes code hard to maintain and update.",
    wrong: "<p style=\"color:red\"><span style=\"font-size:20px\">Text</span></p>",
    right: "<p class=\"highlight\">Text</p>  /* styles in CSS file */",
    tip: "Keep HTML for structure. Move all visual styles to a CSS file."
  },
  {
    title: "Skipping label on form inputs",
    description: "Inputs without labels are hard to use for people with screen readers and unclear for everyone.",
    wrong: "<input type=\"email\" placeholder=\"Email\">",
    right: "<label for=\"email\">Email</label>\n<input type=\"email\" id=\"email\">",
    tip: "Every input needs a visible label connected with for and id."
  }
];

export const MINI_PROJECTS = [
  {
    title: "Personal Profile Page",
    level: "Beginner",
    time: "30 minutes",
    description: "Build a simple about-me page with your name, photo, bio, and social links.",
    steps: ["Create the HTML skeleton with head and body", "Add an h1 with your name", "Add a paragraph bio and an image", "Add links to your social profiles"],
    skills: ["headings", "paragraphs", "images", "links"]
  },
  {
    title: "Recipe Card",
    level: "Beginner",
    time: "25 minutes",
    description: "Create a recipe page with ingredients list, steps, and a photo of the dish.",
    steps: ["Use h1 for the recipe name", "Create an unordered list for ingredients", "Create an ordered list for cooking steps", "Add an image with alt text"],
    skills: ["lists", "images", "headings"]
  },
  {
    title: "Contact Form",
    level: "Intermediate",
    time: "45 minutes",
    description: "Build a contact form with name, email, message fields, and a submit button.",
    steps: ["Wrap fields in a form tag", "Add labels linked to each input", "Use appropriate input types", "Add a submit button"],
    skills: ["forms", "inputs", "labels", "buttons"]
  },
  {
    title: "Blog Article Layout",
    level: "Intermediate",
    time: "50 minutes",
    description: "Structure a blog post using semantic HTML: header, article, sections, and footer.",
    steps: ["Use header with site name and nav", "Wrap the post in article", "Split content into section tags", "Add a footer with copyright"],
    skills: ["semantic elements", "headings", "navigation"]
  },
  {
    title: "Product Comparison Table",
    level: "Intermediate",
    time: "40 minutes",
    description: "Create a pricing table comparing three products with features and prices.",
    steps: ["Build a table with thead and tbody", "Use th for feature names", "Add td cells for each product", "Include a caption describing the table"],
    skills: ["tables", "headings", "semantic structure"]
  },
  {
    title: "Accessible Landing Page",
    level: "Advanced",
    time: "90 minutes",
    description: "Build a complete landing page with proper SEO meta tags, semantic layout, and full accessibility.",
    steps: ["Add title and meta description", "Use landmark elements (main, nav, footer)", "Ensure all images have alt text", "Validate with W3C validator"],
    skills: ["SEO", "accessibility", "semantic HTML", "best practices"]
  }
];

export const INTERVIEW_QUESTIONS = [
  {
    question: "What is the difference between HTML and CSS?",
    answer: "HTML structures the content of a webpage — headings, paragraphs, images, and links. CSS controls how that content looks — colors, fonts, spacing, and layout. They work together but serve different purposes."
  },
  {
    question: "What is semantic HTML and why does it matter?",
    answer: "Semantic HTML uses tags that describe the meaning of content, like article, nav, and main. It improves accessibility for screen readers, helps search engines understand your page, and makes code easier for developers to read."
  },
  {
    question: "What is the purpose of the alt attribute?",
    answer: "The alt attribute provides alternative text for images. Screen readers read it aloud for visually impaired users. It also displays when an image fails to load. Every meaningful image should have descriptive alt text."
  },
  {
    question: "What is the difference between div and span?",
    answer: "Both are generic containers. div is a block-level element — it takes the full width and starts on a new line. span is inline — it only takes up as much width as its content and stays on the same line."
  },
  {
    question: "What is the difference between ol and ul?",
    answer: "ul creates an unordered list with bullet points. ol creates an ordered list with numbers. Both require list items wrapped in li tags."
  },
  {
    question: "How do you make a form accessible?",
    answer: "Connect every input to a label using for and id attributes. Group related fields with fieldset and legend. Use appropriate input types. Mark required fields with the required attribute. Ensure the form can be navigated with a keyboard."
  },
  {
    question: "What is the HTML5 doctype and why is it needed?",
    answer: "<!DOCTYPE html> tells the browser to render the page in standards mode using HTML5 rules. Without it, browsers may use quirks mode and render pages inconsistently."
  },
  {
    question: "What is the difference between block and inline elements?",
    answer: "Block elements (div, p, h1, ul) start on a new line and take full available width. Inline elements (span, a, img, strong) flow within text and only take the space they need."
  },
  {
    question: "How do you embed a video in HTML?",
    answer: "Use the video tag with a src attribute pointing to the video file. Add the controls attribute so users can play and pause. Use source tags inside video to offer multiple formats for browser compatibility."
  },
  {
    question: "What are data attributes in HTML?",
    answer: "Data attributes (data-*) let you store custom information on HTML elements. For example, data-user-id='42' can be read by JavaScript without affecting how the element displays."
  }
];

export const DEVELOPER_TIPS = [
  {
    icon: "01",
    title: "Validate early, validate often",
    tip: "Run your HTML through the W3C validator after every major change. Fixing one error early prevents ten problems later."
  },
  {
    icon: "02",
    title: "Think structure before style",
    tip: "Write your HTML as if CSS does not exist. If the page makes sense without styles, your structure is solid."
  },
  {
    icon: "03",
    title: "Use the browser DevTools",
    tip: "Press F12 to inspect any webpage. Study how professional sites structure their HTML — it is the best free learning resource."
  },
  {
    icon: "04",
    title: "One thing per commit",
    tip: "When learning, save your work frequently. Build one feature at a time: first the skeleton, then headings, then images."
  },
  {
    icon: "05",
    title: "Read your code aloud",
    tip: "If you cannot explain what a tag does in plain English, you may be using the wrong tag. Clarity beats cleverness."
  },
  {
    icon: "06",
    title: "Mobile-first mindset",
    tip: "Even when writing HTML only, think about how content flows on a small screen. Semantic order matters for mobile readers."
  },
  {
    icon: "07",
    title: "Comments are for humans",
    tip: "Use <!-- section: contact form --> to mark major areas. Future you (and teammates) will thank you."
  },
  {
    icon: "08",
    title: "Practice with real projects",
    tip: "Rebuild a simple page you use daily — a login screen, a todo list, a profile card. Real context makes learning stick."
  }
];
