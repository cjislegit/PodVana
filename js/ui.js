const createSubPodcast = (data, id) => {
  let podcastURL =
    "https://listen-api.listennotes.com/api/v2/podcasts/" + data["podcastId"];
  const h = new Headers();
  const subscribeMainContainer = document.querySelector(".mainContainer");

  h.append("X-ListenAPI-Key", "776c9171dbbc4181aad650262761ceaa");
  const reqPodcasts = new Request(podcastURL, {
    method: "GET",
    headers: h,
    mode: "cors"
  });

  fetch(reqPodcasts)
    .then(data => data.json())
    .then(podcast => {
      let html = `<div class="podCast">
          <img src="${podcast["image"]}" />
          <p>${podcast["title"]}</p>
        </div>`;
      subscribeMainContainer.innerHTML += html;
    });
};
