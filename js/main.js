(() => {
  "use strict";

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
    });
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });
  }

  // Reveal elements as they enter the viewport
  const revealTargets = document.querySelectorAll(
    ".section-head, .prose, .highlights > li, .skill-group, .project, .timeline-item, .edu, .contact-grid > li"
  );
  revealTargets.forEach(element => element.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(element => revealObserver.observe(element));
  } else {
    revealTargets.forEach(element => element.classList.add("is-visible"));
  }

  // Active navigation section
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            const active = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("active", active);
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        }
      });
    }, { rootMargin: "-25% 0px -65% 0px" });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // Enable the CV download only when the PDF is present on the deployed site.
  const cvLink = document.getElementById("cv-download");
  if (cvLink) {
    fetch(cvLink.getAttribute("href"), { method: "HEAD" })
      .then(response => {
        if (response.ok) cvLink.hidden = false;
      })
      .catch(() => { cvLink.hidden = true; });
  }

  // Terminal typing effect: reveal the existing terminal text progressively.
  const terminal = document.querySelector("[data-typewriter]");
  if (terminal && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const original = terminal.innerHTML;
    terminal.style.visibility = "hidden";
    window.addEventListener("load", () => {
      terminal.style.visibility = "visible";
      terminal.innerHTML = "";
      const temp = document.createElement("div");
      temp.innerHTML = original;
      const nodes = [...temp.childNodes];
      let index = 0;
      const appendNext = () => {
        if (index >= nodes.length) return;
        terminal.appendChild(nodes[index].cloneNode(true));
        index += 1;
        window.setTimeout(appendNext, 75);
      };
      appendNext();
    }, { once: true });
  }
})();
