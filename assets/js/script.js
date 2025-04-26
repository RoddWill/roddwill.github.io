// Custom JavaScript goes here

document.addEventListener('DOMContentLoaded', () => {

  // --- FAQ Toggle Functionality ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon'); // Get the icon element

    question.addEventListener('click', () => {
      // Close all other open answers
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.querySelector('.faq-answer').classList.add('hidden');
          otherItem.querySelector('.faq-question').classList.remove('active'); // Remove active class
          otherItem.querySelector('.faq-icon').textContent = '+'; // Reset icon
          otherItem.querySelector('.faq-icon').classList.remove('active');
        }
      });

      // Toggle the clicked answer
      answer.classList.toggle('hidden');
      question.classList.toggle('active'); // Add/remove active class for styling
      icon.classList.toggle('active');

      // Change the icon based on the state
      if (question.classList.contains('active')) {
        icon.textContent = 'x'; // Change to 'x' when open
      } else {
        icon.textContent = '+'; // Change back to '+' when closed
      }
    });
  });


  // --- Portfolio Filtering Functionality (Basic Example) ---
  // This is a simple client-side filter. For large portfolios,
  // server-side rendering or a static site generator might be better.
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      // Update active button style (basic example)
      filterButtons.forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-800');
      });
      button.classList.add('bg-blue-600', 'text-white');
      button.classList.remove('bg-gray-200', 'text-gray-800');


      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.style.display = 'block'; // Or use Tailwind 'block' class
        } else {
          card.style.display = 'none'; // Or use Tailwind 'hidden' class
        }
      });
    });
  });

  // Trigger the 'All' filter on page load to show all projects initially
  const allFilterButton = document.querySelector('.filter-btn[data-filter="all"]');
  if (allFilterButton) {
    allFilterButton.click();
  }


});

// Add any other global JavaScript functions here
