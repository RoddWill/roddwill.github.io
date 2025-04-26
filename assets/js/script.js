// Custom JavaScript for Portfolio Filtering and FAQ Toggle

document.addEventListener('DOMContentLoaded', () => {

  // --- FAQ Toggle Functionality ---
  // This section remains the same as before
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    question.addEventListener('click', () => {
      answer.classList.toggle('hidden');
      question.classList.toggle('active');

      if (question.classList.contains('active')) {
        icon.textContent = 'x';
      } else {
        icon.textContent = '+';
      }
      icon.classList.toggle('active');
    });
  });


  // --- Portfolio/Work Filtering Functionality ---
  const primaryFilterButtons = document.querySelectorAll('.primary-filter');
  const secondaryFilterGroups = document.querySelectorAll('.secondary-filter-group');
  const secondaryFilterButtons = document.querySelectorAll('.secondary-filter'); // Select all secondary buttons
  const workItems = document.querySelectorAll('.work-item'); // Select all work items

  let activePrimaryFilter = 'all'; // Track the currently active primary filter
  let activeSecondaryFilter = 'all'; // Track the currently active secondary filter within a group

  // Function to update button styles
  const updateButtonStyles = (buttons, activeFilter) => {
    buttons.forEach(btn => {
      if (btn.getAttribute('data-filter') === activeFilter) {
        btn.classList.remove('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300');
        btn.classList.add('bg-blue-700', 'text-white', 'font-semibold', 'hover:bg-blue-800');
      } else {
        btn.classList.remove('bg-blue-700', 'text-white', 'font-semibold', 'hover:bg-blue-800');
        // Handle specific gray for secondary 'All' buttons
        if (btn.classList.contains('bg-gray-300')) {
          btn.classList.add('bg-gray-300', 'text-gray-800', 'hover:bg-gray-400');
        } else {
          btn.classList.add('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300');
        }
      }
    });
  };

  // Function to filter work items
  const filterWorkItems = () => {
    workItems.forEach(item => {
      const itemType = item.getAttribute('data-type');
      const itemCategoriesString = item.getAttribute('data-category') || '';
      const itemCategoriesArray = itemCategoriesString.split(' ').filter(Boolean);

      let showItem = false;

      // Step 1: Filter by Primary Type
      const matchesPrimary = (activePrimaryFilter === 'all') || (itemType === activePrimaryFilter);

      if (matchesPrimary) {
        // Step 2: Apply Secondary Filter (if applicable)
        if (activePrimaryFilter === 'project' || activePrimaryFilter === 'publication') {
          // Check secondary filter within the active group
          if (activeSecondaryFilter.startsWith('all-')) { // 'all-projects' or 'all-publications'
            showItem = true; // Show all items of this type
          } else { // Filter by specific category (engineering, health, journal, conference)
            showItem = itemCategoriesArray.includes(activeSecondaryFilter);
          }
        } else if (activePrimaryFilter === 'application') {
          // Applications view - no secondary filtering applied here based on current design
          showItem = true;
        } else { // 'all' primary filter
          showItem = true; // Show all items
        }
      }

      // Toggle visibility
      if (showItem) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });

    // Adjust layout for application items when 'application' filter is active
    const applicationItems = document.querySelectorAll('.application-item');
    applicationItems.forEach(item => {
      if (activePrimaryFilter === 'application') {
        // Apply wide column span for application layout
        item.classList.remove('md:col-span-2', 'lg:col-span-3'); // Remove potential previous spans
        item.classList.add('col-span-1', 'md:col-span-2', 'lg:col-span-3'); // Make it span across columns
      } else {
        // Reset to default grid behavior (or hide if not shown by filter)
        item.classList.remove('col-span-1', 'md:col-span-2', 'lg:col-span-3');
        // Re-apply default grid classes if you had them originally
        // item.classList.add('col-span-1', 'md:col-span-X', 'lg:col-span-Y'); // Add back default span if needed
      }
    });
  };

  // Event listeners for primary filter buttons
  primaryFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
      activePrimaryFilter = button.getAttribute('data-filter');

      // Hide all secondary filter groups
      secondaryFilterGroups.forEach(group => group.classList.add('hidden'));

      // Show the relevant secondary filter group and activate its default filter
      if (activePrimaryFilter === 'project') {
        document.getElementById('secondary-filters').classList.remove('hidden');
        document.getElementById('project-subfilters').classList.remove('hidden');
        activeSecondaryFilter = 'all-projects'; // Set default secondary filter
        updateButtonStyles(document.querySelectorAll('#project-subfilters .secondary-filter'), activeSecondaryFilter); // Update secondary button styles
      } else if (activePrimaryFilter === 'publication') {
        document.getElementById('secondary-filters').classList.remove('hidden');
        document.getElementById('publication-subfilters').classList.remove('hidden');
        activeSecondaryFilter = 'all-publications'; // Set default secondary filter
        updateButtonStyles(document.querySelectorAll('#publication-subfilters .secondary-filter'), activeSecondaryFilter); // Update secondary button styles
      } else {
        document.getElementById('secondary-filters').classList.add('hidden');
        activeSecondaryFilter = 'all'; // No secondary filter active for 'all' or 'application'
      }

      // Update primary button styles
      updateButtonStyles(primaryFilterButtons, activePrimaryFilter);

      // Apply filtering
      filterWorkItems();
    });
  });

  // Event listeners for secondary filter buttons
  secondaryFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
      activeSecondaryFilter = button.getAttribute('data-filter');

      // Update secondary button styles within the active group
      // Find the parent secondary filter group to only update buttons within that group
      const parentGroup = button.closest('.secondary-filter-group');
      if (parentGroup) {
        updateButtonStyles(parentGroup.querySelectorAll('.secondary-filter'), activeSecondaryFilter);
      }


      // Apply filtering (re-applies primary filter and the new secondary filter)
      filterWorkItems();
    });
  });


  // Trigger the default primary filter ('all') on page load
  setTimeout(() => {
    const defaultFilterButton = document.querySelector('.primary-filter[data-filter="all"]');
    if (defaultFilterButton) {
      defaultFilterButton.click();
    }
  }, 50); // Small delay


}); // End DOMContentLoaded
