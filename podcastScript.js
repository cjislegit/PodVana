let id = localStorage['objectToPass'];
localStorage.removeItem('objectToPass');

let podcastURL = 'https://listen-api.listennotes.com/api/v2/podcasts/' + id;

const h = new Headers();

h.append('X-ListenAPI-Key', '776c9171dbbc4181aad650262761ceaa');

const reqPodcasts = new Request(podcastURL, {
  method: 'GET',
  headers: h,
  mode: 'cors'
});
fetch(reqPodcasts)
  .then(data => data.json())
  .then(podcast => generatePodcastHTML(podcast));

const generatePodcastHTML = podcast => {
  let img = podcast['image'];
  const podCastImg = document.createElement('img'); //Creates img
  podCastImg.setAttribute('src', img);
  const podcastArt = document.querySelector('.podcastArt');
  podcastArt.appendChild(podCastImg);
};
