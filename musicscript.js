const songs = [
  { title: "Hoshwalon Ko Khabar Kya", artist: "Jagjit Singh", src: "musicp1.mp3", cover: "musicp1.png" },
  { title: "Ojos Tristes", artist: "Selena Gomez, Bemmy Blanco", src: "musicp2.mp3", cover: "musicp2.png" },
  { title: "Is This Love", artist: "Mohit Chauhan, Shreya Ghoshal, Pritam", src: "musicp3.mp3", cover: "musicp3.png" },
  { title: "Iktara", artist: "Amit Trivedi, Kavita Seth, Amitabh Bhattacharya", src: "musicp4.mp3", cover: "musicp4.png" },
  { title: "Tum Se Hi", artist: "Mohit Chauhan, Pritam", src: "musicp5.mp3", cover: "musicp5.png" },
  { title: "Tauba Tauba", artist: "Karan Aujla", src: "musicp6.mp3", cover: "musicp6.png" },
  { title: "Winning Speech", artist: "Karan Aujla", src: "musicp7.mp3", cover: "musicp7.png" },
  { title: "On Top", artist: "Karan Aujla", src: "musicp8.mp3", cover: "musicp8.png" },
  { title: "Sajni", artist: "Ram Sampath, Arijit Singh", src: "musicp9.mp3", cover: "musicp9.png" },
  { title: "Finding Her", artist: "Kushagra, Bharath, Saaheal", src: "musicp10.mp3", cover: "musicp10.png" },
  { title: "Ve Kamleya", artist: "Pritam, Shreya Ghoshal,Arijit Singh", src: "musicp11.mp3", cover: "musicp11.png" },
  { title: "Perfect", artist: "Ed Sheeran", src: "musicp12.mp3", cover: "musicp12.png" }
];

let currentSong = 0;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const title = document.getElementById("song-title");
const cover = document.getElementById("cover");
const playlist = document.getElementById("playlist");
const artist = document.getElementById("artist-name");
const searchInput = document.getElementById("searchInput");
const duration = document.getElementById("duration");
const shuffleBtn = document.getElementById("shuffle");

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;

  const bgBlur = document.getElementById("background-blur");
  bgBlur.style.backgroundImage = `url('${song.cover}')`;

  const playlistItems = document.querySelectorAll(".playlist-item");
  playlistItems.forEach((item, idx) => {
    item.classList.toggle("active", idx === index);
  });

  audio.load();
}

function playSong() {
  audio.play();
}

function pauseSong() {
  audio.pause();
}

let isShuffle = false;
shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.style.backgroundColor = isShuffle ? "#1db954" : "";
});

function nextSong() {
  if (isShuffle) {
    currentSong = Math.floor(Math.random() * songs.length);
  } else {
    currentSong = (currentSong + 1) % songs.length;
  }
  loadSong(currentSong);
  playSong();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
}

function updatePlaylistUI(filteredSongs = songs) {
  playlist.innerHTML = "";

  filteredSongs.forEach(song => {
    const indexInOriginal = songs.indexOf(song);
    const item = document.createElement("div");
    item.className = "playlist-item";
    item.textContent = `${song.title} — ${song.artist}`;

    if (indexInOriginal === currentSong) {
      item.classList.add("active");
    }

    item.addEventListener("click", () => {
      currentSong = indexInOriginal;
      loadSong(currentSong);
      playSong();
    });

    playlist.appendChild(item);
  });
}

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    duration.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
  }
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", nextSong);

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(query) ||
    song.artist.toLowerCase().includes(query)
  );
  updatePlaylistUI(filteredSongs);
});

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

playBtn.addEventListener("click", playSong);
pauseBtn.addEventListener("click", pauseSong);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

loadSong(currentSong);
updatePlaylistUI();
