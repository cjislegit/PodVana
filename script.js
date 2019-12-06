const ApiUrl =
  "https://listen-api.listennotes.com/api/v2/best_podcasts?region=us&safe_mode=1&page=1";

const h = new Headers();

h.append("X-ListenAPI-Key", "776c9171dbbc4181aad650262761ceaa");

const reqbestPodcasts = new Request(ApiUrl, {
  method: "GET",
  headers: h,
  mode: "cors"
});

fetch(reqbestPodcasts)
  .then(data => data.json())
  .then(podcast => generateMainContentHTML(podcast));

const generateMainContentHTML = podcast => {
  podcast["podcasts"].forEach(element => {
    const mainContentPodcast = document.createElement("div"); //Creates div
    mainContentPodcast.setAttribute("class", "podCast"); //Gives div class of podCast
    let id = element["id"];
    mainContentPodcast.setAttribute("id", id); //Gives div id of podcast id from API
    mainContentPodcast.setAttribute("onclick", "saveIdtoLocalStorage(id)");
    mainContentPodcast.innerHTML = `<a  href='podcast.html' ><img src="${
      //Creates the inside of the div
      element["image"]
    }" /></a>
          <p>${element["title"].slice(0, 20)}</p>`;

    const mainContainerDiv = document.querySelector(".mainContainerPodcasts");

    mainContainerDiv.appendChild(mainContentPodcast);
  });
};

const saveIdtoLocalStorage = id => {
  localStorage.setItem("objectToPass", id);
};

const seachQuery = i => {
  let input = document.querySelector(".searchQuery").value;
  input = input.replace(" ", "%20");
  saveIdtoLocalStorage(input);
  location.replace("search.html");
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
  let nowPlayingArt = document.querySelector(".nowPlayingArt img");
  let nowPlayingName = document.querySelector(".nowPlayingName");
  let player = document.querySelector("#player");

  nowPlayingArt.setAttribute("src", currentTime["art"]);
  nowPlayingName.innerHTML = currentTime["title"];
  player.setAttribute("src", currentTime["src"]);
}
