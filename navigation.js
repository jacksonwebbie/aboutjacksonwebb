/* ============================================================
   Shared layout script for every page.
   Fills in: primary navigation (header + left column),
   secondary "on this page" navigation, the sticky right column,
   and the footer. Edit the lists below and every page updates.
   ============================================================ */

// Primary navigation: every page on the site
const navItems = [
  { name: "Home", link: "index.html" },
  { name: "About", link: "about.html" },
  { name: "Schedule", link: "schedule.html" },
  { name: "Classes", link: "classes.html" },
  { name: "Projects", link: "projects.html" },
  { name: "Professional", link: "professional.html" },
  { name: "Contact", link: "contact.html" }
];

// Sticky right column content
const latestUpdates = [
  "Website redesign complete.",
  "Logo linked to Instagram.",
  "New sky-blue theme applied."
];

// Upcoming shows (keep in sync with schedule.html)
const shows = [
  { date: "2026-09-17", place: "Outlaws @ Ames" },
  { date: "2026-10-08", place: "Outlaws @ Ames" },
  { date: "2026-11-05", place: "Outlaws @ Ames" },
  { date: "2026-11-20", place: "Outlaws @ Ames" },
  { date: "2026-12-03", place: "Outlaws @ Ames" }
];

const instagramUrl = "https://www.instagram.com/jacksonwebbie";

// Webmaster email shown in the footer. Replace with your email.
const webmasterEmail = "YOUR-EMAIL-HERE";

const currentPage = window.location.pathname.split("/").pop() || "index.html";

// Builds a <ul> of page links, marking the current page
function buildLinkList() {
  const list = document.createElement("ul");

  navItems.forEach(function (item) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = item.name;
    a.href = item.link;

    if (item.link === currentPage) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }

    li.appendChild(a);
    list.appendChild(li);
  });

  return list;
}

// Header navigation (horizontal, with a Menu button on phones)
function buildPrimaryNav() {
  const nav = document.querySelector(".primary-nav");
  if (!nav) return;

  const toggle = document.createElement("button");
  toggle.className = "nav-toggle";
  toggle.textContent = "Menu";
  toggle.setAttribute("aria-expanded", "false");

  const list = buildLinkList();

  toggle.addEventListener("click", function () {
    const isOpen = list.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.appendChild(toggle);
  nav.appendChild(list);
}

// Left column: primary navigation (vertical)
function buildSideNav() {
  const nav = document.querySelector(".side-nav");
  if (!nav) return;

  const heading = document.createElement("h2");
  heading.className = "col-heading";
  heading.textContent = "Pages";

  nav.appendChild(heading);
  nav.appendChild(buildLinkList());
}

// Left column: secondary navigation built from this page's headings
function buildSecondaryNav() {
  const nav = document.querySelector(".secondary-nav");
  const headings = document.querySelectorAll(".content h2");
  if (!nav) return;

  if (headings.length < 2) {
    nav.hidden = true;
    return;
  }

  const heading = document.createElement("h2");
  heading.className = "col-heading";
  heading.textContent = "On this page";

  const list = document.createElement("ul");

  headings.forEach(function (h, i) {
    if (!h.id) h.id = "section-" + (i + 1);

    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent;
    li.appendChild(a);
    list.appendChild(li);
  });

  nav.appendChild(heading);
  nav.appendChild(list);
}

// Right column: news, next shows, lessons offer, site info, social
function buildStickyContent() {
  const col = document.querySelector(".right-col");
  if (!col) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = shows
    .filter(function (s) { return new Date(s.date + "T00:00:00") >= today; })
    .slice(0, 2);

  let showsHtml = "";
  if (upcoming.length === 0) {
    showsHtml = "<p>New dates coming soon.</p>";
  } else {
    upcoming.forEach(function (s) {
      const d = new Date(s.date + "T00:00:00");
      const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      showsHtml += "<p><strong>" + label + "</strong> · " + s.place + "</p>";
    });
  }

  let updatesHtml = "";
  latestUpdates.forEach(function (u) {
    updatesHtml += "<li>" + u + "</li>";
  });

  col.innerHTML =
    '<div class="box">' +
      '<h2 class="col-heading">Latest Updates</h2>' +
      "<ul class=\"news\">" + updatesHtml + "</ul>" +
    "</div>" +
    '<div class="box">' +
      '<h2 class="col-heading">Next Shows</h2>' +
      showsHtml +
      '<p><a class="inline-link" href="schedule.html">Full schedule</a></p>' +
    "</div>" +
    '<div class="box offer">' +
      '<h2 class="col-heading">Lessons</h2>' +
      "<p>Classes and 1 on 1 lessons available.</p>" +
      '<a class="btn" href="classes.html">Learn more</a>' +
    "</div>" +
    '<div class="box">' +
      '<h2 class="col-heading">Site Info</h2>' +
      "<p>Based in Iowa. Questions or bookings? Use the " +
      '<a class="inline-link" href="contact.html">contact form</a>.</p>' +
    "</div>" +
    '<div class="box">' +
      '<h2 class="col-heading">Follow</h2>' +
      '<a class="social" href="' + instagramUrl + '" target="_blank" rel="noopener" aria-label="Instagram">' +
        '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">' +
          '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/>' +
          '<circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/>' +
          '<circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>' +
        "</svg>" +
        "<span>@jacksonwebbie</span>" +
      "</a>" +
    "</div>";
}

// Footer: copyright, current year, links, contact, privacy, webmaster email
function buildFooter() {
  const footer = document.querySelector(".site-footer");
  if (!footer) return;

  const links = navItems.map(function (item) {
    return '<a href="' + item.link + '">' + item.name + "</a>";
  }).join("");

  footer.innerHTML =
    '<nav class="footer-links" aria-label="Footer">' + links +
      '<a href="privacy.html">Privacy Statement</a>' +
    "</nav>" +
    '<p>© ' + new Date().getFullYear() + " Jackson Webb. All rights reserved.</p>" +
    "<p>Contact: <a href=\"contact.html\">contact form</a> · " +
    '<a href="' + instagramUrl + '" target="_blank" rel="noopener">Instagram</a></p>' +
    "<p>Webmaster: " + webmasterEmail + "</p>";
}

// Glow that follows the mouse (skipped on touch screens)
function setupCursorGlow() {
  const glow = document.getElementById("cursor-glow");
  if (!glow) return;

  if (window.matchMedia("(hover: none)").matches) {
    glow.remove();
    return;
  }

  document.addEventListener("mousemove", function (e) {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  buildPrimaryNav();
  buildSideNav();
  buildSecondaryNav();
  buildStickyContent();
  buildFooter();
  setupCursorGlow();
});
