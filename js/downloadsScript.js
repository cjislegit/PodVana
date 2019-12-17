const saveIdtoLocalStorage = id => {
  localStorage.setItem("objectToPass", id);
};

const seachQuery = i => {
  let input = document.querySelector(".searchQuery").value;
  input = input.replace(" ", "%20");
  saveIdtoLocalStorage(input);
  location.replace("search.html");
  playingTrack();
};

//Adds event listner to search bar and listens for enter key
const searchPress = document.querySelector(".searchQuery");

searchPress.addEventListener("keydown", key => {
  key.keyCode == 13 ? seachQuery() : null;
});

//Check if audio is playing or paused and changes it
const playAndPause = () => {
  const player = document.querySelector("#player");

  if (player.paused) {
    const icon = document.querySelector(".fa-play");
    const status = document.querySelector(".nowPlayingStatus");

    player.play();
    icon.setAttribute("class", "fas fa-pause");
    status.innerHTML = "Playing";
  } else {
    const icon = document.querySelector(".fa-pause");
    const status = document.querySelector(".nowPlayingStatus");

    player.pause();
    icon.setAttribute("class", "fas fa-play");
    status.innerHTML = "Paused";
  }
};

//Sets curretTime to the info passed from pocast page
let currentTime = JSON.parse(localStorage.getItem("currentTime"));
localStorage.removeItem("currentTime");

//Checks if currentTime has info if so it updates the nowPlaying section
if (currentTime) {
  const nowPlayingArt = document.querySelector(".nowPlayingArt img");
  const nowPlayingName = document.querySelector(".nowPlayingName");
  const player = document.querySelector("#player");
  const icon = document.querySelector(".fa-play");
  const status = document.querySelector(".nowPlayingStatus");

  nowPlayingArt.setAttribute("src", currentTime["art"]);
  nowPlayingName.innerHTML = currentTime["title"];
  player.setAttribute("src", currentTime["src"]);
  player.currentTime = currentTime["currentTime"];
  player.play();
  icon.setAttribute("class", "fas fa-pause");
  status.innerHTML = "Playing";
}

// Checks if a track was played if so it stores the seconds and saves it to local storage
const playingTrack = () => {
  const player = document.querySelector("#player");
  const title = document.querySelector(".nowPlayingName").textContent;
  const art = document.querySelector(".nowPlayingArt img").src;

  if (player.currentTime) {
    let playingTrackInfo = {
      src: player.src,
      title: title,
      art: art,
      currentTime: player.currentTime
    };
    localStorage.setItem("currentTime", JSON.stringify(playingTrackInfo));
  }
};
