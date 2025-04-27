// Custom JavaScript goes here

document.addEventListener('DOMContentLoaded', () => {

  // --- Theme Switcher Functionality ---
  const themeSelect = document.getElementById('theme-select');
  const htmlElement = document.documentElement; // The <html> element

  // Function to apply the selected theme
  function applyTheme(theme) {
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else { // theme === 'auto'
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
      localStorage.removeItem('theme'); // Remove stored preference to default to system
    }
    // Update the select dropdown to match the applied theme
    themeSelect.value = theme;
  }

  // On page load:
  // 1. Check local storage for a saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme); // Apply saved theme
  } else {
    // 2. If no saved theme, apply 'auto' based on system preference
    applyTheme('auto');
  }

  // Listen for changes in the select dropdown
  themeSelect.addEventListener('change', (event) => {
    applyTheme(event.target.value);
  });

  // Listen for changes in the system's color scheme preference (only applies if theme is 'auto')
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (!localStorage.getItem('theme')) { // Only react if theme is set to 'auto'
      applyTheme('auto'); // Re-apply auto theme based on new system preference
    }
  });

  // --- FAQ Toggle Functionality ---
  // ... (Keep the existing FAQ toggle script code here) ...
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    question.addEventListener('click', () => {
      // Optional: Close all other open answers before opening the clicked one
      /*
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.querySelector('.faq-answer').classList.add('hidden');
          otherItem.querySelector('.faq-question').classList.remove('active');
          otherItem.querySelector('.faq-icon').textContent = '+';
          otherItem.querySelector('.faq-icon').classList.remove('active');
        }
      });
      */

      // Toggle the clicked answer visibility
      answer.classList.toggle('hidden');

      // Toggle active class on question for styling (e.g., bold text)
      question.classList.toggle('active');

      // Toggle icon appearance ('+' / 'x')
      if (question.classList.contains('active')) {
        icon.textContent = 'x';
      } else {
        icon.textContent = '+';
      }
      icon.classList.toggle('active');
    });
  });

  // --- Portfolio/Work Filtering Functionality ---
  // ... (Keep the existing Portfolio Filtering script code here) ...
  const filterButtons = document.querySelectorAll('.filter-btn');
  const workItems = document.querySelectorAll('#work-grid .work-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      // Update active button style
      filterButtons.forEach(btn => {
        // Ensure correct colors are toggled based on theme
        btn.classList.remove('bg-blue-700', 'text-white', 'hover:bg-blue-800', 'dark:bg-blue-400', 'dark:text-gray-900', 'dark:hover:bg-blue-500');
        btn.classList.add('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300', 'dark:bg-gray-700', 'dark:text-gray-200', 'dark:hover:bg-gray-600');
        btn.classList.remove('font-semibold');
      });
      // Ensure correct colors are added to the active button
      button.classList.add('bg-blue-700', 'text-white', 'font-semibold', 'hover:bg-blue-800', 'dark:bg-blue-400', 'dark:text-gray-900', 'dark:hover:bg-blue-500');
      button.classList.remove('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300', 'dark:bg-gray-700', 'dark:text-gray-200', 'dark:hover:bg-gray-600');


      workItems.forEach(item => {
        const itemCategories = item.getAttribute('data-category');
        const itemType = item.getAttribute('data-type');

        let showItem = false;

        if (filter === 'all') {
          showItem = true;
        } else if (filter === 'project' || filter === 'publication') {
          showItem = (itemType === filter);
        } else if (itemCategories) {
          const categoriesArray = itemCategories.split(' ');
          showItem = categoriesArray.includes(filter);
        }

        if (showItem) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Trigger the 'All' filter on page load
  setTimeout(() => {
    const allFilterButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allFilterButton) {
      allFilterButton.click();
    }
  }, 50);


}); // End DOMContentLoaded
