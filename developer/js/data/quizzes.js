export const QUIZ_LEVELS = [
  { id: "beginner", label: "Beginner Quiz", questionCount: 8 },
  { id: "intermediate", label: "Intermediate Quiz", questionCount: 8 },
  { id: "advanced", label: "Advanced Quiz", questionCount: 8 }
];

export const QUIZ_BANK = {
  beginner: [
    {
      question: "What does HTML stand for?",
      options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Management Language"],
      answer: 0,
      explanation: "HTML stands for HyperText Markup Language — the standard language for web pages."
    },
    {
      question: "Which tag is the root element of an HTML document?",
      options: ["<html>", "<body>", "<head>", "<main>"],
      answer: 0,
      explanation: "<html> wraps the entire document and contains both head and body."
    },
    {
      question: "Which tag creates a paragraph?",
      options: ["<p>", "<para>", "<text>", "<paragraph>"],
      answer: 0,
      explanation: "The <p> tag defines a paragraph of text on a webpage."
    },
    {
      question: "What attribute is required on the <img> tag for accessibility?",
      options: ["alt", "href", "src", "title"],
      answer: 0,
      explanation: "The alt attribute describes the image for screen readers and when images fail to load."
    },
    {
      question: "Which tag creates the most important heading on a page?",
      options: ["<h1>", "<h6>", "<head>", "<header>"],
      answer: 0,
      explanation: "<h1> is the highest-level heading and should represent the main page topic."
    },
    {
      question: "Which tag creates a hyperlink?",
      options: ["<a>", "<link>", "<href>", "<url>"],
      answer: 0,
      explanation: "The <a> tag with an href attribute creates a clickable hyperlink."
    },
    {
      question: "Which list shows items with bullet points?",
      options: ["<ul>", "<ol>", "<li>", "<list>"],
      answer: 0,
      explanation: "<ul> creates an unordered (bulleted) list. Items go inside <li> tags."
    },
    {
      question: "Where does the visible page content go?",
      options: ["<body>", "<head>", "<html>", "<meta>"],
      answer: 0,
      explanation: "Everything users see on the page — text, images, links — goes inside <body>."
    },
    {
      question: "What does <!DOCTYPE html> tell the browser?",
      options: ["This is an HTML5 document", "This page needs JavaScript", "This is a CSS file", "This page is encrypted"],
      answer: 0,
      explanation: "<!DOCTYPE html> declares that the document follows the HTML5 standard."
    },
    {
      question: "Which tag sets the text shown in the browser tab?",
      options: ["<title>", "<name>", "<header>", "<tab>"],
      answer: 0,
      explanation: "The <title> tag inside <head> sets the browser tab title and search result title."
    },
    {
      question: "Which tag adds a line break without starting a new paragraph?",
      options: ["<br>", "<break>", "<lb>", "<newline>"],
      answer: 0,
      explanation: "<br> inserts a single line break. Use it sparingly — not for layout spacing."
    },
    {
      question: "What goes inside a <ul> or <ol> tag?",
      options: ["<li> elements", "<p> elements", "<div> elements", "Plain text only"],
      answer: 0,
      explanation: "List items must always be wrapped in <li> tags inside ul or ol."
    }
  ],
  intermediate: [
    {
      question: "Which tag groups related form controls with a visible title?",
      options: ["<fieldset>", "<group>", "<section>", "<formgroup>"],
      answer: 0,
      explanation: "<fieldset> groups related inputs. Use <legend> to label the group."
    },
    {
      question: "What does the type='email' input do?",
      options: ["Validates email format", "Sends an email automatically", "Hides the input", "Creates a password field"],
      answer: 0,
      explanation: "type='email' shows an email keyboard on mobile and validates the email format."
    },
    {
      question: "Which semantic tag should contain the main page content?",
      options: ["<main>", "<div>", "<section>", "<content>"],
      answer: 0,
      explanation: "<main> should be used once per page for the primary content area."
    },
    {
      question: "Which table tag defines a header cell?",
      options: ["<th>", "<td>", "<tr>", "<thead>"],
      answer: 0,
      explanation: "<th> defines a header cell. Use <td> for regular data cells."
    },
    {
      question: "What does the controls attribute on <video> do?",
      options: ["Shows play/pause controls", "Auto-plays the video", "Loops the video", "Mutes the video"],
      answer: 0,
      explanation: "The controls attribute adds play, pause, volume, and fullscreen buttons."
    },
    {
      question: "Which tag links a label to a form input?",
      options: ["for attribute on label", "href attribute on label", "src attribute on label", "link attribute on label"],
      answer: 0,
      explanation: "The for attribute on <label> must match the id of the input it describes."
    },
    {
      question: "What is the purpose of <article>?",
      options: ["Self-contained content like a blog post", "Page navigation links", "Sidebar content", "Page footer"],
      answer: 0,
      explanation: "<article> wraps content that makes sense on its own, like a news post or product card."
    },
    {
      question: "Which input type creates a dropdown selection?",
      options: ["<select>", "<input type='dropdown'>", "<option>", "<dropdown>"],
      answer: 0,
      explanation: "<select> creates a dropdown. Options go inside <option> tags."
    },
    {
      question: "What does button type='submit' do inside a form?",
      options: ["Submits the form data", "Resets the form", "Runs JavaScript only", "Closes the page"],
      answer: 0,
      explanation: "type='submit' sends the form data to the action URL when clicked."
    },
    {
      question: "Which tag embeds another webpage inside your page?",
      options: ["<iframe>", "<embed>", "<object>", "<frame>"],
      answer: 0,
      explanation: "<iframe> embeds external content like maps, videos, or other websites."
    }
  ],
  advanced: [
    {
      question: "What does semantic HTML improve?",
      options: ["Accessibility and meaning", "Only page colors", "Server speed only", "Image file size"],
      answer: 0,
      explanation: "Semantic elements help browsers, search engines, and assistive technologies understand content."
    },
    {
      question: "Where should the meta description tag be placed?",
      options: ["Inside <head>", "Inside <body>", "After </html>", "Inside <footer>"],
      answer: 0,
      explanation: "Meta tags belong in <head>. The description appears in search engine results."
    },
    {
      question: "Why should you avoid using tables for page layout?",
      options: ["They harm accessibility and responsiveness", "Tables are deprecated", "Browsers cannot render tables", "Tables only work in old browsers"],
      answer: 0,
      explanation: "Tables are for tabular data only. CSS Grid and Flexbox are better for layout."
    },
    {
      question: "What does rel='noopener' do on an external link?",
      options: ["Prevents security risks with target='_blank'", "Opens the link faster", "Tracks link clicks", "Downloads the page"],
      answer: 0,
      explanation: "rel='noopener' prevents the new page from accessing your page's window object."
    },
    {
      question: "How many <main> elements should a page have?",
      options: ["One", "Two", "As many as needed", "Zero"],
      answer: 0,
      explanation: "Use exactly one <main> per page for the primary content area."
    },
    {
      question: "What is the best practice for loading JavaScript?",
      options: ["Before the closing </body> tag", "In the <head> without defer", "Inline in every element", "After </html>"],
      answer: 0,
      explanation: "Placing scripts before </body> lets the page content render before JavaScript runs."
    },
    {
      question: "Which attribute makes a form field mandatory?",
      options: ["required", "mandatory", "must", "validate"],
      answer: 0,
      explanation: "The required attribute prevents form submission until the field has a value."
    },
    {
      question: "What does the lang attribute on <html> do?",
      options: ["Tells browsers and screen readers the page language", "Sets the page font", "Enables translation", "Changes the page direction only"],
      answer: 0,
      explanation: "lang='en' helps screen readers pronounce text correctly and assists search engines."
    },
    {
      question: "Why use <figure> and <figcaption>?",
      options: ["Group media with a descriptive caption", "Create page layout columns", "Add form validation", "Embed JavaScript"],
      answer: 0,
      explanation: "<figure> groups images or diagrams with a <figcaption> that describes them."
    },
    {
      question: "What is the purpose of HTML validation?",
      options: ["Find and fix markup errors", "Encrypt the page", "Speed up the server", "Generate CSS automatically"],
      answer: 0,
      explanation: "Valid HTML renders consistently across browsers and is easier to maintain."
    }
  ]
};
