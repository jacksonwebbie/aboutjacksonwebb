const navItems = [
  { name: "About Me", link: "/about.html" },
  { name: "Professional", link: "/professional.html" },
  { name: "Current Projects", link: "/projects.html" },
  { name: "Hobbies", link: "/hobbies.html" },
  { name: "Classes", link: "/classes.html" }
];

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
