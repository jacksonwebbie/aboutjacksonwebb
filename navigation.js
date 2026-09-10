const navItems = [
  { name: "Home", link: "index.html" }
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
