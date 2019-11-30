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
  .then(podcast => generatePodcastImgHTML(podcast));

const generatePodcastImgHTML = podcast => {
  let img = podcast['image'];
  let episodes = podcast['episodes'];
  const podCastImg = document.createElement('img'); //Creates img
  podCastImg.setAttribute('src', img); //Sets src to img url
  const podcastArt = document.querySelector('.podcastArt'); //Gets the podcast img container
  podcastArt.appendChild(podCastImg); //Adds img to the container

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

    podcastTrackStatus.setAttribute('class', 'podcastTrackStatus');
    podcastTrackStatus.innerHTML = `<i class="fas fa-align-left fa-rotate-270"></i>`;

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

//Check if audio is playing or paused and changes it
const playAndPause = () => {
  const player = document.querySelector('#player');

  if (player.paused) {
    const icon = document.querySelector('.fa-play');
    const status = document.querySelector('.nowPlayingStatus');

    player.play();
    icon.setAttribute('class', 'fas fa-pause');
    status.innerHTML = 'Playing';
  } else {
    const icon = document.querySelector('.fa-pause');
    const status = document.querySelector('.nowPlayingStatus');

    player.pause();
    icon.setAttribute('class', 'fas fa-play');
    status.innerHTML = 'Paused';
  }
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
    icon.setAttribute('class', 'fas fa-pause');
  }

  status.innerHTML = 'Playing';
  name.innerHTML = trackName;
  img.setAttribute('src', imgFile);
};
