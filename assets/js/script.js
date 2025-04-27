// Custom JavaScript goes here

document.addEventListener('DOMContentLoaded', () => {
    // This is where you would add custom JS that is NOT part of Bootstrap or AOS
    // For example:
    // - Custom modal logic
    // - Form validation beyond Bootstrap's built-in
    // - Infinite scrolling for blog posts
    // - Client-side filtering (like the previous project filtering)

    // Example: A simple console log to confirm script is loading
    console.log('Custom script loaded.');

    // The AOS initialization is done inline in the HTML script tag for simplicity
    // AOS.init({ duration: 800, once: true });

    // If you implement client-side project filtering again, the function would go here:
    /*
    function initProjectFiltering() {
        const filterButtons = document.querySelectorAll('[data-filter]');
        const projectsGrid = document.getElementById('projects-grid');
        const projectItems = projectsGrid ? projectsGrid.querySelectorAll('.col') : []; // Target the column div containing the card

        if (!projectsGrid || projectItems.length === 0) return; // Exit if no projects grid

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');

                // Update active button style (requires custom CSS or utility classes)
                filterButtons.forEach(btn => btn.classList.remove('active')); // Assuming 'active' class exists for styling
                button.classList.add('active');

                projectItems.forEach(item => {
                    const itemCategories = item.getAttribute('data-category');

                    if (filterValue === 'all') {
                        item.style.display = 'block'; // Show the grid column
                    } else {
                        if (itemCategories && itemCategories.includes(filterValue)) {
                            item.style.display = 'block'; // Show the grid column
                        } else {
                            item.style.display = 'none'; // Hide the grid column
                        }
                    }
                });
            });
        });

        // Trigger 'All' filter on page load
         const allButton = document.querySelector('[data-filter="all"]');
         if(allButton) {
             allButton.click();
         }
    }

    // Call the filtering function if on the projects page
    if (document.getElementById('projects-grid')) {
         initProjectFiltering();
    }
    */

});
