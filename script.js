// Importing project data arrays from data.js
import {
  jsProjects,
  reactProjects,
  bigReactProjects,
  fullStackProjects,
} from "./data.js";

// Reset the contact form whenever the page is shown (prevents autofill issues)
window.addEventListener("pageshow", function () {
  document.querySelector(".contactForm")?.reset();
});

// Get navbar elements for hamburger menu toggle (mobile view)
const hamburger = document.querySelector(".hamburger");
const closeBtn = document.querySelector(".close-btn");
const leftSection = document.querySelector(".left-section");

// Open sidebar on hamburger click
hamburger.addEventListener("click", () => {
  leftSection.classList.toggle("active");
});

// Close sidebar on close button click
closeBtn.addEventListener("click", () => {
  leftSection.classList.toggle("active");
});

// Highlight active navigation link based on current URL path
let liItems = document.querySelectorAll(".left-section ul li");

liItems.forEach((item) => {
  let path = window.location.pathname; // current page path
  let anchor = item.querySelector("a").getAttribute("href"); // menu link path

  // Mark active menu item when link matches the current path
  if (anchor === path) {
    item.classList.add("active");
  }

  // Handle root path cases ("/" vs "/index.html")
  if (
    (anchor === "/" && path === "/") ||
    (anchor === "/" && path === "/index.html")
  ) {
    item.classList.add("active");
  }
});

// DOM nodes for small and big projects sections
let smallProjectsGrid = document.querySelector(".small-projects");
let bigProjectsGrid = document.querySelector(".big-projects");

// Buttons used to filter project categories
let projectBtns = document.querySelector(".project-btns");

// Create a small project card and append to the grid
const createCard = (project) => {
  let projectCard = document.createElement("div");
  projectCard.classList.add("project-card");

  // Inner HTML template for small cards
  projectCard.innerHTML = `<div class="project-img"><img
                  src=${project.image}
                  alt=${project.title}
                /></div>
                <div class="card-content">
                  <div class="project-title-description">
                  <h3>${project.title}</h3>
                  <p>${project.description}</p>
                  </div>
                  <div class="tags">
                    ${project.techStack
                      .map((tech) => `<img src=${tech} alt="tech-icon"/>`)
                      .join("")}
                  </div>
                  <div class="project-links">
                    <button>
                      <a
                        href=${project.links.liveDemo}
                        target="_blank"
                        >Live Demo</a
                      >
                    </button>
                    <button>
                      <a
                        href=${project.links.code}
                        target="_blank"
                        >Code</a
                      >
                    </button>
                  </div>
                </div>
              `;

  // Add card to grid
  smallProjectsGrid.appendChild(projectCard);
};

// Create a full detailed large project card
const createProjectCard = (project) => {
  let projectContainer = document.createElement("div");
  projectContainer.classList.add("big-project-container");

  // Inner HTML for big project layout
  projectContainer.innerHTML = `<img src="${project.image}" alt="${
    project.title
  }" class="big-project-image"/>
        <div class="big-project-info">
          <h3 class="big-project-title">${project.title}</h3>
          <p class="big-project-description">${project.description}</p>

          <!-- Features list -->
          <ul class="big-project-features">${project.features
            .map((feature) => `<li>${feature}</li>`)
            .join("")}</ul>

          <!-- Tech stack icons -->
          <div class="tech-stack">
            ${project.techStack
              .map(
                (tech) =>
                  `<img src="${tech}" alt="tech icon" class="tech-icon">`
              )
              .join("")}
          </div>

          <!-- Buttons -->
          <div class="big-project-links">
          <button> <a href="${
            project.links.liveDemo
          }" target="_blank">Live Demo</a></button>
           <button><a href="${
             project.links.code
           }" target="_blank">Code</a></button>
          </div>
        </div>
      `;

  // Add card to page
  bigProjectsGrid.appendChild(projectContainer);
};

// Filter projects based on selected button (JavaScript / React)
projectBtns.addEventListener("click", (e) => {
  let tech = e.target.innerText; // button text (category)
  smallProjectsGrid.innerHTML = ""; // clear previous items
  bigProjectsGrid.innerHTML = "";

  // Determine which projects to show
  let selectedSmallProjects = [];
  let selectedBigProjects = [];

  // If "JavaScript" button clicked
  if (tech.includes("JavaScript")) {
    selectedSmallProjects = jsProjects;
    selectedBigProjects = fullStackProjects;

    // If "React" button clicked
  }
  if (tech.includes("React")) {
    selectedSmallProjects = reactProjects;
    selectedBigProjects = bigReactProjects;
  }
  if (tech.includes("Full Stack")) {
    selectedBigProjects = fullStackProjects;
  }
  // Render the selected projects
  selectedSmallProjects.forEach((project) => createCard(project));
  selectedBigProjects.forEach((project) => createProjectCard(project));
});

// Load ALL projects by default on initial page load
const allProjects = () => {
  jsProjects.forEach((project) => createCard(project));
  reactProjects.forEach((project) => createCard(project));
  bigReactProjects.forEach((project) => createProjectCard(project));
};

// Execute loading of all projects
allProjects();
