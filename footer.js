document.addEventListener('DOMContentLoaded', async function () {
  try {
    // Function to check if Bootstrap CSS is included
    function isBootstrapCssIncluded() {
      const links = Array.from(document.getElementsByTagName('link'));
      return links.some(link => link.href.includes('bootstrap.min.css'));
    }

    // Function to check if Bootstrap JS is included
    function isBootstrapJsIncluded() {
      const scripts = Array.from(document.getElementsByTagName('script'));
      return scripts.some(script => script.src.includes('bootstrap.bundle.min.js') || script.src.includes('bootstrap.min.js'));
    }

    // Add a script only if it doesn't already exist
    function addScriptIfNotExists(src, async = true) {
      if (!Array.from(document.scripts).some(script => script.src.includes(src))) {
        const script = document.createElement('script');
        script.src = src;
        script.async = async;
        script.onload = () => console.log(`${src} loaded successfully.`);
        script.onerror = () => console.error(`Failed to load script: ${src}`);
        document.head.appendChild(script);
      }
    }

    // Add a stylesheet only if it doesn't already exist
    function addStylesheetIfNotExists(href) {
      if (!Array.from(document.styleSheets).some(style => style.href && style.href.includes(href))) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    }

    // Include Bootstrap CSS if not already included
    if (!isBootstrapCssIncluded()) {
      addStylesheetIfNotExists('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
    }

    // Include Bootstrap JS if not already included
    if (!isBootstrapJsIncluded()) {
      addScriptIfNotExists('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js');
    }

    

    // Dynamically load the rating widget stylesheet
    addStylesheetIfNotExists('https://farmerbradllc.github.io/application-rating-widget/style.css');

    // Fetch projects.json and build footer navigation
    console.log('Fetching projects.json...');
    const response = await fetch('https://onehundred.bradwood.dev/projects.json');
    const projects = await response.json();
    console.log('Projects data:', projects);

    // Normalize URLs for consistent comparison
    const normalizeUrl = url => new URL(url).origin + new URL(url).pathname;

    const currentUrl = window.location.href;
    const currentIndex = projects.findIndex(project => normalizeUrl(project.url) === normalizeUrl(currentUrl));

    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
      const nextIndex = (currentIndex + 1) % projects.length;

      const prevProject = projects[prevIndex];
      const nextProject = projects[nextIndex];

      // Build footer navigation
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
      // Dynamically load the application-rating-widget script
const ratingWidgetScript = document.createElement('script');
ratingWidgetScript.src = 'https://farmerbradllc.github.io/application-rating-widget/script.js';
ratingWidgetScript.async = true;
ratingWidgetScript.onload = () => {
  console.log('Rating widget script loaded successfully.');
  
  // Ensure the addRatingWidget function is available
  if (typeof window.addRatingWidget === 'function') {
    window.addRatingWidget(); // Add the rating widget
  } else {
    console.error('addRatingWidget function is not defined.');
  }
};
ratingWidgetScript.onerror = () => console.error('Failed to load rating widget script.');
document.body.appendChild(ratingWidgetScript);


      console.log('Footer successfully appended.');
    } else {
      console.error('Current project not found in projects.json.');
    }
  } catch (error) {
    console.error('Error loading footer:', error);
  }
});
