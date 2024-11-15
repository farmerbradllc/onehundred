// footer.js

(async function() {
  try {
    // Fetch the projects JSON file
    const response = await fetch('https://farmerbradllc.github.io/projects.json');
    const projects = await response.json();

    // Get the current URL
    const currentUrl = window.location.href;

    // Find the index of the current project
    const currentIndex = projects.findIndex(project => currentUrl.includes(project.url));

    // If current project is found
    if (currentIndex !== -1) {
      // Determine previous and next projects
      const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
      const nextIndex = (currentIndex + 1) % projects.length;

      const prevProject = projects[prevIndex];
      const nextProject = projects[nextIndex];

      // Create footer element
      const footer = document.createElement('footer');
      footer.style.padding = '20px';
      footer.style.backgroundColor = '#f8f9fa';
      footer.style.textAlign = 'center';
      footer.style.marginTop = '40px';

      // Create navigation links
      const prevLink = document.createElement('a');
      prevLink.href = prevProject.url;
      prevLink.textContent = `← ${prevProject.title}`;
      prevLink.style.marginRight = '20px';

      const nextLink = document.createElement('a');
      nextLink.href = nextProject.url;
      nextLink.textContent = `${nextProject.title} →`;
      nextLink.style.marginLeft = '20px';

      // Append links to footer
      footer.appendChild(prevLink);
      footer.appendChild(nextLink);

      // Append footer to body
      document.body.appendChild(footer);
    } else {
      console.error('Current project not found in projects.json.');
    }
  } catch (error) {
    console.error('Error loading footer:', error);
  }
})();
