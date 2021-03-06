let id = localStorage['objectToPass'];
localStorage.removeItem('objectToPass');

let podcastURL = 'https://listen-api.listennotes.com/api/v2/podcasts/' + id;

const h = new Headers();

h.append('X-ListenAPI-Key', listenKey);

const reqPodcasts = new Request(podcastURL, {
  method: 'GET',
  headers: h,
  mode: 'cors'
});
fetch(reqPodcasts)
  .then(data => data.json())
  .then(podcast => generatePodcastImgHTML(podcast));

const generatePodcastImgHTML = podcast => {
  let img = podcast['image'];
  let episodes = podcast['episodes'];
  const podCastImg = document.createElement('img'); //Creates img
  const podcastButtonsContainer = document.createElement('div');
  const podcastArt = document.querySelector('.podcastArt'); //Gets the podcast img container

  podCastImg.setAttribute('src', img); //Sets src to img url
  podcastButtonsContainer.setAttribute('class', 'podcastButtonsContainer');
  podcastButtonsContainer.innerHTML = `<span onclick="addNewSub('${podcast['id']}')">Subscribe</span> &nbsp <i class="fa fa-check-square notSubbed" aria-hidden="true"></i>`;
  podcastArt.appendChild(podCastImg); //Adds img to the container
  podcastArt.appendChild(podcastButtonsContainer); //Adds buttons
  checkIfSub(podcast['id']);

  generatePodcastTracksHTML(episodes);
};

const generatePodcastTracksHTML = podcast => {
  podcast.forEach(track => {
    const podcastTracks = document.createElement('div');
    const podcastTracksContainer = document.createElement('div');
    const podcastTrackName = document.createElement('div');
    const podcastTrackLength = document.createElement('div');
    const podcastTrackDate = document.createElement('div');
    const podcastTrackStatus = document.createElement('div');
    const podcastTrackStatusIcon = document.createElement('i');

    podcastTracks.setAttribute('class', 'podcastTracks');
    podcastTracks.setAttribute(
      'onclick',
      `playTrack('${track['audio']}', '${track['image']}', '${track['title']}' )`
    );

    podcastTracksContainer.setAttribute('class', 'podcastTracksContainer');
    podcastTrackName.setAttribute('class', 'podcastTrackName');
    podcastTrackName.innerHTML = `<strong>${track['title']}</strong>`;

    podcastTrackLength.setAttribute('class', 'podcastTrackLength');
    podcastTrackLength.innerHTML = `${formatLength(track['audio_length_sec'])}`;

    podcastTrackDate.setAttribute('class', 'podcastTrackDate');
    podcastTrackDate.innerHTML = `${new Date(
      track['pub_date_ms']
    ).toLocaleDateString('en-US')}`;

    // podcastTrackStatus.setAttribute('class', 'podcastTrackStatus');
    // podcastTrackStatus.innerHTML = `<i class="fa fa-arrow-circle-down" aria-hidden="true"></i>`;

    let podcastContainer = document.querySelector('.podcastContainer');

    podcastTracksContainer.appendChild(podcastTrackName);
    podcastTracksContainer.appendChild(podcastTrackLength);
    podcastTracksContainer.appendChild(podcastTrackDate);
    podcastTracksContainer.appendChild(podcastTrackStatus);
    podcastTrackStatus.appendChild(podcastTrackStatusIcon);
    podcastTracks.appendChild(podcastTracksContainer);
    podcastContainer.appendChild(podcastTracks);
  });
};

const formatLength = d => {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + ':' : '';
  var mDisplay = m > 0 ? m + ':' : '';
  var sDisplay = s > 0 ? s : '';
  return hDisplay + mDisplay + sDisplay;
};

//Updates sound file in audio tag and plays the file
const playTrack = (soundFile, imgFile, trackName) => {
  const player = document.querySelector('#player');
  const icon = document.querySelector('.fa-play');
  const status = document.querySelector('.nowPlayingStatus');
  let name = document.querySelector('.nowPlayingName');
  let img = document.querySelector('.nowPlayingArt img');

  player.setAttribute('src', soundFile);
  player.play();

  if (icon !== null) {
    //Checks status of icon and skips if already set to pause
    icon.setAttribute('class', 'fas fa-pause');
  }

  status.innerHTML = 'Playing';
  name.innerHTML = trackName;
  img.setAttribute('src', imgFile);
};

//Changes styling on subscribe button
const sub = () => {
  let subStatus = document.querySelector('.notSubbed');
  if (subStatus !== null) {
    subStatus.setAttribute('class', 'fa fa-check-square subbed');
  } else {
    subStatus = document.querySelector('.subbed');
    subStatus.setAttribute('class', 'fa fa-check-square notSubbed');
  }
};
