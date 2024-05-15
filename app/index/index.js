const header = document.getElementById("header");
const intro = document.getElementById("intro");

window.onload = async function () {};

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    handleBackgroundParallax(scrollY);
    handleHeaderEnlarge(scrollY);
});

function handleBackgroundParallax(scrollY) {
    let scrollPercentage = (scrollY / 500) * 100;

    if (scrollPercentage < 0) {
        scrollPercentage = 0;
    } else if (scrollPercentage > 100) {
        scrollPercentage = 100;
    }

    intro.style.backgroundPositionY = `${scrollPercentage}%`;
}

function handleHeaderEnlarge(scrollY) {
    if (scrollY > 40) {
        header.style.width = "100%";
        header.style.borderRadius = "0";
        header.style.backgroundColor = "rgba(39, 39, 39, 1)";
        header.style.marginTop = "0";
    } else {
        header.style.width = "20%";
        header.style.backgroundColor = "rgba(39, 39, 39, 0.8)";
        header.style.borderRadius = "15px";
        header.style.marginTop = "10px";
    }
}
