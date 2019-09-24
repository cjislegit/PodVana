const apiData = {
  url: 'https://itunes.apple.com/search?',
  term: 'term=joe+rogan',
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
    mainContentPodcast.innerHTML = `<img src="${
      //Creates the inside of the div
      element['artworkUrl100']
    }" />
          <p>${element['artistName'].slice(0, 20)}</p>`;

    const mainContainerDiv = document.querySelector('.mainContainer');

    mainContainerDiv.appendChild(mainContentPodcast);
  });

  // const mainContentPodcast = document.createElement('div'); //Creates div
  // mainContentPodcast.setAttribute('class', 'podCast'); //Gives div class of podCast
  // mainContentPodcast.innerHTML = `<img src="${
  //   //Creates the inside of the div
  //   podcast['results'][0]['artworkUrl100']
  // }" />
  //         <p>${podcast['results'][0]['artistName']}</p>`;

  // const mainContainerDiv = document.querySelector('.mainContainer');

  // mainContainerDiv.appendChild(mainContentPodcast);
};
