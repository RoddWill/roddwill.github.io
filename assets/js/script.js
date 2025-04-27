// Custom JavaScript goes here

document.addEventListener('DOMContentLoaded', () => {

    // --- Portfolio Filtering Functionality ---
    function initPortfolioFiltering() {
        const filterButtons = document.querySelectorAll('#work-grid-section .filter-btn'); // Target buttons within a specific section if needed
        const workItems = document.querySelectorAll('#work-grid .col.work-item'); // Target the column div containing the card

        // Exit if no work items or buttons found
        if (!workItems.length || !filterButtons.length) {
            console.warn("Portfolio filtering elements not found.");
            return;
        }

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter'); // e.g., 'all', 'project', 'engineering', 'journals', etc.

                // Update active button style
                filterButtons.forEach(btn => {
                    btn.classList.remove('active'); // Remove Bootstrap's active class
                    // You might need to toggle custom classes here for specific colors if not using Bootstrap's active state
                    // e.g., btn.classList.remove('btn-primary'); btn.classList.add('btn-outline-primary');
                });
                button.classList.add('active'); // Add Bootstrap's active class

                // If using custom colors for active state instead of Bootstrap's .active class:
                // filterButtons.forEach(btn => {
                //     if (btn.getAttribute('data-filter') === filterValue) {
                //         btn.classList.remove('btn-outline-primary', 'btn-outline-secondary', 'btn-outline-success', 'btn-outline-info');
                //         btn.classList.add('btn-primary'); // Or a specific active color class
                //     } else {
                //          // Reset to outline based on original type or a default
                //          // This requires more complex logic or separate classes per button type
                //     }
                // });


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
                 // AOS.refresh(); // Note: AOS might not re-animate elements already in view
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


    // --- FAQ Toggle Functionality (Keep existing if you had it) ---
    // Ensure your FAQ script targets the correct Bootstrap accordion structure
    // ... your existing FAQ script code here ...


    // --- Other Custom JS (Keep existing if you had it) ---
    // ... any other custom script code here ...

}); // End DOMContentLoaded
