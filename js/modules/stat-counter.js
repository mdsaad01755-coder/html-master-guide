/**
 * Stat Counter Animation Module
 * Animates stat values with a smooth count-up effect when they scroll into view
 */

export function initStatCounter() {
  const statValues = document.querySelectorAll('.stat-value');
  
  if (!statValues.length) return;

  // Create an Intersection Observer to detect when stats enter viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        // Mark as animated to prevent re-triggering
        entry.target.dataset.animated = 'true';
        
        // Get the target value from data attribute
        const targetValue = parseInt(entry.target.dataset.target, 10);
        
        // Start the count-up animation
        animateCounter(entry.target, targetValue);
        
        // Stop observing this element
        observer.unobserve(entry.target);
      }
    });
  }, {
    // Trigger when element is 20% visible
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all stat value elements
  statValues.forEach((stat) => {
    observer.observe(stat);
  });
}

/**
 * Animate a counter from 0 to target value
 * @param {HTMLElement} element - The element to animate
 * @param {number} targetValue - The target number to count to
 */
function animateCounter(element, targetValue) {
  const duration = 1800; // 1.8 seconds
  const startTime = performance.now();
  const startValue = 0;

  // Use easing function for smooth deceleration
  const easeOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeOutQuad(progress);

    // Calculate current value
    const currentValue = Math.floor(startValue + (targetValue - startValue) * easeProgress);

    // Update the element text
    element.textContent = currentValue;

    // Continue animation if not complete
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      // Ensure final value is set
      element.textContent = targetValue;
    }
  }

  requestAnimationFrame(updateCounter);
}
