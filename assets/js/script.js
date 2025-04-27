// Custom JavaScript goes here

document.addEventListener('DOMContentLoaded', () => {

    // Initialize AOS - Also initialized inline in HTML for simplicity, this is a fallback
    // AOS.init({ duration: 800, once: true });


    // --- Portfolio Filtering Functionality ---
    function initPortfolioFiltering() {
        const filterButtons = document.querySelectorAll('#work-grid-section .filter-btn'); // Get all filter buttons
        const mainFilterButtons = document.querySelectorAll('#work-grid-section .filter-btn.main-filter'); // Get main filter buttons
        const subFilterGroups = document.querySelectorAll('#work-grid-section .sub-filters'); // Get all sub-filter containers
        const workGrid = document.getElementById('work-grid');
        const workItems = workGrid ? workGrid.querySelectorAll('.col.work-item') : []; // Get all work item columns

        // Exit if elements not found
        if (!workItems.length || !filterButtons.length || !workGrid) {
            console.warn("Portfolio filtering elements or work items not found.");
            return;
        }

        // Function to update button active state
        function updateButtonActiveState(activeButton) {
             filterButtons.forEach(btn => {
                 // Remove all active/color classes
                 btn.classList.remove('active', 'btn-primary', 'btn-secondary', 'btn-success', 'btn-info');
                 // Re-add appropriate outline classes based on their filter group
                 if (btn.getAttribute('data-filter-group') === 'main') btn.classList.add('btn-outline-secondary');
                 else if (btn.getAttribute('data-filter-group') === 'projects' || btn.getAttribute('data-filter-group') === 'applications') btn.classList.add('btn-outline-success');
                 else if (btn.getAttribute('data-filter-group') === 'publications') btn.classList.add('btn-outline-info');

                  // Special case for 'All Work' button
                 if (btn.getAttribute('data-filter') === 'all') {
                     btn.classList.remove('btn-outline-secondary'); // Remove secondary outline
                     btn.classList.add('btn-outline-primary'); // Keep 'All Work' outline primary when not active
                 }
             });

            // Set the active button style
            if (activeButton) {
                 activeButton.classList.add('active');
                 // Remove outline class from the active button
                 if (activeButton.classList.contains('btn-outline-primary')) activeButton.classList.remove('btn-outline-primary');
                 else if (activeButton.classList.contains('btn-outline-secondary')) activeButton.classList.remove('btn-outline-secondary');
                 else if (activeButton.classList.contains('btn-outline-success')) activeButton.classList.remove('btn-outline-success');
                 else if (activeButton.classList.contains('btn-outline-info')) activeButton.classList.remove('btn-outline-info');


                 // Add the solid color class based on the button's filter group or value
                 if (activeButton.getAttribute('data-filter') === 'all') activeButton.classList.add('btn-primary'); // 'All Work' becomes primary solid
                 else if (activeButton.getAttribute('data-filter-group') === 'main') activeButton.classList.add('btn-secondary'); // Main filters become secondary solid
                 else if (activeButton.getAttribute('data-filter-group') === 'projects' || activeButton.getAttribute('data-filter-group') === 'applications') activeButton.classList.add('btn-success'); // Project/Application sub-filters become success solid
                 else if (activeButton.getAttribute('data-filter-group') === 'publications') activeButton.classList.add('btn-info'); // Publication sub-filters become info solid

            }
        }


        // Function to filter work items and manage sub-filters visibility
        function filterWorkItemsAndSubFilters(filterValue, filterGroup) {
             workItems.forEach(item => {
                const itemType = item.getAttribute('data-type');
                const itemCategories = item.getAttribute('data-category'); // e.g., "engineering applications"

                let showItem = false;

                // Determine if the item should be shown based on the filter value
                switch (filterValue) {
                    case 'all':
                        showItem = true;
                        break;
                    case 'project':
                    case 'publication':
                    case 'application':
                         // If a main type filter is clicked, show items matching that type
                        showItem = (itemType === filterValue);
                        break;
                    // Sub-filters - check if the category is present in the item's categories
                    case 'engineering':
                    case 'healthcare':
                    case 'journals':
                    case 'conferences':
                         if (itemCategories) {
                            const categoriesArray = itemCategories.split(' ');
                            showItem = categoriesArray.includes(filterValue);
                        }
                        break;
                    default:
                        showItem = true; // Fallback to showing all
                }

                 // Toggle visibility using Bootstrap's d-none for better performance with AOS
                 // Using setTimeout to allow AOS to calculate visibility before hiding
                 setTimeout(() => {
                     if (showItem) {
                        item.classList.remove('d-none');
                     } else {
                         item.classList.add('d-none');
                     }
                 }, 50); // Small delay


            });

            // Manage sub-filter button group visibility
            subFilterGroups.forEach(group => {
                // Hide all sub-filter groups initially
                 group.style.display = 'none';
             });

             // Show the relevant sub-filter group based on the main filter clicked
             // Only show sub-filters when a specific type (project, publication, application) is selected, NOT when 'All Work' is selected.
             if (filterValue === 'project') {
                 document.getElementById('project-subfilters').style.display = 'block';
             } else if (filterValue === 'publication') {
                 document.getElementById('publication-subfilters').style.display = 'block';
             } else if (filterValue === 'application') {
                 // Assuming Engineering/Healthcare also apply to Applications, show that group
                 // You might want a separate application sub-filter div if the filters are different
                 document.getElementById('project-subfilters').style.display = 'block';
             }
             // If a sub-filter is clicked, the parent group remains visible because we don't hide it here.
             // The initial state (on page load or 'All Work' click) hides all sub-filter groups.


             // Re-initialize AOS after filtering to animate newly visible items
             // Note: AOS might not re-animate elements already in view that were hidden/shown.
             setTimeout(() => { // Small delay helps ensure display changes are processed
                 AOS.refreshHard(); // Use refreshHard to re-calculate all element positions
             }, 100); // Slightly longer delay for refreshHard
        }

        // Add click listeners to all filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');
                const filterGroup = button.getAttribute('data-filter-group');

                 // Update active state for buttons
                 updateButtonActiveState(button);

                 // Apply item filtering and manage sub-filters visibility
                 filterWorkItemsAndSubFilters(filterValue, filterGroup);
            });
        });

        // Trigger the 'All Work' filter button click on page load
        const allFilterButton = document.querySelector('.filter-btn[data-filter="all"]');
        if (allFilterButton) {
            // Use a small delay to ensure elements are rendered before filtering
            setTimeout(() => {
                 allFilterButton.click();
            }, 100);
        }
    }

    // Initialize Portfolio Filtering if on the portfolio page
    if (document.getElementById('work-grid-section')) { // Check for the section container ID
         initPortfolioFiltering();
    }


    // --- FAQ Toggle Functionality (Bootstrap's JS handles this via data-bs-toggle="collapse") ---
    // No custom JS needed if using Bootstrap's built-in Accordion component.
    // Ensure your FAQ HTML uses data-bs-toggle and data-bs-target correctly.


    // --- Smooth Scrolling for Table of Contents ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if the link is internal to the current page and points to an element ID
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#' && document.querySelector(targetId)) {
                 e.preventDefault(); // Prevent default anchor jump

                 document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth' // Smooth scroll
                 });

                 // Optional: Update URL hash without jumping
                 // history.pushState(null, null, targetId);
            }
        });
    });


    // --- Other Custom JS (Keep existing if you had it) ---
    // ... any other custom script code here ...

}); // End DOMContentLoaded
