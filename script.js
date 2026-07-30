//Function to load an external HTML section into an element
async function loadContent(elementId, filePath){
  try{
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load ${filePath}`);
    const htmlContent = await response.text();
    document.getElementById(elementId).innerHTML = htmlContent;
  } catch(error){
    console.error('Error loading content:', error)
  }
}

const toggleTheme = function(){
  const themeToggleBtn = document.getElementById('theme-toggle');

  //Check current saved theme in local storage and load
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark'){
    document.body.classList.add('dark-theme');
    themeToggleBtn.textContent = '☀️ Light Mode'
  }

  // Add click listener to switch themes
  themeToggleBtn.addEventListener('click',() =>{
    // Toggle the .dark-theme in body
    document.body.classList.toggle('dark-theme');

    //Check if body now has dark-theme class
    const isDarkMode = document.body.classList.contains('dark-theme');
    
    if (isDarkMode){
      localStorage.setItem('theme', 'dark');
      themeToggleBtn.textContent = '☀️';
    } else{
      localStorage.setItem('theme', 'light');
      themeToggleBtn.textContent = '🌙'
    }
  })
}
// Load all your sections when DOM is ready.
document.addEventListener('DOMContentLoaded', () =>{
  loadContent('home-placeholder', 'sections/home-section.html');
  loadContent('about-placeholder', 'sections/about-section.html');
  loadContent('academic-placeholder', 'sections/academic-section.html');
  toggleTheme();

})