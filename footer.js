document.addEventListener('DOMContentLoaded', async function () {
  try {
      // Utility Functions
      function isBootstrapCssIncluded() {
          return Array.from(document.getElementsByTagName('link')).some(link =>
              link.href.includes('bootstrap.min.css')
          );
      }

      function isBootstrapJsIncluded() {
          return Array.from(document.getElementsByTagName('script')).some(script =>
              script.src.includes('bootstrap.bundle.min.js') || script.src.includes('bootstrap.min.js')
          );
      }

      function addStylesheet(href) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = href;
          document.head.appendChild(link);
      }

      function addScript(src, async = true) {
          return new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = src;
              script.async = async;
              script.onload = resolve;
              script.onerror = reject;
              document.head.appendChild(script);
          });
      }

      function addRatingWidget() {
          const widgetContainer = document.createElement('div');
          widgetContainer.id = 'rating-widget';
          widgetContainer.className = 'rating-widget position-fixed bottom-0 end-0 m-3 p-3 bg-white shadow rounded';
          widgetContainer.innerHTML = `
              <p>Rate this application:</p>
              <div id="stars">
                <span data-value="1" class="star">★</span>
                <span data-value="2" class="star">★</span>
                <span data-value="3" class="star">★</span>
                <span data-value="4" class="star">★</span>
                <span data-value="5" class="star">★</span>
              </div>
              <p id="rating-message" class="mt-2"></p>
              <p id="average-rating" class="mt-2">
                Average Rating: <span id="average">-</span> (<span id="votes">0</span> votes)
              </p>
          `;
          document.body.appendChild(widgetContainer);
      }

      // Load Dependencies
      if (!isBootstrapCssIncluded()) {
          addStylesheet('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
      }

      if (!isBootstrapJsIncluded()) {
          await addScript('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js');
      }

      // Load Review Widget Script and Add Styles
      await addScript('https://farmerbradllc.github.io/application-rating-widget/script.js');
      addStylesheet('https://farmerbradllc.github.io/application-rating-widget/style.css');
      addRatingWidget();

      console.log('Application review widget loaded and initialized.');

      // Footer Navigation
      console.log('Fetching projects.json...');
      const response = await fetch('https://onehundred.bradwood.dev/projects.json');
      const projects = await response.json();
      console.log('Projects data:', projects);

      const currentUrl = window.location.href;
      const normalizeUrl = url => new URL(url).origin + new URL(url).pathname;

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
      console.error('Error loading footer or widget:', error);
  }
});
