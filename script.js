document.addEventListener("DOMContentLoaded", () => {
    const markdownContent = document.getElementById("markdown-content");

    // Check if the target element exists
    if (!markdownContent) {
        console.error("Element with id 'markdown-content' not found.");
        return;
    }

    // Check if marked is loaded
    if (typeof marked !== "function") {
        console.error("Marked.js is not loaded. Ensure the library is included.");
        return;
    }
    console.log("Marked.js loaded successfully.");

    // Fetch the markdown file
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
            const htmlContent = marked(markdown);
            markdownContent.innerHTML = htmlContent;
        })
        .catch((error) => {
            console.error("Error loading markdown file:", error);
            markdownContent.innerHTML = "<p>Failed to load content. Please try again later.</p>";
        });
});
