const enterBtn =
    document.getElementById("enterBtn");

const quickBtn =
    document.getElementById("quickBtn");

const transition =
    document.getElementById("transition");


/* =========================================
ENTER DIGITAL WORLD
========================================= */

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


/* =========================================
QUICK PORTFOLIO
========================================= */

quickBtn.addEventListener("click", () => {

    transition.classList.add("active");


    setTimeout(() => {

        console.log(
            "Quick Portfolio will be added later."
        );

        transition.classList.remove(
            "active"
        );

    }, 800);

});
