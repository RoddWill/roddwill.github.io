/* Custom styles go here, supplementing or overriding Tailwind defaults */

/* Basic body styling for font smoothing */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Add specific styles if needed */
/* Example: A subtle hover effect for cards not covered by Tailwind utilities */
/* .project-card:hover {
  transform: translateY(-5px);
} */

/* Styling for the FAQ toggle icon */
.faq-item .faq-question .faq-icon {
  transition: transform 0.3s ease;
}

.faq-item .faq-question.active .faq-icon {
  transform: rotate(45deg); /* Change + to x when active */
}

/* Add any specific styles for elements that don't have sufficient Tailwind classes */
/* For instance, if you need a specific gradient or background image not easily done with utilities */
/* .custom-hero-background {
  background-image: url('../images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
} */
