async function loadNavbar() {
  const container = document.getElementById("navbar-container");
  if (!container) return;

  try {
    const response = await fetch("/navbar.html");
    const html = await response.text();
    container.innerHTML = html;

    // Elements now exist
    const toggleButton = document.getElementById("toggle-btn");
    const sidebar = document.getElementById("sidebar");

    function closeAllSubMenus() {
      Array.from(sidebar.getElementsByClassName("show")).forEach((ul) => {
        ul.classList.remove("show");
        ul.previousElementSibling.classList.remove("rotate");
      });
    }

    function toggleSubMenu(button) {
      if (!button.nextElementSibling.classList.contains("show")) {
        closeAllSubMenus();
      }

      button.nextElementSibling.classList.toggle("show");
      button.classList.toggle("rotate");

      if (sidebar.classList.contains("close")) {
        sidebar.classList.toggle("close");
        toggleButton.classList.toggle("rotate");
      }
    }

    function toggleSidebar() {
      sidebar.classList.toggle("close");
      toggleButton.classList.toggle("rotate");
      closeAllSubMenus();
    }

    // Attach event listeners
    toggleButton.addEventListener("click", toggleSidebar);
    document.querySelectorAll(".dropdown-btn").forEach((btn) => {
      btn.addEventListener("click", () => toggleSubMenu(btn));
    });
  } catch (err) {
    console.error("Failed to load navbar:", err);
  }
}

loadNavbar();
