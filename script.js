const cursor = document.querySelector(".cursor");

const palette = document.getElementById("palette");

const search = document.getElementById("search");

const projects = document.querySelectorAll(".project");

const interactiveElements = document.querySelectorAll(
  "a, .project, .lab, .cmd"
);


/* --------------------------------
   CUSTOM CURSOR
-------------------------------- */

window.addEventListener("mousemove", (event) => {

  cursor.style.left = `${event.clientX}px`;

  cursor.style.top = `${event.clientY}px`;


  /* Project radial light */

  projects.forEach((project) => {

    const rect = project.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width) * 100;

    const y =
      ((event.clientY - rect.top) / rect.height) * 100;

    project.style.setProperty("--x", `${x}%`);

    project.style.setProperty("--y", `${y}%`);

  });

});


/* --------------------------------
   CURSOR HOVER EFFECT
-------------------------------- */

interactiveElements.forEach((element) => {

  element.addEventListener("mouseenter", () => {

    cursor.style.width = "45px";

    cursor.style.height = "45px";

  });


  element.addEventListener("mouseleave", () => {

    cursor.style.width = "22px";

    cursor.style.height = "22px";

  });

});


/* --------------------------------
   COMMAND PALETTE
-------------------------------- */

window.addEventListener("keydown", (event) => {

  /*
    CMD + K on Mac
    CTRL + K on Windows/Linux
  */

  if (
    (event.metaKey || event.ctrlKey) &&
    event.key.toLowerCase() === "k"
  ) {

    event.preventDefault();

    palette.classList.add("open");

    search.focus();

  }


  /* Escape closes palette */

  if (event.key === "Escape") {

    palette.classList.remove("open");

  }

});


/* --------------------------------
   CLOSE PALETTE WHEN CLICKING
   OUTSIDE THE COMMAND BOX
-------------------------------- */

palette.addEventListener("click", (event) => {

  if (event.target === palette) {

    palette.classList.remove("open");

  }

});


/* --------------------------------
   COMMAND NAVIGATION
-------------------------------- */

document.querySelectorAll(".cmd").forEach((command) => {

  command.addEventListener("click", () => {

    const targetID = command.dataset.go;

    const target = document.getElementById(targetID);

    palette.classList.remove("open");

    if (target) {

      target.scrollIntoView({
        behavior: "smooth"
      });

    }

  });

});


/* --------------------------------
   COMMAND SEARCH
-------------------------------- */

search.addEventListener("input", () => {

  const query = search.value.toLowerCase();

  document.querySelectorAll(".cmd").forEach((command) => {

    const text = command.textContent.toLowerCase();

    if (text.includes(query)) {

      command.style.display = "flex";

    } else {

      command.style.display = "none";

    }

  });

});


/* --------------------------------
   RESET COMMAND SEARCH
-------------------------------- */

palette.addEventListener("transitionend", () => {

  if (!palette.classList.contains("open")) {

    search.value = "";

    document.querySelectorAll(".cmd").forEach((command) => {

      command.style.display = "flex";

    });

  }

});