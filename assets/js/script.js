// Custom JavaScript goes here

document.addEventListener('DOMContentLoaded', () => {

    // Initialize AOS - Also initialized inline in HTML for simplicity, this is a fallback
    // AOS.init({ duration: 800, once: true });


    // --- Portfolio Filtering Functionality ---
    function initPortfolioFiltering() {
        const filterButtons = document.querySelectorAll('#work-grid-section .filter-btn'); // Target buttons within the portfolio section
        const workGrid = document.getElementById('work-grid');
        const workItems = workGrid ? workGrid.querySelectorAll('.col.work-item') : []; // Target the column div containing the card

        // Exit if no work items or buttons found
        if (!workItems.length || !filterButtons.length) {
            console.warn("Portfolio filtering elements or work items not found.");
            return;
        }

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter'); // e.g., 'all', 'project', 'engineering', 'journals', etc.

                // Update active button style (using Bootstrap's .active class)
                filterButtons.forEach(btn => {
                     btn.classList.remove('active', 'btn-primary');
                     // Re-add appropriate outline classes if you want them to revert visually
                     if (btn.classList.contains('btn-outline-secondary')) btn.classList.add('btn-outline-secondary');
                     else if (btn.classList.contains('btn-outline-success')) btn.classList.add('btn-outline-success');
                     else if (btn.classList.contains('btn-outline-info')) btn.classList.add('btn-outline-info');
                     else if (btn.classList.contains('btn-outline-primary')) btn.classList.add('btn-outline-primary');

                });
                button.classList.add('active', 'btn-primary'); // Apply active style


                workItems.forEach(item => {
                    const itemType = item.getAttribute('data-type'); // 'project', 'publication', 'application'
                    const itemCategories = item.getAttribute('data-category'); // e.g., "engineering applications"

                    let showItem = false;

                    switch (filterValue) {
                        case 'all':
                            showItem = true;
                            break;
                        case 'project':
                        case 'publication':
                        case 'application':
                            // Filter by specific type (All Projects, All Publications, All Applications)
                            showItem = (itemType === filterValue);
                            break;
                        case 'engineering':
                        case 'healthcare':
                        case 'journals':
                        case 'conferences':
                            // Filter by specific category (Engineering, Healthcare, Journals, Conferences)
                            if (itemCategories) {
                                const categoriesArray = itemCategories.split(' '); // Split string into array
                                showItem = categoriesArray.includes(filterValue);
                            }
                            break;
                        default:
                            showItem = true; // Default to showing everything if filter is unknown
                    }

                    // Toggle item visibility using Bootstrap's d-none utility or direct style
                    if (showItem) {
                        item.style.display = 'block'; // Use block to override Bootstrap's d-none if present
                         // item.classList.remove('d-none'); // Alternative using Bootstrap class
                    } else {
                         item.style.display = 'none'; // Hide the element
                        // item.classList.add('d-none'); // Alternative using Bootstrap class
                    }
                });

                 // Optional: Re-initialize AOS after filtering to animate visible items
                 // Note: AOS might not re-animate elements already in view that were hidden/shown.
                 // You might need a more complex approach if you require re-animation on filter change.
                 // AOS.refresh();
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
    if (document.getElementById('work-grid')) {
         initPortfolioFiltering();
    }


    // --- FAQ Toggle Functionality (Bootstrap's JS handles this via data-bs-toggle="collapse") ---
    // No custom JS needed if using Bootstrap's built-in Accordion component.


    // --- Other Custom JS (Keep existing if you had it) ---
    // ... any other custom script code here ...

}); // End DOMContentLoaded
