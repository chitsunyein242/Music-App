const current = document.querySelector("#current");
const count = document.querySelector("#count");
const menu = document.querySelector("#menu");
const navList = document.querySelector("#nav-list");
const title = document.querySelector("#title");
const singer = document.querySelector("#singer");
const poster = document.querySelector("#poster");
const prev = document.querySelector("#prev");
const play = document.querySelector("#play");
const next = document.querySelector("#next");
const range = document.querySelector("#range");
const currentDuration = document.querySelector("#currentDuration");
const songDuration = document.querySelector("#songDuration")

let musics = [
  {
    id: 1,
    title: "Birds of A Feather",
    singer: "Billie Ellish",
    img_path: "img/1.jpg",
    music_path: "music/1.mp3",
  },
  {
    id: 2,
    title: "Rewrite The Star",
    singer: "Anne-Marie and James Arthur",
    img_path: "img/2.jpg",
    music_path: "music/2.mp3",
  },
  {
    id: 3,
    title: "To The Bone",
    singer: "Pamungkas and The PeoplePeople",
    img_path: "img/3.jpg",
    music_path: "music/3.mp3",
  },
  {
    id: 4,
    title: "About You",
    singer: "George Daniel and Matty Healy",
    img_path: "img/4.jpg",
    music_path: "music/4.mp3",
  },
  {
    id: 5,
    title: "Yellow",
    singer: "Coldplay",
    img_path: "img/5.jpg",
    music_path: "music/5.mp3",
  },
  {
    id: 6,
    title: "Enchanted",
    singer: "Taylor Swift ",
    img_path: "img/6.jpg",
    music_path: "music/6.mp3",
  },
  {
    id: 7,
    title: "Nothing Gonna Stop Us Now",
    singer: "Starship ",
    img_path: "img/7.jpg",
    music_path: "music/7.mp3",
  },
  {
    id: 8,
    title: "Open Arms",
    singer: "Sza",
    img_path: "img/8.jpg",
    music_path: "music/8.mp3",
  },
  {
    id: 9,
    title: "Back to Friends",
    singer: "Sombr ",
    img_path: "img/9.jpg",
    music_path: "music/9.mp3",
  },
  {
    id: 10,
    title: "13",
    singer: "Lany ",
    img_path: "img/10.jpg",
    music_path: "music/10.mp3",
  },
];

let playing = false;
let index = 0;
const track = document.createElement("audio");

// load Track

function loadTrack(i) {
  let index = Number(i);
  title.innerHTML = musics[index].title;
  singer.innerHTML = musics[index].singer;
  poster.src = musics[index].img_path;
  track.src = musics[index].music_path;
  track.load();
  current.innerHTML = index + 1;
  count.innerHTML = musics.length;
  setInterval(trackCurrentTime, 1000);
}

loadTrack(index);

// check play or pause

function checkMusic() {
  playing === true ? pauseMusic() : playMusic();
}

// Play

function playMusic() {
  track.play();
  playing = true;
  play.className = "fas fa-pause";
}

// Pause

function pauseMusic() {
  track.pause();
  playing = false;
  play.className = "fas fa-play";
}

// prev Song
function prevSong() {
  if (index <= 0) index = musics.length - 1;
  else index--;
  loadTrack(index);
  playing = false;
  checkMusic();
}

// next Song
function nextSong() {
  if (index >= musics.length - 1) index = 0;
  else index++;
  loadTrack(index);
  playing = false;
  checkMusic();
}

//Range Dynamic

function trackCurrentTime() {
  range.value = track.currentTime * (100 / track.duration);

  if (track.ended) {
    nextSong();
  }
}

// Change Range Dynamic

function changeRange() {
  track.currentTime = range.value * (track.duration / 100);
}

//Nav List Toggle
function toggleMenu() {
  navList.classList.toggle("nav-list-active");
  menu.classList.toggle("fa-bars");
  menu.classList.toggle("fa-times");
}

//fetch music in nav list

musics.map((music, index) => {
  let li = document.createElement("li");
  li.innerHTML = `
                    <div>
                        <h3>${music.title}</h3>
                        <p>${music.singer}</p>
                    </div>
                    <i class="trackSingle ${index} fas fa-play" id="playSingle"></i>
                 `;
  navList.appendChild(li);
});

//load Single Song
function loadSingleSong(e) {
  if (
    e.target.classList.contains("trackSingle") &&
    e.target.classList.contains("fa-play")
  ) {
    loadTrack(e.target.classList[1]);

    playing = false;
    checkMusic();
    Array.from(navList.children).forEach((li) => {
      li.lastElementChild.classList.remove("fa-pause");
      li.lastElementChild.classList.add("fa-play");
    });
    e.target.classList.add("fa-pause");
    e.target.classList.remove("fa-play");
  } else if (
    e.target.classList.contains("trackSingle") &&
    e.target.classList.contains("fa-pause")
  ) {
    playing = true;
    checkMusic();
    e.target.classList.add("fa-play");
    e.target.classList.remove("fa-pause");
  } else {
    navList.classList.toggle("nav-list-active");
    menu.classList.toggle("fa-bars");
    menu.classList.toggle("fa-times");
  }
}

// Function for the showing minutes and seconds 
const createMinuteAndSecondText = (totalSecond) =>{
    const minutes = Math.floor(totalSecond/60);
    const seconds = totalSecond%60;

    const minutesText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const secondsText = seconds < 10 ? "0" + seconds.toString() : seconds;
    return minutesText + ":" + secondsText;
};
////

let durationText = "00:00";
let duration = 0;

// Display how long this song 
track.addEventListener("loadeddata",() =>{
    duration = Math.floor(track.duration);    
    durationText =  createMinuteAndSecondText(duration);
});
//


// Display the current duration of playing this song 
track.addEventListener("timeupdate",() =>{
    const currentTime = Math.floor(track.currentTime);    
    const currentTimeText = createMinuteAndSecondText(currentTime);
    currentDuration.textContent =  currentTimeText;
    songDuration.textContent = durationText;
});
//

//Event Listenr
play.addEventListener("click", checkMusic);
prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);
range.addEventListener("change", changeRange);
menu.addEventListener("click", toggleMenu);
navList.addEventListener("click", loadSingleSong);
