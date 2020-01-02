const ApiUrl =
  "https://listen-api.listennotes.com/api/v2/best_podcasts?region=us&safe_mode=1&page=1";

const h = new Headers();

h.append("X-ListenAPI-Key", process.env.listenKey);

const reqbestPodcasts = new Request(ApiUrl, {
  method: "GET",
  headers: h,
  mode: "cors"
});

fetch(reqbestPodcasts)
  .then(data => data.json())
  .then(podcast => generateMainContentHTML(podcast));

const generateMainContentHTML = podcast => {
  const mainContainerDiv = document.querySelector(".mainContainerPodcasts");
  const offlineMessage = document.querySelector(".offline");
  offlineMessage.remove();
  podcast["podcasts"].forEach(element => {
    const mainContentPodcast = document.createElement("div"); //Creates div
    mainContentPodcast.setAttribute("class", "podCast"); //Gives div class of podCast
    let id = element["id"];
    mainContentPodcast.setAttribute("id", id); //Gives div id of podcast id from API
    mainContentPodcast.setAttribute("onclick", "saveIdtoLocalStorage(id)");
    mainContentPodcast.innerHTML = `<a  onclick="playingTrack()" href='/pages/podcast.html' ><img src="${
      //Creates the inside of the div
      element["image"]
    }" /></a>
          <p>${element["title"].slice(0, 20)}</p>`;

    mainContainerDiv.appendChild(mainContentPodcast);
  });
};
