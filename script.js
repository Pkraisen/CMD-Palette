let overlay = document.querySelector(".overlay");

const input = document.querySelector(".input"); // or a specific selector

function openPalette() {
  overlay.classList.add("open");
  document.body.classList.add("overlay-open");
  setTimeout(() => input.focus(), 300);
}

function closePalette() {
  overlay.classList.remove("open");
  document.body.classList.remove("overlay-open");
  input.value = "";
}

window.addEventListener("keydown", function (elem) {
  const isCorrectKey =
    elem.key.toLowerCase() == "k" && (elem.metaKey || elem.ctrlKey);

  if (isCorrectKey) {
    overlay.classList.contains("open") ? closePalette() : openPalette();
  }
  if (elem.key == "Escape") {
    closePalette();
  }
});

overlay.addEventListener("click", function (elem) {
  if (elem.target === overlay) {
    closePalette();
  }
});

function normalizeURL(url) {
  return /^https?:\/\//i.test(url) ? url : "http://" + url;
}

function openNewTab(url) {
  window.open(url, "_blank", "noopener");
}

function parseInput(str) {
  var parts = str.split(" ");
  var verb = parts[0].toLowerCase();
  var args = parts.slice(1);

  return { verb: verb, args: args };
}

function runCommand(text) {
  if (!text.trim()) return;
  var parsed = parseInput(text);
  var verb = parsed.verb;
  var args = parsed.args;

  if (verb == "open" || verb == "o") {
    const url = normalizeURL(args.join(" "));
    openNewTab(url);
    closePalette();
  }

  if (verb == "wikipedia" || verb == "wiki") {
    const term = normalizeURL(args.join(" "));
    openNewTab("https://en.wikipedia.org/wiki/" + encodeURIComponent(term));
    closePalette();
  }

  if (verb == "youtube" || verb == "yt") {
    const term = normalizeURL(args.join(" "));
    openNewTab(
      "https://www.youtube.com/results?search_query=" + encodeURIComponent(term)
    );
    closePalette();
  }
  if (verb == "google" || verb == "g") {
    const term = normalizeURL(args.join(" "));
    openNewTab("https://www.google.com/search?q=" + encodeURIComponent(term));
    closePalette();
  }

  if (verb === "calculate" || verb === "calc") {
    const expression = args.join(" ");
    try {
      // Only allow safe characters (digits, operators, spaces, dots, parentheses)
      if (/^[\d+\-*/().\s]+$/.test(expression)) {
        const result = eval(expression); // Still use carefully
        alert(`Result: ${result}`);
      } else {
        alert("Invalid expression");
      }
    } catch (e) {
      alert("Error evaluating expression");
    }
    closePalette();
    return;
  }
}

input.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    runCommand(input.value);
  }
});
