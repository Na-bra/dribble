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

// Load all your sections when DOM is ready.
document.addEventListener('DOMContentLoaded', () =>{
  loadContent('home-placeholder', 'sections/home-section.html');
  loadContent('about-placeholder', 'sections/about-section.html');
  loadContent('academic-placeholder', 'sections/academic-section.html');
})