// footer.js

(async function() {
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

    // Include Bootstrap CSS if not already included
    if (!isBootstrapCssIncluded()) {
      const bootstrapCss = document.createElement('link');
      bootstrapCss.rel = 'stylesheet';
      bootstrapCss.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
      bootstrapCss.integrity = 'sha384-9ndCyUaT23s5nZt+Yk6pv2PPHIliQZZADThxjln8Jlb6Ra2hiL5e6oBxFvcp1dYG';
      bootstrapCss.crossOrigin = 'anonymous';
      document.head.appendChild(bootstrapCss);
    }

    // Include Bootstrap JS if not already included
    if (!isBootstrapJsIncluded()) {
      const bootstrapJs = document.createElement('script');
      bootstrapJs.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
      bootstrapJs.integrity = 'sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+6j8K7IDlE3rXwN8AmXcZxXW5U7lB';
      bootstrapJs.crossOrigin = 'anonymous';
      document.body.appendChild(bootstrapJs);
    }

    const response = await fetch('https://farmerbradllc.github.io/onehundred/projects.json');
    const projects = await response.json();

    // Get the current path
    const currentPath = window.location.pathname;

    // Find the index of the current project
    const currentIndex = projects.findIndex(
      project => project.slug === currentPath || currentPath.includes(project.slug)
    );

    // If current project is found
    if (currentIndex !== -1) {
      // Determine previous and next projects
      const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
      const nextIndex = (currentIndex + 1) % projects.length;

      const prevProject = projects[prevIndex];
      const nextProject = projects[nextIndex];

      // Create footer element with Bootstrap classes
      const footer = document.createElement('footer');
      footer.className = 'mt-5 py-3 border-top';

      // Create a container
      const container = document.createElement('div');
      container.className = 'container';

      // Create a row
      const row = document.createElement('div');
      row.className = 'row align-items-center text-center';

      // Previous Link Column
      const prevCol = document.createElement('div');
      prevCol.className = 'col-12 col-md-4 mb-2 mb-md-0 text-md-start';

      const prevLink = document.createElement('a');
      prevLink.href = prevProject.url;
      prevLink.textContent = `← ${prevProject.title}`;
      prevLink.className = 'btn btn-link';
      prevLink.setAttribute('aria-label', `Previous project: ${prevProject.title}`);

      prevCol.appendChild(prevLink);

      // Donate Button Column
      const donateCol = document.createElement('div');
      donateCol.className = 'col-12 col-md-4 mb-2 mb-md-0';

      const donateForm = document.createElement('form');
      donateForm.action = 'https://www.paypal.com/donate';
      donateForm.method = 'post';
      donateForm.target = '_blank';

      // Hidden Inputs
      const businessInput = document.createElement('input');
      businessInput.type = 'hidden';
      businessInput.name = 'business';
      businessInput.value = 'brad@farmerbrad.com'; // Your PayPal email or merchant ID

      const noRecurringInput = document.createElement('input');
      noRecurringInput.type = 'hidden';
      noRecurringInput.name = 'no_recurring';
      noRecurringInput.value = '0';

      const itemNameInput = document.createElement('input');
      itemNameInput.type = 'hidden';
      itemNameInput.name = 'item_name';
      itemNameInput.value = 'Support my projects';

      const currencyCodeInput = document.createElement('input');
      currencyCodeInput.type = 'hidden';
      currencyCodeInput.name = 'currency_code';
      currencyCodeInput.value = 'USD';

      // Donate Button
      const donateButton = document.createElement('input');
      donateButton.type = 'submit';
      donateButton.value = 'Donate with PayPal';
      donateButton.className = 'btn btn-primary';
      donateButton.setAttribute('aria-label', 'Donate with PayPal');

      // Append inputs to form
      donateForm.appendChild(businessInput);
      donateForm.appendChild(noRecurringInput);
      donateForm.appendChild(itemNameInput);
      donateForm.appendChild(currencyCodeInput);
      donateForm.appendChild(donateButton);

      donateCol
