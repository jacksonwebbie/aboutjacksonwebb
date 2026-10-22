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

// Secondary navigation: quick links shown under the primary navigation
const secondaryItems = [
  { name: "Book Me", link: "contact.html" },
  { name: "Lessons", link: "classes.html" },
  { name: "Next Shows", link: "schedule.html" },
  { name: "Privacy", link: "privacy.html" }
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
const webmasterEmail = "jwebb625@gmail.com";

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

// Pinned navigation bar: slides in at the top of the screen once the
// header's primary navigation scrolls out of view.
function buildPinnedNav() {
  const original = document.querySelector(".primary-nav");
  if (!original || !("IntersectionObserver" in window)) return;

  const bar = document.createElement("div");
  bar.className = "pinned-bar";

  const nav = document.createElement("nav");
  nav.className = "pinned-inner";
  nav.setAttribute("aria-label", "Primary navigation (pinned)");

  const home = document.createElement("a");
  home.className = "pinned-brand";
  home.href = "index.html";
  home.textContent = "Jackson Webb";

  const toggle = document.createElement("button");
  toggle.className = "pinned-toggle";
  toggle.textContent = "Menu";
  toggle.setAttribute("aria-expanded", "false");

  const list = buildLinkList();

  toggle.addEventListener("click", function () {
    const isOpen = list.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.appendChild(home);
  nav.appendChild(toggle);
  nav.appendChild(list);
  bar.appendChild(nav);
  document.body.appendChild(bar);

  const observer = new IntersectionObserver(function (entries) {
    const show = !entries[0].isIntersecting;
    bar.classList.toggle("show", show);
    if (!show) {
      list.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  observer.observe(original);
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

// Builds a simple <ul> from a list of { name, link }
function buildSimpleList(items) {
  const list = document.createElement("ul");
  items.forEach(function (item) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = item.name;
    a.href = item.link;
    if (item.link === currentPage) a.setAttribute("aria-current", "page");
    li.appendChild(a);
    list.appendChild(li);
  });
  return list;
}

// Header: secondary navigation row
function buildSecondaryTop() {
  const nav = document.querySelector(".secondary-nav-top");
  if (!nav) return;
  nav.appendChild(buildSimpleList(secondaryItems));
}

// Left column: secondary navigation.
// Uses this page's section headings when there are two or more,
// otherwise the same quick links as the header.
function buildSecondaryNav() {
  const nav = document.querySelector(".secondary-nav");
  if (!nav) return;

  const heading = document.createElement("h2");
  heading.className = "col-heading";

  const headings = document.querySelectorAll(".content h2");
  let items;

  if (headings.length >= 2) {
    heading.textContent = "On this page";
    items = [];
    headings.forEach(function (h, i) {
      if (!h.id) h.id = "section-" + (i + 1);
      items.push({ name: h.textContent, link: "#" + h.id });
    });
  } else {
    heading.textContent = "Quick links";
    items = secondaryItems;
  }

  nav.appendChild(heading);
  nav.appendChild(buildSimpleList(items));
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
    '<h2 class="col-heading">Sticky Content</h2>' +

    '<section class="stick-block">' +
      "<h3>News</h3>" +
      '<ul class="news">' + updatesHtml + "</ul>" +
    "</section>" +

    '<section class="stick-block">' +
      "<h3>Next Shows</h3>" +
      showsHtml +
      '<p><a class="inline-link" href="schedule.html">Full schedule</a></p>' +
    "</section>" +

    '<section class="stick-block advert">' +
      "<h3>Book Jackson</h3>" +
      "<p>Available for private events. Send a request through the contact form.</p>" +
      '<a class="btn" href="contact.html">Book now</a>' +
    "</section>" +

    '<section class="stick-block offer">' +
      "<h3>Offer: Lessons</h3>" +
      "<p>Classes and 1 on 1 lessons available.</p>" +
      '<a class="btn" href="classes.html">Learn more</a>' +
    "</section>" +

    '<section class="stick-block">' +
      "<h3>Site Info</h3>" +
      "<p>Based in Iowa. Updated " + new Date().getFullYear() + ".</p>" +
    "</section>" +

    '<section class="stick-block">' +
      "<h3>Social</h3>" +
      '<a class="social" href="' + instagramUrl + '" target="_blank" rel="noopener" aria-label="Instagram">' +
        '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">' +
          '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/>' +
          '<circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/>' +
          '<circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>' +
        "</svg>" +
        "<span>@jacksonwebbie</span>" +
      "</a>" +
    "</section>";
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
    "<p>Webmaster: <a href=\"mailto:" + webmasterEmail + "\">" + webmasterEmail + "</a></p>";
}

// Contact page: basic information form.
// Checks the fields, then opens the visitor's email app with a
// pre-filled message to the webmaster address.
function setupInfoForm() {
  const form = document.getElementById("info-form");
  if (!form) return;

  const status = document.getElementById("info-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const reason = form.reason.value;
    const message = form.message.value.trim();

    // Clear old error highlights
    form.querySelectorAll(".invalid").forEach(function (el) {
      el.classList.remove("invalid");
    });

    const missing = [];
    if (!name) missing.push(form.name);
    if (!email || !form.email.checkValidity()) missing.push(form.email);
    if (!reason) missing.push(form.reason);
    if (!message) missing.push(form.message);

    if (missing.length > 0) {
      missing.forEach(function (el) { el.classList.add("invalid"); });
      missing[0].focus();
      status.className = "form-status error";
      status.textContent = "Please fill in the highlighted fields. Check that your email is valid.";
      return;
    }

    const subject = "Website inquiry: " + reason;
    const body =
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Phone: " + (phone || "Not provided") + "\n" +
      "Reason: " + reason + "\n\n" +
      message;

    window.location.href =
      "mailto:" + webmasterEmail +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    status.className = "form-status success";
    status.textContent = "Your email app should open now. Press send there to deliver your message. " +
      "If nothing opened, email me directly at " + webmasterEmail + ".";
  });
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
  buildSecondaryTop();
  buildPinnedNav();
  buildSideNav();
  buildSecondaryNav();
  buildStickyContent();
  buildFooter();
  setupInfoForm();
  setupCursorGlow();
});
