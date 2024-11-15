// footer.js

(async function() {
  try {
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
      container.className = 'container d-flex justify-content-center align-items-center';

      // Previous Link
      const prevLink = document.createElement('a');
      prevLink.href = prevProject.url;
      prevLink.textContent = `← ${prevProject.title}`;
      prevLink.className = 'btn btn-link';

      // PayPal Donate Button
      const donateForm = document.createElement('form');
      donateForm.action = 'https://www.paypal.com/donate';
      donateForm.method = 'post';
      donateForm.target = '_blank';
      donateForm.className = 'mx-3';

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

      // Append inputs to form
      donateForm.appendChild(businessInput);
      donateForm.appendChild(noRecurringInput);
      donateForm.appendChild(itemNameInput);
      donateForm.appendChild(currencyCodeInput);
      donateForm.appendChild(donateButton);

      // Next Link
      const nextLink = document.createElement('a');
      nextLink.href = nextProject.url;
      nextLink.textContent = `${nextProject.title} →`;
      nextLink.className = 'btn btn-link';

      // Append elements to container
      container.appendChild(prevLink);
      container.appendChild(donateForm);
      container.appendChild(nextLink);

      // Append container to footer
      footer.appendChild(container);

      // Append footer to body
      document.body.appendChild(footer);
    } else {
      console.error('Current project not found in projects.json.');
    }
  } catch (error) {
    console.error('Error loading footer:', error);
  }
})();
