let query = localStorage['objectToPass'];
localStorage.removeItem('objectToPass');

let searchURL = `https://listen-api.listennotes.com/api/v2/search?q=${query}&only_in=author&type=podcast`;

const h = new Headers();

h.append('X-ListenAPI-Key', '776c9171dbbc4181aad650262761ceaa');

const reqPodcasts = new Request(searchURL, {
  method: 'GET',
  headers: h,
  mode: 'cors'
});
fetch(reqPodcasts)
  .then(data => data.json())
  .then(podcast => generateSearchContainerHTML(podcast));

const generateSearchContainerHTML = podcasts => {
  let searchMain = document.querySelector('.searchMain');
  podcasts['results'].forEach(podcast => {
    const searchContainer = document.createElement('div');
    searchContainer.setAttribute('class', 'searchContainer');
    searchContainer.innerHTML = `<div class="searchPodcastName">${
      podcast['title_highlighted']
    }</div><div class="searchPodcastAuthor">${
      podcast['publisher_original']
    }</div>`;
    searchMain.appendChild(searchContainer);
  });
};
