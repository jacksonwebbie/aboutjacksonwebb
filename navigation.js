// Navigation items for the simplified website
const navItems = [
  { name: "Home", link: "index.html" },
  { name: "About", link: "about.html" },
  { name: "Schedule", link: "schedule.html" },
  { name: "Explore", link: "explore.html" },
  { name: "Classes", link: "classes.html" },
  { name: "Shop", link: "shop.html" }
];

// Build navigation bar
function buildNavigation() {
  const nav = document.createElement("nav");
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

  const header = document.querySelector("header");
  header.insertAdjacentElement("afterend", nav);
}

document.addEventListener("DOMContentLoaded", buildNavigation);
