//Function to load an external HTML section into an element
async function loadContent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load ${filePath}`);
    const htmlContent = await response.text();
    document.getElementById(elementId).innerHTML = htmlContent;
  } catch (error) {
    console.error("Error loading content:", error);
  }
}

const toggleTheme = function () {
  const themeToggleBtn = document.getElementById("theme-toggle");

  //Check current saved theme in local storage and load
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeToggleBtn.textContent = "☀️ Light Mode";
  }

  // Add click listener to switch themes
  themeToggleBtn.addEventListener("click", () => {
    // Toggle the .dark-theme in body
    document.body.classList.toggle("dark-theme");

    //Check if body now has dark-theme class
    const isDarkMode = document.body.classList.contains("dark-theme");

    if (isDarkMode) {
      localStorage.setItem("theme", "dark");
      themeToggleBtn.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      themeToggleBtn.textContent = "🌙";
    }
  });
};

const textCounter = function () {
  const animateCounter = (el) => {
    const target = +el.getAttribute("data-target");
    if (isNaN(target)) return; // Don't run if target is not a number

    let current = 0;
    const duration = 1500; // Animation duration in ms
    const stepTime = 10; // Update every 10ms for a smooth animation

    // Calculate a dynamic increment to ensure all counters finish in roughly the same time.
    const increment = Math.max(Math.ceil(target / (duration / stepTime)), 1);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target; // Ensure the final number is exactly the target
        clearInterval(timer);
      } else {
        el.textContent = current; // Update the number
      }
    }, stepTime);
  };
  // Trigger when scrolled into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target); // Run only once
      }
    });
  }, {threshold: 0.5});

  document.querySelectorAll(".stat-number").forEach((num) => observer.observe(num));
};

const morphNavbar = () => {
  const navToggle = document.getElementById('nav-toggle');
  const navBar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.navbar a');

  if (navToggle && navBar){
    // Toggle Menu on button click
    navToggle.addEventListener('click', () => {
      navBar.classList.toggle('is-active');
      navToggle.classList.toggle('is-active');

      const isOpen = navBar.classList.contains('is-active');
      // Accessibility state update
      navToggle.setAttribute('aria-expanded', isOpen.toString());
    });

    // Auto-close menu when a link inside is clicked
    navLinks.forEach(link =>{
      link.addEventListener('click', () => {
        if (navBar.classList.contains('is-active')){
          navBar.classList.remove('is-active');
          navToggle.classList.remove('is-active');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      })
    })
  }
}
// Load all your sections when DOM is ready.
document.addEventListener("DOMContentLoaded", async () => {
  // Await the loading of content to prevent race conditions
  await loadContent("home-placeholder", "sections/home-section.html");
  await loadContent("about-placeholder", "sections/about-section.html");
  await loadContent("academic-placeholder", "sections/academic-section.html");

  // Initialize scripts that depend on the loaded content
  toggleTheme();
  morphNavbar();
  textCounter();
});
