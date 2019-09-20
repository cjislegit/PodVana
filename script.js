const apiData = {
  url: 'https://itunes.apple.com/search?',
  term: 'term=joe+rogan',
  media: '&media=podcast',
  limit: '&limit=1'
};

const { url, term, media, limit } = apiData;

const apiURL = `${url}${term}${media}${limit}`;

fetch(apiURL)
  .then(data => data.json())
  .then(podcast => generateMainContentHTML(podcast));

const generateMainContentHTML = podcast => {
  console.log(podcast['results'][0]['artistName']);
  console.log(podcast['results'][0]['artworkUrl100']);

  const mainContentPodcast = `<div class="podCast">
          <img src="${podcast['results'][0]['artworkUrl100']}" />
          <p>${podcast['results'][0]['artistName']}</p>
        </div>`;

  const mainContainerDiv = document.querySelector('.mainContainer');

  mainContainerDiv.innerHTML = mainContentPodcast;
};
