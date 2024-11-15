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

      // Create footer element
      const footer = document.createElement('footer');
      footer.style.padding = '20px';
      footer.style.backgroundColor = '#f8f9fa';
      footer.style.textAlign = 'center';
      footer.style.marginTop = '40px';

      // Create a container for the links and donate button
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.justifyContent = 'center';
      container.style.alignItems = 'center';
      container.style.gap = '20px';

      // Create navigation links
      const prevLink = document.createElement('a');
      prevLink.href = prevProject.url;
      prevLink.textContent = `← ${prevProject.title}`;
      prevLink.style.marginRight = '20px';

      const nextLink = document.createElement('a');
      nextLink.href = nextProject.url;
      nextLink.textContent = `${nextProject.title} →`;
      nextLink.style.marginLeft = '20px';

      // Create PayPal Donate button
      const donateForm = document.createElement('form');
      donateForm.action = 'https://www.paypal.com/donate';
      donateForm.method = 'post';
      donateForm.target = '_blank';
      donateForm.style.display = 'inline-block';
      donateForm.style.margin = '0';

      const businessInput = document.createElement('input');
      businessInput.type = 'hidden';
      businessInput.name = 'business';
      businessInput.value = 'brad@farmerbrad.com'; // Replace with your PayPal email or merchant ID

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

      const donateButton = document.createElement('input');
      donateButton.type = 'submit';
      donateButton.value = 'Donate with PayPal';
      donateButton.style.backgroundColor = '#0070ba';
      donateButton.style.color = '#fff';
      donateButton.style.border = 'none';
      donateButton.style.padding = '10px 20px';
      donateButton.style.cursor = 'pointer';
      donateButton.style.fontSize = '16px';
      donateButton.style.borderRadius = '5px';

      // Append inputs to form
      donateForm.appendChild(businessInput);
      donateForm.appendChild(noRecurringInput);
      donateForm.appendChild(itemNameInput);
      donateForm.appendChild(currencyCodeInput);
      donateForm.appendChild(donateButton);

      // Append elements to container
      container.appendChild(prevLink);
      container.appendChild(donateForm);
      container.appendChild(nextLink);

      // Append container to footer
      footer.appendChild(container);

      // Append footer to body
      document.body.prependChild(footer);
    } else {
      console.error('Current project not found in projects.json.');
    }
  } catch (error) {
    console.error('Error loading footer:', error);
  }
})();
