let query = localStorage['objectToPass'];
localStorage.removeItem('objectToPass');

let searchURL = `https://listen-api.listennotes.com/api/v2/search?q=${query}&type=podcast`;

const h = new Headers();

h.append('X-ListenAPI-Key', listenKey);

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
    let id = podcast['id'];
    const searchContainer = document.createElement('div');
    searchContainer.setAttribute('class', 'searchContainer');
    searchContainer.innerHTML = `<a id=${id} onclick=saveIdtoLocalStorage(id) href=podcast.html><div class="searchPodcastName">${podcast['title_highlighted']}</div><div class="searchPodcastAuthor">${podcast['publisher_original']}</div></a>`;
    searchMain.appendChild(searchContainer);
  });
};
