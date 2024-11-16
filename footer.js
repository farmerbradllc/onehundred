document.addEventListener('DOMContentLoaded', async function() {
  try {
    // Function to check if Bootstrap CSS is included
    function isBootstrapCssIncluded() {
      const links = Array.from(document.getElementsByTagName('link'));
      return links.some(link => link.href.includes('bootstrap.min.css'));
    }
// Function to normalize URLs for comparison
function normalizeUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.origin + urlObj.pathname; // Keep only the origin and pathname
  } catch (error) {
    console.error('Invalid URL:', url);
    return url;
  }
}

    // Function to check if Bootstrap JS is included
    function isBootstrapJsIncluded() {
      const scripts = Array.from(document.getElementsByTagName('script'));
      return scripts.some(script => script.src.includes('bootstrap.bundle.min.js') || script.src.includes('bootstrap.min.js'));
    }

    // Include Bootstrap CSS if not already included
    if (!isBootstrapCssIncluded()) {
      const bootstrapCss = document.createElement('link');
      bootstrapCss.rel = 'stylesheet';
      bootstrapCss.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
      bootstrapCss.integrity = 'sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM';
      bootstrapCss.crossOrigin = 'anonymous';
      document.head.appendChild(bootstrapCss);
    }

    // Include Bootstrap JS if not already included
    if (!isBootstrapJsIncluded()) {
      const bootstrapJs = document.createElement('script');
      bootstrapJs.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
      bootstrapJs.integrity = 'sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz';
      bootstrapJs.crossOrigin = 'anonymous';
      document.body.appendChild(bootstrapJs);
    }

    console.log('Fetching projects.json...');
    const response = await fetch('https://onehundred.bradwood.dev/projects.json');
    const projects = await response.json();
    console.log('Projects data:', projects);

    const currentUrl = window.location.href;

    function normalizeUrl(url) {
      return url.endsWith('/') ? url.slice(0, -1) : url;
    }

    const normalizedCurrentUrl = normalizeUrl(currentUrl);
    const currentIndex = projects.findIndex(project => normalizeUrl(project.url) === normalizeUrl(currentUrl));

    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
      const nextIndex = (currentIndex + 1) % projects.length;

      const prevProject = projects[prevIndex];
      const nextProject = projects[nextIndex];

      const footer = document.createElement('footer');
      footer.className = 'mt-5 py-3 border-top';

      const container = document.createElement('div');
      container.className = 'container';

      const row = document.createElement('div');
      row.className = 'row align-items-center text-center';

      const prevCol = document.createElement('div');
      prevCol.className = 'col-12 col-md-4 mb-2 mb-md-0 text-md-start';
      const prevLink = document.createElement('a');
      prevLink.href = prevProject.url;
      prevLink.textContent = `← ${prevProject.title}`;
      prevLink.className = 'btn btn-link';
      prevCol.appendChild(prevLink);

      const donateCol = document.createElement('div');
      donateCol.className = 'col-12 col-md-4 mb-2 mb-md-0';
      const donateButton = document.createElement('button');
      donateButton.className = 'btn btn-primary';
      donateButton.textContent = 'Donate';
      donateCol.appendChild(donateButton);

      const nextCol = document.createElement('div');
      nextCol.className = 'col-12 col-md-4 text-md-end';
      const nextLink = document.createElement('a');
      nextLink.href = nextProject.url;
      nextLink.textContent = `${nextProject.title} →`;
      nextLink.className = 'btn btn-link';
      nextCol.appendChild(nextLink);

      row.appendChild(prevCol);
      row.appendChild(donateCol);
      row.appendChild(nextCol);
      container.appendChild(row);
      footer.appendChild(container);
      document.body.appendChild(footer);

      console.log('Footer successfully appended.');
    } else {
      console.error('Current project not found in projects.json.');
    }
  } catch (error) {
    console.error('Error loading footer:', error);
  }
});
