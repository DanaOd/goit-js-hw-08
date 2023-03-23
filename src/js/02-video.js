import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

let timePlayed = 0;
const TIME_PLAYED_LOCAL_KEY = 'videoplayer-current-time';

if (localStorage.getItem(TIME_PLAYED_LOCAL_KEY)) {
  player
    .setCurrentTime(JSON.parse(localStorage.getItem(TIME_PLAYED_LOCAL_KEY)))
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}

player.on('timeupdate', throttle((function (event) {
    console.log(event.seconds);
    timePlayed = event.seconds;
    localStorage.setItem(TIME_PLAYED_LOCAL_KEY, JSON.stringify(timePlayed));
  }), 1000));


