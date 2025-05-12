// Get all necessary elements
const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("playPause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const trackName = document.getElementById("track-name");
const albumCover = document.getElementById("album-cover");
const progressBar = document.getElementById("progress-bar");
const playlistContainer = document.getElementById("playlist");

// Song Database
const songs = [
    { name: "Pal Pal", src: "assets/songs/Pal Pal.mp3", cover: "assets/cover-imgs/Pal-Pal-Cover.jpg" },
    { name: "Ha Krde", src: "assets/songs/Ha Krde.mp3", cover: "assets/cover-imgs/Ha-Krde-Cover.jpg" },
    { name: "Moonlight", src: "assets/songs/Moonlight.mp3", cover: "assets/cover-imgs/Moonlight-Cover.jpeg" },
    { name: "Naam Tera", src: "assets/songs/Naam Tera.mp3", cover: "assets/cover-imgs/Naam-Tera-Cover.jpg" },
    { name: "Jat Jatni", src: "assets/songs/Jat Jatni.mp3", cover: "assets/cover-imgs/Jat-Jatni-Cover.jpeg" },
    { name: "Tera Mera Viah", src: "assets/songs/Tera Mera Viah.mp3", cover: "assets/cover-imgs/Tera-mera-Viah.jpg" },
    { name: "Apna Bana Le", src: "assets/songs/Apna Bana Le.mp3", cover: "assets/cover-imgs/Apna-Bana-Le-Cover.jpg" }
];

let currentSongIndex = 0;

// Function to load and update song details
function loadSong(index) {
    trackName.textContent = songs[index].name;
    audioPlayer.src = songs[index].src;
    albumCover.src = songs[index].cover;
    playPauseBtn.innerHTML = "▶ Play"; // Reset button text when song changes
}

// Play/Pause Toggle Function
playPauseBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.innerHTML = "⏸ Pause";  // Changes text to Pause when playing
    } else {
        audioPlayer.pause();
        playPauseBtn.innerHTML = "▶ Play";  // Changes text to Play when paused
    }
});

// Next & Previous Song Controls
nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.innerHTML = "⏸ Pause";  // Ensures play state updates correctly
});

prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.innerHTML = "⏸ Pause";
});

// Update Progress Bar
audioPlayer.addEventListener("timeupdate", () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${progress}%`;
});

// Load Playlist into UI
songs.forEach((song, index) => {
    const songItem = document.createElement("li");
    songItem.textContent = song.name;
    songItem.classList.add("bubbly");
    songItem.addEventListener("click", () => {
        currentSongIndex = index;
        loadSong(index);
        audioPlayer.play();
        playPauseBtn.innerHTML = "⏸ Pause";
    });
    playlistContainer.appendChild(songItem);
});

// Initialize First Song on Load
loadSong(currentSongIndex);