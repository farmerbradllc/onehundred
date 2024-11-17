document.addEventListener("DOMContentLoaded", () => {
    const markdownContent = document.getElementById("markdown-content");

    // Check if the target element exists
    if (!markdownContent) {
        console.error("Element with id 'markdown-content' not found.");
        return;
    }

    // Function to dynamically load Marked.js
    function loadMarkedLibrary(callback) {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js"; // Correct CDN URL for Marked.js
        script.onload = callback;
        script.onerror = () => {
            console.error("Failed to load Marked.js library.");
            markdownContent.innerHTML = "<p>Failed to load content. Please try again later.</p>";
        };
        document.head.appendChild(script);
    }

    // Function to fetch and render markdown
    function fetchAndRenderMarkdown() {
        fetch("docs/README.md")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch the markdown file. Status: ${response.status}`);
                }
                return response.text();
            })
            .then((markdown) => {
                console.log("Markdown file fetched successfully.");
                // Convert markdown to HTML
                if (typeof marked === "function") {
                    const htmlContent = marked(markdown);
                    markdownContent.innerHTML = htmlContent;
                } else {
                    console.error("Marked.js is not available.");
                    markdownContent.innerHTML = "<p>Failed to convert markdown. Marked.js is missing.</p>";
                }
            })
            .catch((error) => {
                console.error("Error loading markdown file:", error);
                markdownContent.innerHTML = "<p>Failed to load content. Please try again later.</p>";
            });
    }

    // Check if Marked.js is already loaded
    if (typeof marked === "function") {
        console.log("Marked.js already loaded.");
        fetchAndRenderMarkdown();
    } else {
        console.log("Loading Marked.js dynamically...");
        loadMarkedLibrary(fetchAndRenderMarkdown);
    }
});
