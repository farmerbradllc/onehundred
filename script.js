document.addEventListener("DOMContentLoaded", () => {
    const markdownContent = document.getElementById("markdown-content");

    // Fetch the markdown file
    fetch("README.md")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch the markdown file.");
            }
            return response.text();
        })
        .then((markdown) => {
            // Convert markdown to HTML using a library like marked.js
            const htmlContent = marked(markdown);
            markdownContent.innerHTML = htmlContent;
        })
        .catch((error) => {
            console.error("Error loading markdown file:", error);
            markdownContent.innerHTML = "<p>Failed to load content. Please try again later.</p>";
        });
});
