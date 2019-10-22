const newApiUrl =
  'https://listen-api.listennotes.com/api/v2/best_podcasts?region=us&safe_mode=1&page=1';

const h = new Headers();

h.append('X-ListenAPI-Key', '776c9171dbbc4181aad650262761ceaa');

const req = new Request(newApiUrl, { method: 'GET', headers: h, mode: 'cors' });

fetch(req)
  .then(data => data.json())
  .then(podcast => generateMainContentHTML(podcast));

const generateMainContentHTML = podcast => {
  podcast['podcasts'].forEach(element => {
    const mainContentPodcast = document.createElement('div'); //Creates div
    mainContentPodcast.setAttribute('class', 'podCast'); //Gives div class of podCast
    mainContentPodcast.innerHTML = `<a href='podcast.html'><img id='${
      element['id']
    }' src="${
      //Creates the inside of the div
      element['image']
    }" /></a>
          <p>${element['title'].slice(0, 20)}</p>`;

    const mainContainerDiv = document.querySelector('.mainContainerPodcasts');

    mainContainerDiv.appendChild(mainContentPodcast);
  });
};
