// function loadComponent(component, file) {
//   fetch(file)
//     .then(response => response.text())
//     .then(data => {
//       console.log("Fetched data for:", component); // Log here
//       document.querySelector(component).innerHTML = data;
//     })
//     .catch(error => console.error("Error loading component:", component, error)); // Handle errors
// }

  
  // Load Navbar and Sidebar on page load
  window.onload = function() {
    loadComponent('#navbar', 'navbar.html');
    loadComponent('#sidebar', 'sidebar.html');
  };
  
  $('table').DataTable();
