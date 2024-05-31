const header = document.getElementById("header");
const intro = document.getElementById("intro");
const mediaButton = document.getElementById("media-controller");
const nowPlaying = document.getElementById("song-title");
const queue = document.getElementById("song-queue");
const music = document.getElementById("music");
const volumeSlider = document.getElementById("volume-slider");
const closeButton = document.getElementById("close-button");

let playingMusic = false;
let song;

async function main() {
    const playlist = await fetch("/playlist").then((res) => res.json());
    const name = playlist[Math.floor(Math.random() * playlist.length)];

    song = new Audio(`./music/${name}`);

    const parts = name.split(".");
    console.log(parts);
    parts.pop();
    const songName = parts.join("");

    song.volume = volumeSlider.value;

    // assign mediaButton the "pause" icon.
    mediaButton.src = "./media/play.png";
    queue.innerText = "In queue";
    nowPlaying.innerText = songName;
}

mediaButton.onclick = () => {
    playingMusic = !playingMusic;
    mediaButton.src = playingMusic ? "./media/pause.png" : "./media/play.png";
    queue.innerText = playingMusic ? "Now playing" : "In queue";

    if (playingMusic) {
        song.play();
    } else {
        song.pause();
    }
};

volumeSlider.oninput = () => {
    song.volume = volumeSlider.value;
};

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    handleBackgroundParallax(scrollY);
    handleScroll(scrollY);
});

function handleBackgroundParallax(scrollY) {
    let scrollPercentage = (scrollY / 800) * 100;

    if (scrollPercentage < 0) {
        scrollPercentage = 0;
    } else if (scrollPercentage > 100) {
        scrollPercentage = 100;
    }

    intro.style.backgroundPositionY = `${scrollPercentage}%`;
}

function handleScroll(scrollY) {
    if (scrollY > 150) {
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

closeButton.addEventListener("click", function () {
    document.getElementById("music-player").style.display = "none";
});

main();
