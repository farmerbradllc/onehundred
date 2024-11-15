// footer.js

(async function() {
  try {
    const response = await fetch('https://farmerbradllc.github.io/onehundred/projects.json');
    const projects = await response.json();

    // Get the current path
    const currentPath = window.location.pathname;

    // Find the index of the current project
    const currentIndex = projects.findIndex(project => project.slug === currentPath || currentPath.includes(project.slug));

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
