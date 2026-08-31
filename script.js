/* =========================================================
   KISANDU — EXPERIMENTAL INTERACTIONS
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const cursor = document.querySelector(".cursor");

const palette = document.getElementById("palette");

const search = document.getElementById("search");

const projects = document.querySelectorAll(".project");

const interactiveElements = document.querySelectorAll(
  "a, .project, .lab, .cmd, .enter"
);


/* =========================================================
   MOBILE CHECK
   ========================================================= */

const isMobile =
  window.matchMedia("(max-width: 700px)").matches;


/* =========================================================
   MOUSE STATE
   ========================================================= */

let mouseX = window.innerWidth / 2;

let mouseY = window.innerHeight / 2;

let targetX = mouseX;

let targetY = mouseY;


/* =========================================================
   CURSOR TRAIL
   ========================================================= */

const trail = [];

const TRAIL_LENGTH = 10;

if (!isMobile) {

  for (let i = 0; i < TRAIL_LENGTH; i++) {

    const dot = document.createElement("div");

    dot.className = "cursor-dot";

    dot.style.opacity =
      String(0.55 - i * 0.045);

    document.body.appendChild(dot);

    trail.push({
      element: dot,
      x: mouseX,
      y: mouseY
    });

  }

}


/* =========================================================
   MOUSE MOVEMENT
   ========================================================= */

if (!isMobile) {

  window.addEventListener(
    "mousemove",
    (event) => {

      targetX = event.clientX;

      targetY = event.clientY;

      document.documentElement.style.setProperty(
        "--mouse-x",
        `${event.clientX}px`
      );

      document.documentElement.style.setProperty(
        "--mouse-y",
        `${event.clientY}px`
      );


      /* Project spotlight */

      projects.forEach((project) => {

        const rect =
          project.getBoundingClientRect();

        const x =
          ((event.clientX - rect.left) /
            rect.width) *
          100;

        const y =
          ((event.clientY - rect.top) /
            rect.height) *
          100;

        project.style.setProperty(
          "--x",
          `${x}%`
        );

        project.style.setProperty(
          "--y",
          `${y}%`
        );

      });

    }
  );

}


/* =========================================================
   SMOOTH CURSOR + TRAIL
   ========================================================= */

function animateCursor() {

  if (!isMobile && cursor) {

    mouseX +=
      (targetX - mouseX) * 0.18;

    mouseY +=
      (targetY - mouseY) * 0.18;


    cursor.style.left =
      `${mouseX}px`;

    cursor.style.top =
      `${mouseY}px`;


    let previousX = mouseX;

    let previousY = mouseY;


    trail.forEach((dot) => {

      dot.x +=
        (previousX - dot.x) * 0.25;

      dot.y +=
        (previousY - dot.y) * 0.25;


      dot.element.style.left =
        `${dot.x}px`;

      dot.element.style.top =
        `${dot.y}px`;


      previousX = dot.x;

      previousY = dot.y;

    });

  }


  requestAnimationFrame(
    animateCursor
  );

}

animateCursor();


/* =========================================================
   CURSOR HOVER
   ========================================================= */

if (!isMobile && cursor) {

  interactiveElements.forEach(
    (element) => {

      element.addEventListener(
        "mouseenter",
        () => {

          cursor.style.width = "48px";

          cursor.style.height = "48px";

        }
      );


      element.addEventListener(
        "mouseleave",
        () => {

          cursor.style.width = "22px";

          cursor.style.height = "22px";

        }
      );

    }
  );

}


/* =========================================================
   MAGNETIC EFFECT
   ========================================================= */

if (!isMobile) {

  const magneticElements =
    document.querySelectorAll(
      ".enter, .navlinks a, .project-link"
    );


  magneticElements.forEach(
    (element) => {

      element.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            element.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left -
            rect.width / 2;

          const y =
            event.clientY -
            rect.top -
            rect.height / 2;


          element.style.transform =
            `translate(${x * 0.15}px, ${y * 0.15}px)`;

        }
      );


      element.addEventListener(
        "mouseleave",
        () => {

          element.style.transform = "";

        }
      );

    }
  );

}


/* =========================================================
   TEXT SCRAMBLE
   ========================================================= */

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


function scrambleText(
  element,
  duration = 500
) {

  if (
    !element ||
    isMobile
  ) return;


  const original =
    element.dataset.original ||
    element.textContent.trim();


  element.dataset.original =
    original;


  let startTime = null;


  function animate(time) {

    if (!startTime) {
      startTime = time;
    }


    const progress =
      Math.min(
        (time - startTime) / duration,
        1
      );


    const reveal =
      Math.floor(
        progress * original.length
      );


    let output = "";


    for (
      let i = 0;
      i < original.length;
      i++
    ) {

      const char =
        original[i];


      if (
        char === " " ||
        i < reveal
      ) {

        output += char;

      } else {

        output +=
          characters[
            Math.floor(
              Math.random() *
              characters.length
            )
          ];

      }

    }


    element.textContent =
      output;


    if (progress < 1) {

      requestAnimationFrame(
        animate
      );

    } else {

      element.textContent =
        original;

    }

  }


  requestAnimationFrame(
    animate
  );

}


