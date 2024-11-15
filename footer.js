// footer.js

(async function() {
    try {
      // Fetch the projects JSON file
      const response = await fetch('https://farmerbradllc.github.io/onehundred/projects.json');
      const projects = await response.json();
  
      // Get the current URL
      const currentUrl = window.location.href;
  
      // Find the index of the current project
      const currentIndex = projects.findIndex(project => project.url === currentUrl);
  
      // If current project is found
      if (currentIndex !== -1) {
        // Determine previous and next projects
        const prevProject = projects[currentIndex - 1] || projects[projects.length - 1];
        const nextProject = projects[currentIndex + 1] || projects[0];
  
        // Create footer element with Bootstrap classes
        const footer = document.createElement('footer');
        footer.className = 'container mt-5 py-3 border-top text-center';
  
        // Create a row for the navigation links
        const row = document.createElement('div');
        row.className = 'row';
  
        // Previous Link Column
        const prevCol = document.createElement('div');
        prevCol.className = 'col text-start';
  
        const prevLink = document.createElement('a');
        prevLink.href = prevProject.url;
        prevLink.textContent = `← ${prevProject.title}`;
        prevLink.className = 'btn btn-link';
  
        prevCol.appendChild(prevLink);
  
        // Next Link Column
        const nextCol = document.createElement('div');
        nextCol.className = 'col text-end';
  
        const nextLink = document.createElement('a');
        nextLink.href = nextProject.url;
        nextLink.textContent = `${nextProject.title} →`;
        nextLink.className = 'btn btn-link';
  
        nextCol.appendChild(nextLink);
  
        // Append columns to row
        row.appendChild(prevCol);
        row.appendChild(nextCol);
  
        // Append row to footer
        footer.appendChild(row);
  
        // Append footer to body
        document.body.appendChild(footer);
      } else {
        console.error('Current project not found in projects.json.');
      }
    } catch (error) {
      console.error('Error loading footer:', error);
    }
  })();
  
