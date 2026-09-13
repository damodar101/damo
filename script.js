const enterBtn =
    document.getElementById("enterBtn");

const quickBtn =
    document.getElementById("quickBtn");

const transition =
    document.getElementById("transition");


/* =========================================
ENTER DIGITAL WORLD
========================================= */

if (enterBtn) {

    enterBtn.addEventListener("click", () => {

        transition.classList.add("active");

        setTimeout(() => {

            document.body.classList.add(
                "world-active"
            );

            transition.classList.remove(
                "active"
            );

        }, 800);

    });

}


/* =========================================
QUICK PORTFOLIO
========================================= */

if (quickBtn) {

    quickBtn.addEventListener("click", (event) => {

        event.preventDefault();

        const quickPortfolio =
            document.getElementById("quick-portfolio");

        if (!quickPortfolio) return;

        transition.classList.add("active");

        setTimeout(() => {

            const landing =
                document.querySelector(".landing");

            const world =
                document.getElementById("world");

            const worldUI =
                document.querySelector(".world-ui");

            const joystick =
                document.querySelector(".joystick-container");

            if (landing) {
                landing.style.display = "none";
            }

            if (world) {
                world.style.display = "none";
            }

            if (worldUI) {
                worldUI.style.display = "none";
            }

            if (joystick) {
                joystick.style.display = "none";
            }

            quickPortfolio.style.display = "block";

            transition.classList.remove("active");

            window.scrollTo(0, 0);

        }, 800);

    });

}


/* =========================================
BACK TO 3D WORLD
========================================= */

const backToWorld =
    document.getElementById("back-to-world");

if (backToWorld) {

    backToWorld.addEventListener("click", (event) => {

        event.preventDefault();

        const quickPortfolio =
            document.getElementById("quick-portfolio");

        if (quickPortfolio) {
            quickPortfolio.style.display = "none";
        }

        const landing =
            document.querySelector(".landing");

        const world =
            document.getElementById("world");

        const worldUI =
            document.querySelector(".world-ui");

        const joystick =
            document.querySelector(".joystick-container");

        if (landing) {
            landing.style.display = "flex";
        }

        if (world) {
            world.style.display = "block";
        }

        if (worldUI) {
            worldUI.style.display = "block";
        }

        if (joystick) {
            joystick.style.display = "flex";
        }

        document.body.classList.add("world-active");

        window.scrollTo(0, 0);

    });

}


/* =========================================
PART 8.3 — PROJECT BUTTON LINKS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const projectButtons =
        document.querySelectorAll(".project-view");

    projectButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            const link =
                button.getAttribute("data-link");

            if (!link || link === "#") {

                alert(
                    "This project will be available soon."
                );

                return;
            }

            window.open(link, "_blank");

        });

    });

});


/* =========================================
PART 10 — QUICK PORTFOLIO NAVIGATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const quickBtn =
        document.getElementById("quickBtn");

    const quickPortfolio =
        document.getElementById("quick-portfolio");

    const backToWorld =
        document.getElementById("back-to-world");

    const landing =
        document.querySelector(".landing");

    const world =
        document.getElementById("world");

    const worldUI =
        document.querySelector(".world-ui");

    const joystick =
        document.querySelector(".joystick-container");

    const transition =
        document.getElementById("transition");


    /* OPEN QUICK PORTFOLIO */

    if (quickBtn && quickPortfolio) {

        quickBtn.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            if (landing) {
                landing.style.display = "none";
            }

            if (world) {
                world.style.display = "none";
            }

            if (worldUI) {
                worldUI.style.display = "none";
            }

            if (joystick) {
                joystick.style.display = "none";
            }

            if (transition) {
                transition.style.display = "none";
            }

            quickPortfolio.style.display = "block";

            window.scrollTo(0, 0);

            document.body.classList.remove(
                "world-active"
            );

        });

    }


    /* BACK TO 3D WORLD */

    if (backToWorld) {

        backToWorld.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            if (quickPortfolio) {
                quickPortfolio.style.display = "none";
            }

            if (landing) {
                landing.style.display = "none";
            }

            if (world) {
                world.style.display = "block";
            }

            if (worldUI) {
                worldUI.style.display = "block";
            }

            if (joystick) {
                joystick.style.display = "flex";
            }

            document.body.classList.add(
                "world-active"
            );

            window.scrollTo(0, 0);

        });

    }

});


/* =========================================
PART 11 — PREMIUM PORTFOLIO INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* SECTION REVEAL */

    const sections =
        document.querySelectorAll(".quick-section");

    if (sections.length > 0) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "show"
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );

        sections.forEach((section) => {

            sectionObserver.observe(section);

        });

    }


    /* SKILL BAR ANIMATION */

    const skillCards =
        document.querySelectorAll(
            ".quick-skill-card"
        );

    if (skillCards.length > 0) {

        const skillObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "active"
                            );

                        }

                    });

                },
                {
                    threshold: 0.4
                }
            );

        skillCards.forEach((card) => {

            skillObserver.observe(card);

        });

    }


    /* MAGNETIC BUTTON EFFECT */

    const magneticButtons =
        document.querySelectorAll(
            ".quick-hero-buttons a, .quick-back"
        );

    magneticButtons.forEach((button) => {

        button.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                button.style.transform =
                    `translate(${x * 0.08}px, ${y * 0.08}px)`;

            }
        );

        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform = "";

            }
        );

    });

});


/* =========================================
PART 12 — PROJECT BUTTONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const projectLinks =
        document.querySelectorAll(".project-link");

    projectLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const project =
                link.dataset.project;

            if (!project) {
                return;
            }

            if (project === "hotel") {

                event.preventDefault();

                alert(
                    "Nepal Hotel Finder is currently being developed."
                );

            }

            if (project === "uiux") {

                event.preventDefault();

                alert(
                    "More UI/UX case studies will be available soon."
                );

            }

            if (project === "video") {

                event.preventDefault();

                alert(
                    "More video editing work will be available soon."
                );

            }

        });

    });

});