/* Scramble nav */

document
  .querySelectorAll(
    ".navlinks a"
  )
  .forEach(
    (link) => {

      link.addEventListener(
        "mouseenter",
        () => {

          scrambleText(
            link,
            350
          );

        }
      );

    }
  );


/* Scramble project tags */

document
  .querySelectorAll(".tag")
  .forEach(
    (tag) => {

      tag.addEventListener(
        "mouseenter",
        () => {

          scrambleText(
            tag,
            300
          );

        }
      );

    }
  );


/* =========================================================
   HERO PARALLAX
   ========================================================= */

if (!isMobile) {

  const firstName =
    document.querySelector(
      ".first-name"
    );

  const lastName =
    document.querySelector(
      ".last-name"
    );


  window.addEventListener(
    "mousemove",
    (event) => {

      const x =
        (event.clientX /
          window.innerWidth -
          0.5);

      const y =
        (event.clientY /
          window.innerHeight -
          0.5);


      if (firstName) {

        firstName.style.transform =
          `translate(${x * 8}px, ${y * 4}px)`;

      }


      if (lastName) {

        lastName.style.transform =
          `translate(${x * -5}px, ${y * -3}px)`;

      }

    }
  );

}


/* =========================================================
   SCROLL VELOCITY
   ========================================================= */

let lastScroll =
  window.scrollY;

let scrollTimeout;


window.addEventListener(
  "scroll",
  () => {

    const currentScroll =
      window.scrollY;

    const velocity =
      currentScroll -
      lastScroll;


    const skew =
      Math.max(
        -3,
        Math.min(
          3,
          velocity * 0.12
        )
      );


    document.body.style.setProperty(
      "--scroll-skew",
      skew
    );


    document.body.classList.add(
      "is-scrolling"
    );


    clearTimeout(
      scrollTimeout
    );


    scrollTimeout =
      setTimeout(
        () => {

          document.body.classList.remove(
            "is-scrolling"
          );

        },
        120
      );


    lastScroll =
      currentScroll;

  },
  { passive: true }
);


/* =========================================================
   RANDOM DIGITAL FLICKER
   ========================================================= */

const flickerTargets = [
  ".kicker",
  ".section-head",
  ".about-meta",
  ".project-top",
  ".project-bottom"
];


function randomFlicker() {

  if (isMobile) return;


  const selector =
    flickerTargets[
      Math.floor(
        Math.random() *
        flickerTargets.length
      )
    ];


  const elements =
    document.querySelectorAll(
      selector
    );


  if (!elements.length) return;


  const element =
    elements[
      Math.floor(
        Math.random() *
        elements.length
      )
    ];


  element.classList.add(
    "digital-flicker"
  );


  setTimeout(
    () => {

      element.classList.remove(
        "digital-flicker"
      );

    },
    200
  );

}


/* Occasional, not annoying */

setInterval(
  randomFlicker,
  3500
);


/* =========================================================
   COMMAND PALETTE
   ========================================================= */

if (palette && search) {


  /* CMD + K / CTRL + K */

  window.addEventListener(
    "keydown",
    (event) => {

      if (
        (event.metaKey ||
          event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {

        event.preventDefault();

        palette.classList.add(
          "open"
        );

        search.focus();

      }


      /* Escape */

      if (
        event.key === "Escape"
      ) {

        palette.classList.remove(
          "open"
        );

      }

    }
  );


  /* Click outside */

  palette.addEventListener(
    "click",
    (event) => {

      if (
        event.target === palette
      ) {

        palette.classList.remove(
          "open"
        );

      }

    }
  );


  /* Commands */

  document
    .querySelectorAll(".cmd")
    .forEach(
      (command) => {

        command.addEventListener(
          "click",
          () => {

            const targetID =
              command.dataset.go;

            const target =
              document.getElementById(
                targetID
              );


            palette.classList.remove(
              "open"
            );


            if (target) {

              target.scrollIntoView({
                behavior: "smooth"
              });

            }

          }
        );

      }
    );


  /* Search */

  search.addEventListener(
    "input",
    () => {

      const query =
        search.value.toLowerCase();


      document
        .querySelectorAll(".cmd")
        .forEach(
          (command) => {

            const text =
              command.textContent.toLowerCase();


            command.style.display =
              text.includes(query)
                ? "flex"
                : "none";

          }
        );

    }
  );


  /* Reset */

  palette.addEventListener(
    "transitionend",
    () => {

      if (
        !palette.classList.contains(
          "open"
        )
      ) {

        search.value = "";


        document
          .querySelectorAll(".cmd")
          .forEach(
            (command) => {

              command.style.display =
                "flex";

            }
          );

      }

    }
  );

}
