document.addEventListener("DOMContentLoaded", () => {
    const markdownContent = document.getElementById("markdown-content");

    // Check if marked is loaded
    console.log("Is marked defined?", typeof marked);

    // Fetch the markdown file
    fetch("docs/README.md")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch the markdown file.");
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
