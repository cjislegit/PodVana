const apiData = {
  url: 'https://itunes.apple.com/search?',
  term: 'term=joe+rogan',
  media: '&media=podcast'
};

const { url, term, media } = apiData;

const apiURL = `${url}${term}${media}`;

fetch(apiURL)
  .then(data => data.json())
  .then(podcast => console.log(podcast));
