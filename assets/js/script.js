// Custom JavaScript goes here

document.addEventListener('DOMContentLoaded', () => {

  // --- FAQ Toggle Functionality ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    // Set initial state if needed (e.g., all closed)
    // answer.classList.add('hidden'); // Ensure answers are hidden initially if not set in HTML

    question.addEventListener('click', () => {
      // Optional: Close all other open answers before opening the clicked one
      /*
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.querySelector('.faq-answer').classList.add('hidden');
          otherItem.querySelector('.faq-question').classList.remove('active');
          otherItem.querySelector('.faq-icon').textContent = '+'; // Reset icon
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
        icon.textContent = 'x'; // Change to 'x' when open
      } else {
        icon.textContent = '+'; // Change back to '+' when closed
      }
      icon.classList.toggle('active'); // Toggle active class on icon for rotation
    });
  });


  // --- Portfolio/Work Filtering Functionality ---
  // This is a simple client-side filter.
  const filterButtons = document.querySelectorAll('.filter-btn');
  // Target items within the updated grid ID and class
  const workItems = document.querySelectorAll('#work-grid .work-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter'); // e.g., 'all', 'project', 'publication', 'engineering', 'health', 'applications'

      // Update active button style
      filterButtons.forEach(btn => {
        // Ensure correct colors are toggled
        btn.classList.remove('bg-blue-700', 'text-white', 'hover:bg-blue-800');
        btn.classList.add('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300');
        btn.classList.remove('font-semibold'); // Remove bold from inactive
      });
      // Ensure correct colors are added to the active button
      button.classList.add('bg-blue-700', 'text-white', 'font-semibold', 'hover:bg-blue-800');
      button.classList.remove('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300');


      workItems.forEach(item => {
        const itemCategoriesString = item.getAttribute('data-category') || ''; // Get categories string
        const itemType = item.getAttribute('data-type'); // Get type string

        let showItem = false;

        if (filter === 'all') {
          showItem = true;
        } else if (filter === 'project' || filter === 'publication') {
          // Filter by type
          showItem = (itemType === filter);
        } else {
          // Filter by category - check if the filter is one of the item's categories
          const categoriesArray = itemCategoriesString.split(' ').filter(Boolean); // Split string into array, remove empty strings
          showItem = categoriesArray.includes(filter);
        }

        if (showItem) {
          item.style.display = 'block'; // Or use Tailwind 'block' class
        } else {
          item.style.display = 'none'; // Or use Tailwind 'hidden' class
        }
      });
    });
  });

  // Trigger the 'All' filter on page load to show all items initially
  // Use a slight delay to ensure the grid is rendered before filtering
  setTimeout(() => {
    const allFilterButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allFilterButton) {
      allFilterButton.click();
    }
  }, 50); // Small delay


}); // End DOMContentLoaded
