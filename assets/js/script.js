// --- Portfolio/Work Filtering Functionality ---
  // This is a simple client-side filter.
  const filterButtons = document.querySelectorAll('.filter-btn');
  // Changed selector to target items within the updated grid ID and class
  const workItems = document.querySelectorAll('#work-grid .work-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter'); // e.g., 'all', 'project', 'publication', 'engineering', 'health', 'applications'

      // Update active button style
      filterButtons.forEach(btn => {
        btn.classList.remove('bg-blue-700', 'text-white', 'hover:bg-blue-800');
        btn.classList.add('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300');
        btn.classList.remove('font-semibold');
      });
      button.classList.add('bg-blue-700', 'text-white', 'font-semibold', 'hover:bg-blue-800');
      button.classList.remove('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300');


      workItems.forEach(item => {
        const itemCategories = item.getAttribute('data-category'); // e.g., "engineering predictive applications"
        const itemType = item.getAttribute('data-type'); // e.g., "project" or "publication"

        let showItem = false;

        if (filter === 'all') {
          showItem = true;
        } else if (filter === 'project' || filter === 'publication') {
          // Filter by type
          showItem = (itemType === filter);
        } else if (itemCategories) {
          // Filter by category - check if the filter is one of the item's categories
          const categoriesArray = itemCategories.split(' '); // Split string into array
          showItem = categoriesArray.includes(filter);
        }

        if (showItem) {
          item.style.display = 'block'; // Use 'block' for grid items
        } else {
          item.style.display = 'none'; // Use 'none' to hide
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
