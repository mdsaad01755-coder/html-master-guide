export const LESSON_LEVELS = [
  { id: "beginner", label: "Beginner Level", color: "level-beginner" },
  { id: "intermediate", label: "Intermediate Level", color: "level-intermediate" },
  { id: "advanced", label: "Advanced Level", color: "level-advanced" }
];

export const LESSONS = [
  {
    id: "html-intro",
    level: "beginner",
    title: "HTML Introduction",
    summary: "Learn what HTML is and why every website needs it.",
    content: [
      "HTML stands for HyperText Markup Language. It is the standard language used to create web pages.",
      "HTML is not a programming language. It is a markup language that tells the browser what content exists on a page.",
      "Every website you visit — Google, YouTube, Facebook — uses HTML as its foundation.",
      "HTML works together with CSS (for design) and JavaScript (for interactivity) to build complete websites."
    ],
    keyPoints: ["HTML structures content", "Browsers read HTML to display pages", "HTML5 is the current standard"],
    practice: {
      task: "Write a simple HTML comment that says 'My first webpage'.",
      starter: "<!-- Write your comment here -->\n",
      patterns: ["<!--", "My first webpage", "-->"],
      success: "Correct! Great job — you wrote your first HTML comment.",
      fail: "Try again. Use the comment syntax: <!-- your text here -->"
    }
  },
  {
    id: "basic-structure",
    level: "beginner",
    title: "Basic Structure",
    summary: "Build a valid HTML page with the essential skeleton.",
    content: [
      "Every HTML page follows a basic structure with key parts: doctype, html, head, and body.",
      "The <!DOCTYPE html> declaration tells the browser this is an HTML5 document.",
      "The <head> section holds metadata like the page title. The <body> holds everything users see.",
      "A minimal page needs these four parts to work correctly in all browsers."
    ],
    keyPoints: ["<!DOCTYPE html> is required", "<head> for metadata", "<body> for visible content"],
    practice: {
      task: "Create a basic HTML page with a title 'My Page' inside the head section.",
      starter: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  \n</head>\n<body>\n</body>\n</html>",
      patterns: ["<title>", "My Page", "</title>"],
      success: "Correct! Great job — your page has a proper title.",
      fail: "Try again. Add <title>My Page</title> inside the <head> section."
    }
  },
  {
    id: "headings",
    level: "beginner",
    title: "Headings",
    summary: "Use h1 to h6 to organize your page content.",
    content: [
      "Headings create a clear hierarchy on your page. There are six levels: h1 through h6.",
      "Use only one <h1> per page — it represents the main topic.",
      "Use <h2> for major sections and <h3> for subsections beneath them.",
      "Headings help screen readers and search engines understand your page structure."
    ],
    keyPoints: ["One h1 per page", "h2 for sections", "Never skip heading levels"],
    practice: {
      task: "Create a main heading that says 'Welcome to HTML'.",
      starter: "",
      patterns: ["<h1>", "Welcome to HTML", "</h1>"],
      success: "Correct! Great job — you created a proper main heading.",
      fail: "Try again. Wrap your text in <h1>Welcome to HTML</h1>."
    }
  },
  {
    id: "paragraphs",
    level: "beginner",
    title: "Paragraphs",
    summary: "Write readable text content with the paragraph tag.",
    content: [
      "The <p> tag defines a paragraph of text on your webpage.",
      "Browsers automatically add space before and after each paragraph.",
      "Always close your paragraph with </p> — unclosed tags cause layout problems.",
      "Use separate <p> tags for separate ideas, not <br> tags for spacing."
    ],
    keyPoints: ["Always close </p>", "One idea per paragraph", "Do not use br for spacing"],
    practice: {
      task: "Create a paragraph using HTML that says 'I am learning HTML'.",
      starter: "",
      patterns: ["<p>", "I am learning HTML", "</p>"],
      success: "Correct! Great job — your paragraph is perfect.",
      fail: "Try again. Use <p>I am learning HTML</p>."
    }
  },
  {
    id: "links",
    level: "beginner",
    title: "Links",
    summary: "Connect pages together with hyperlinks.",
    content: [
      "The <a> tag creates a clickable link to another page, file, or section.",
      "The href attribute tells the browser where the link goes.",
      "Link text should describe the destination — avoid 'click here'.",
      "Use target=\"_blank\" with rel=\"noopener\" to open links safely in a new tab."
    ],
    keyPoints: ["href is required", "Descriptive link text", "Use rel=\"noopener\" for new tabs"],
    practice: {
      task: "Create a link to https://example.com with the text 'Visit Example'.",
      starter: "",
      patterns: ["<a", "href", "example.com", "Visit Example", "</a>"],
      success: "Correct! Great job — your link is properly built.",
      fail: "Try again. Use <a href=\"https://example.com\">Visit Example</a>."
    }
  },
  {
    id: "images",
    level: "beginner",
    title: "Images",
    summary: "Add pictures to your pages with the img tag.",
    content: [
      "The <img> tag embeds an image on your page. It does not need a closing tag.",
      "The src attribute points to the image file location.",
      "The alt attribute describes the image for screen readers and when images fail to load.",
      "Always include meaningful alt text — never leave it empty for important images."
    ],
    keyPoints: ["src points to the image", "alt is required for accessibility", "img is self-closing"],
    practice: {
      task: "Add an image with src='photo.jpg' and alt='My photo'.",
      starter: "",
      patterns: ["<img", "src", "photo.jpg", "alt", "My photo"],
      success: "Correct! Great job — your image tag is accessible.",
      fail: "Try again. Use <img src=\"photo.jpg\" alt=\"My photo\">."
    }
  },
  {
    id: "lists",
    level: "beginner",
    title: "Lists",
    summary: "Organize items with ordered and unordered lists.",
    content: [
      "Use <ul> for bullet lists and <ol> for numbered lists.",
      "Each item in a list goes inside an <li> tag.",
      "Lists can be nested inside other lists for sub-items.",
      "Never put plain text directly inside ul or ol — always wrap items in <li>."
    ],
    keyPoints: ["ul for bullets", "ol for numbers", "Items go in li tags"],
    practice: {
      task: "Create an unordered list with two items: 'HTML' and 'CSS'.",
      starter: "",
      patterns: ["<ul>", "<li>", "HTML", "<li>", "CSS", "</ul>"],
      success: "Correct! Great job — your list is well structured.",
      fail: "Try again. Use <ul><li>HTML</li><li>CSS</li></ul>."
    }
  },
  {
    id: "tables",
    level: "intermediate",
    title: "Tables",
    summary: "Display rows and columns of data with table tags.",
    content: [
      "Tables organize data into rows and columns using <table>, <tr>, <th>, and <td>.",
      "Use <th> for header cells and <td> for data cells.",
      "Group headers with <thead>, body rows with <tbody>, and footers with <tfoot>.",
      "Only use tables for tabular data — not for page layout."
    ],
    keyPoints: ["th for headers", "td for data", "Use thead and tbody for structure"],
    practice: {
      task: "Create a table with one header row containing 'Name' and one data row containing 'Alice'.",
      starter: "",
      patterns: ["<table>", "<th>", "Name", "<td>", "Alice"],
      success: "Correct! Great job — your table structure is correct.",
      fail: "Try again. Include <table>, <th>Name</th>, and <td>Alice</td>."
    }
  },
  {
    id: "forms",
    level: "intermediate",
    title: "Forms",
    summary: "Collect user input with HTML forms.",
    content: [
      "The <form> tag wraps all input fields that users fill out.",
      "The action attribute tells where form data is sent. method can be GET or POST.",
      "Every input should have a <label> connected with the for and id attributes.",
      "Group related fields with <fieldset> and <legend> for clarity."
    ],
    keyPoints: ["action and method on form", "Labels for every input", "fieldset groups related fields"],
    practice: {
      task: "Create a form that contains a text input and a submit button.",
      starter: "",
      patterns: ["<form", "<input", "<button", "</form>"],
      success: "Correct! Great job — your form is ready for user input.",
      fail: "Try again. Wrap an <input> and <button> inside a <form> tag."
    }
  },
  {
    id: "inputs",
    level: "intermediate",
    title: "Inputs",
    summary: "Use different input types for different data.",
    content: [
      "The <input> tag creates form controls. The type attribute sets the input kind.",
      "Common types: text, email, password, number, date, checkbox, and radio.",
      "Use the placeholder attribute to show hint text inside empty fields.",
      "The required attribute prevents form submission until the field is filled."
    ],
    keyPoints: ["type sets input behavior", "placeholder for hints", "required for mandatory fields"],
    practice: {
      task: "Create an email input with placeholder 'Enter your email'.",
      starter: "",
      patterns: ["<input", "type", "email", "placeholder", "Enter your email"],
      success: "Correct! Great job — your email input is set up correctly.",
      fail: "Try again. Use <input type=\"email\" placeholder=\"Enter your email\">."
    }
  },
  {
    id: "buttons",
    level: "intermediate",
    title: "Buttons",
    summary: "Add clickable buttons to forms and pages.",
    content: [
      "The <button> tag creates a clickable button on your page.",
      "Inside a form, type=\"submit\" sends the form. type=\"button\" runs JavaScript.",
      "Button text goes between the opening and closing tags — not in a value attribute.",
      "Always specify the type attribute to avoid accidental form submissions."
    ],
    keyPoints: ["submit sends forms", "button for JavaScript actions", "Always set type attribute"],
    practice: {
      task: "Create a button with type='button' and text 'Click Me'.",
      starter: "",
      patterns: ["<button", "type", "button", "Click Me", "</button>"],
      success: "Correct! Great job — your button is properly defined.",
      fail: "Try again. Use <button type=\"button\">Click Me</button>."
    }
  },
  {
    id: "semantic",
    level: "intermediate",
    title: "Semantic Elements",
    summary: "Use meaningful tags that describe content purpose.",
    content: [
      "Semantic tags clearly describe their purpose: header, nav, main, article, section, aside, footer.",
      "Use <main> once per page for the primary content area.",
      "Use <article> for self-contained content like blog posts.",
      "Semantic HTML improves accessibility, SEO, and code readability."
    ],
    keyPoints: ["main once per page", "article for standalone content", "nav for navigation links"],
    practice: {
      task: "Wrap content in a <main> tag containing an <article> with a heading 'News'.",
      starter: "",
      patterns: ["<main>", "<article>", "<h", "News"],
      success: "Correct! Great job — your semantic structure is excellent.",
      fail: "Try again. Use <main><article><h2>News</h2></article></main>."
    }
  },
  {
    id: "media",
    level: "intermediate",
    title: "Audio and Video",
    summary: "Embed sound and video directly in your pages.",
    content: [
      "The <video> tag embeds video files. Add the controls attribute so users can play and pause.",
      "The <audio> tag works the same way for sound files.",
      "Use <source> inside video or audio to offer multiple file formats.",
      "Always provide fallback text for browsers that cannot play media."
    ],
    keyPoints: ["controls for playback", "source for format options", "Include fallback content"],
    practice: {
      task: "Create a video element with the controls attribute.",
      starter: "",
      patterns: ["<video", "controls"],
      success: "Correct! Great job — your video element is ready.",
      fail: "Try again. Use <video controls></video> or <video controls src=\"...\"></video>."
    }
  },
  {
    id: "seo",
    level: "advanced",
    title: "SEO HTML",
    summary: "Help search engines understand and rank your pages.",
    content: [
      "SEO (Search Engine Optimization) helps your page appear in search results.",
      "Use a unique, descriptive <title> for every page — under 60 characters.",
      "Add <meta name=\"description\"> with a clear summary of the page content.",
      "Use heading hierarchy correctly and include alt text on all images."
    ],
    keyPoints: ["Unique title per page", "Meta description matters", "Proper heading hierarchy"],
    practice: {
      task: "Add a meta description tag with content 'Learn HTML step by step'.",
      starter: "<head>\n  \n</head>",
      patterns: ["<meta", "description", "Learn HTML step by step"],
      success: "Correct! Great job — your SEO meta tag is set up.",
      fail: "Try again. Use <meta name=\"description\" content=\"Learn HTML step by step\">."
    }
  },
  {
    id: "accessibility",
    level: "advanced",
    title: "Accessibility",
    summary: "Make your website usable for everyone.",
    content: [
      "Accessibility means people with disabilities can use your website.",
      "Use alt text on images so screen readers can describe them.",
      "Connect every form input to a <label> using matching for and id attributes.",
      "Use semantic HTML landmarks (main, nav, header) so assistive technology can navigate."
    ],
    keyPoints: ["Alt text on images", "Labels on all inputs", "Semantic landmarks"],
    practice: {
      task: "Create a label 'Email' linked to an input with id='user-email'.",
      starter: "",
      patterns: ["<label", "for", "user-email", "<input", "id", "user-email"],
      success: "Correct! Great job — your accessible form control is perfect.",
      fail: "Try again. Use <label for=\"user-email\">Email</label><input id=\"user-email\">."
    }
  },
  {
    id: "best-practices",
    level: "advanced",
    title: "Best Practices",
    summary: "Write clean, maintainable HTML code.",
    content: [
      "Indent your code consistently so it is easy to read and debug.",
      "Validate your HTML using the W3C validator to catch errors early.",
      "Separate structure (HTML), design (CSS), and behavior (JavaScript).",
      "Use lowercase tag and attribute names. Always quote attribute values."
    ],
    keyPoints: ["Consistent indentation", "Validate with W3C", "Separate HTML, CSS, and JS"],
    practice: {
      task: "Write a properly nested structure: div containing a paragraph saying 'Clean code'.",
      starter: "",
      patterns: ["<div>", "<p>", "Clean code", "</p>", "</div>"],
      success: "Correct! Great job — your nesting is clean and correct.",
      fail: "Try again. Nest <p>Clean code</p> inside <div>...</div>."
    }
  },
  {
    id: "structure-optimization",
    level: "advanced",
    title: "Website Structure Optimization",
    summary: "Organize large websites for speed and clarity.",
    content: [
      "Plan your page structure before writing code — sketch sections on paper first.",
      "Load CSS in the <head> and JavaScript before </body> for faster page rendering.",
      "Use <link rel=\"preload\"> for critical resources like fonts and hero images.",
      "Keep HTML lean — move repeated styles to CSS files, not inline style attributes."
    ],
    keyPoints: ["CSS in head", "JS before closing body", "Avoid inline styles"],
    practice: {
      task: "Link an external stylesheet called 'styles.css' in the head section.",
      starter: "<head>\n  \n</head>",
      patterns: ["<link", "stylesheet", "styles.css"],
      success: "Correct! Great job — your stylesheet link is correct.",
      fail: "Try again. Use <link rel=\"stylesheet\" href=\"styles.css\">."
    }
  }
];
