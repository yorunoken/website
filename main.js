const themeCookie = document.cookie.split("; ").find((row) => row.startsWith("lightTheme="));
let lightTheme = themeCookie ? themeCookie.split("=")[1] === "true" : false;

const discordStatuses = {
  online: "#43B581",
  idle: "#FAA61A",
  dnd: "#F04747",
  offline: "#747F8D",
};

document.addEventListener("DOMContentLoaded", app);
document.getElementById("theme-switcher").addEventListener("click", (e) => {
  e.preventDefault();
  lightTheme = !lightTheme;
  new Audio("./audio/switch.mp3").play();

  changeTheme(e);
});

function applyHoverEffect(element) {
  element.addEventListener("mouseover", () => {
    element.style.filter = `drop-shadow(0 0 10px ${lightTheme ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 0.8)"})`;
  });

  element.addEventListener("mouseout", () => {
    element.style.filter = "none";
  });
}
applyHoverEffect(document.getElementById("youtube"));
applyHoverEffect(document.getElementById("twitter"));
applyHoverEffect(document.getElementById("github"));
applyHoverEffect(document.getElementById("twitch"));

function changeTheme() {
  document.body.style.backgroundColor = lightTheme ? "#c6c6c6" : "#333";

  document.querySelectorAll("p").forEach((element) => {
    element.style.color = lightTheme ? "rgb(17, 17, 17)" : "#ddd";
  });

  document.querySelector(".intro").style.backgroundColor = lightTheme ? "#9e9e9e" : "rgb(17, 17, 17)";
  document.querySelector(".sticky-header").style.backgroundColor = lightTheme ? "#9e9e9e" : "rgb(0, 0, 0)";

  const twitterTooltip = document.querySelector(".twitter-tooltip");
  twitterTooltip.style.color = lightTheme ? "#0889bd" : "#00a8e8";
  // twitterTooltip.style.backgroundColor = lightTheme ? "#047dad" : "#00a8e8";

  const elements = ["theme-switcher", "youtube", "github", "twitter", "twitch"];
  elements.forEach((element) => {
    const svg = document.getElementById(element);
    svg.src = `./svg/${lightTheme ? "black/" : ""}${element}.svg`;
  });

  document.cookie = `lightTheme=${lightTheme}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
}

async function app() {
  changeTheme();

  const data = await fetch("https://api.lanyard.rest/v1/users/372343076578131968")
    .then((res) => res.json())
    .then((json) => json.data);
  const user = data.discord_user;

  const customStatus = data.activities.filter((activity) => activity.id === "custom")[0];

  customStatus
    ? (document.getElementById("customStatus").innerText = customStatus !== undefined && customStatus.state.length > 20
      ? customStatus.state.slice(0, 20) + ".."
      : customStatus.state)
    : document.getElementById("customStatus").remove();

  const discordCard = document.querySelectorAll(".discord-card")[0];
  const color = discordStatuses[data.discord_status];

  discordCard.style.boxShadow = `0px 0px 10px ${color}`;
  discordCard.addEventListener("mouseover", function() {
    discordCard.style.boxShadow = `0px 0px 15px ${color}`;
  });

  discordCard.addEventListener("mouseout", function() {
    discordCard.style.boxShadow = `0px 0px 10px ${color}`;
  });

  discordCard.style.border = `4px solid ${color}`;
  document.getElementById("discordUser").innerText = `${user.username}`;
}
