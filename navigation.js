// Create navigation items
const navItems = [
  { name: "About Me", link: "#about" },
  { name: "Professional", link: "#professional" },
  { name: "Current Projects", link: "#projects" },
  { name: "Hobbies", link: "#hobbies" }
];

// Build the navigation menu
function buildNavigation() {
  const nav = document.createElement("nav");
  nav.id = "sideNav";

  const list = document.createElement("ul");

  navItems.forEach(item => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.textContent = item.name;
    a.href = item.link;

    li.appendChild(a);
    list.appendChild(li);
  });

  nav.appendChild(list);
  document.body.appendChild(nav);
}

// Initialize navigation on page load
document.addEventListener("DOMContentLoaded", buildNavigation);
