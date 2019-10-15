const apiData = {
  url: 'https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?',
  term: 'term=c',
  media: '&media=podcast',
  limit: '&limit=15'
};

const { url, term, media, limit } = apiData;

const apiURL = `${url}${term}${media}${limit}`;

fetch(apiURL)
  .then(data => data.json())
  .then(podcast => generateMainContentHTML(podcast));

const generateMainContentHTML = podcast => {
  podcast['results'].forEach(element => {
    const mainContentPodcast = document.createElement('div'); //Creates div
    mainContentPodcast.setAttribute('class', 'podCast'); //Gives div class of podCast
    mainContentPodcast.innerHTML = `<a href='podcast.html'><img src="${
      //Creates the inside of the div
      element['artworkUrl100']
    }" /></a>
          <p>${element['artistName'].slice(0, 20)}</p>`;

    const mainContainerDiv = document.querySelector('.mainContainerPodcasts');

    mainContainerDiv.appendChild(mainContentPodcast);
  });
};
