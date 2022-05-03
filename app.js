

class Music {
    constructor(id, image, songName, singer, musicFile) {
        this.id = id;
        this.image = image;
        this.songName = songName;
        this.singer = singer;
        this.musicFile = musicFile;
    }
}

var musics = [
    new Music(1, 'lalatran.jpg', 'Anh Yêu Vội Thế - Remix', 'Lala Trần', 'AnhYeuVoiThe.mp3'),
    new Music(2, 'thientu.jpg', 'Cô Độc Vương - Remix', 'Thiên Tú', 'CoDocVuongRemix.mp3'),
    new Music(3, 'dunghoangpham.jpg', 'Đế Vương - Remix', 'Dung Hoàng Phạm', 'DeVuongRemix.mp3'),
    new Music(4, 'xuanduc.jpg', 'Mãi Mãi Là Bao Lâu - ReMix', 'Xuân Đức', 'MaiMaiLaBaoLau.mp3'),
    new Music(5, 'tangduytan.jpg', 'Ngây Thơ', 'Tăng Duy Tân', 'NgayTho.mp3')
]

var newMusics = [];




function renderListSong() {
    let htmls = musics.map(function (music) {
        return `
            <div class="lists">
            <div class="list-icon"><ion-icon name="musical-notes"></ion-icon></div>
            <div class="list-image"><img src="images/${music.image}" alt="image${music.id}" class="avatar"></div>
            <div class="list-title">
                <h3>${music.songName}</h3>
                <h5>${music.singer}</h5>
            </div>
            <div class="list-add${music.id} list-icon"><ion-icon name="add-circle-outline" onclick="addPlaylist(${music.id})"></ion-icon></div>
            </div>
        `
    })
    document.querySelector('.list-song').innerHTML = htmls.join('');
}

function renderListPlaying() {
    let htmls = newMusics.map(function (music) {
        return `
            <div class="lists">
            <div class="list-icon"><ion-icon name="musical-notes"></ion-icon></div>
            <div class="list-image"><img src="images/${music.image}" alt="image${music.id}" class="avatar"></div>
            <div class="list-title">
                <h3 class="linkSongName" onclick="playSong(${music.id})">${music.songName}</h3>
                <h5>${music.singer}</h5>
            </div>
            <div class="list-remove list-icon"><ion-icon name="trash-outline"  onclick="removeSong(${music.id})"></ion-icon></div>
            </div>
        `
    })
    document.querySelector('.list-playing').innerHTML = htmls.join('');
}




function displayMusicPlayer() {
    let htmls = `
            <div class= "music-image" id='music-imageid'>
                <img class= "image ani-none" src="images/${newMusics[0].image}" alt="music-image">
            </div>
            <div class="textName">
                <h3 class="music-name">${newMusics[0].songName}</h3>
                <p class="singer-name">Trình bày: ${newMusics[0].singer}</p>
            </div>
            <div class="range-group">
                <input type="range" class="range" oninput="changeRangeBar()">
                <audio src="musics/${newMusics[0].musicFile}" id="song" onended="endSong()"></audio>
            </div>
            <div class="times">
                <div class="present-time"></div>
                <div class="duration-time"></div>
            </div>
            <div class="controls">
                <ion-icon name="shuffle" id="random" class="ion-icon" onclick="playRandom()" ></ion-icon>
                <ion-icon name="play-back" class="ion-icon play-back" onclick="playBack()"></ion-icon>
                <div class="play-pause">
                    <ion-icon name="play" class="ion-icon" onclick="playPause()" id="play"></ion-icon>
                </div>
                <ion-icon name="play-forward" class="ion-icon play-forward" onclick="playForward()"></ion-icon>
                <ion-icon name="repeat" id="repeat" class="ion-icon" onclick="repeatSong()"></ion-icon>
            </div>
          
        `
    let htmlsDefault = `
        <div class= "music-image">
        <img class= "image ani-none" src="images/nodisc.png" alt="music-image">
        </div>
        <div class="textName">
            <h5 class="music-name">VUI LÒNG THÊM BÀI HÁT VÀO DANH SÁCH PHÁT</h5>
        </div>
        <div class="range-group">
            <input type="range" class="range" onchange="changeRangeBar()">
            <audio src="" id="song" onended="endSong()"></audio>
        </div>
        <div class="times">
            <div class="present-time">00:00</div>
            <div class="duration-time">00:00</div>
        </div>
        <div class="controls">
            <ion-icon name="shuffle" class="ion-icon"></ion-icon>
            <ion-icon name="play-back" class="ion-icon play-back" onclick="playBack()"></ion-icon>
            <div class="play-pause">
                <ion-icon name="play" class="ion-icon" onclick="playPause()" id="play"></ion-icon>
            </div>
            <ion-icon name="play-forward" class="ion-icon play-forward" onclick="playForward()"></ion-icon>
            <ion-icon name="repeat" class="ion-icon"></ion-icon>
        </div>
            `
    if (newMusics.length > 0) {
        document.querySelector('.layout-between').innerHTML = htmls
        song = document.querySelector('#song');
    }
    else {
        document.querySelector('.layout-between').innerHTML = htmlsDefault;
    }
}


function addPlaylist(id) {
    let checkMusic = newMusics.find(function (musical) {
        return musical.id == id;

    })
    if (!checkMusic) {
        let music;
        for (let i = 0; i < musics.length; i++) {
            if (musics[i].id == id) {
                music = musics[i];
            }
        }
        newMusics.push(music);
        document.querySelector(`.list-add${id}`).classList.add("add-hidden");
        renderListPlaying();
        displayMusicPlayer();
    }
    else {
        alert('Bài hát này đã có trong danh sách phát rồi');
    }
}

function removeSong(id) {
    let music;
    let index;
    for (let i = 0; i < newMusics.length; i++) {
        if (newMusics[i].id == id) {
            music = newMusics[i];
            index = i;
        }
    }
    let confirmed = window.confirm(`Bạn chắc chắn muốn xóa bài hát: ${music.songName} ra khỏi danh sách phát?`);
    if (confirmed) {
        newMusics.splice(index, 1);
        document.querySelector(`.list-add${id}`).classList.remove("add-hidden");
        if (newMusics.length == 0) {
            song = null;
        }
        renderListPlaying();
        displayMusicPlayer();
    }
}


let song = document.querySelector('#song');
let indexSong = 0;


function displayTime() {
    document.querySelector('.range').max = song.duration;
    document.querySelector('.range').value = song.currentTime;
    if (!song.duration) {
        document.querySelector('.present-time').innerHTML = "00:00";
        document.querySelector('.duration-time').innerHTML = "00:00";
    }
    else {
        document.querySelector('.present-time').innerHTML = formatTime(song.currentTime);
        document.querySelector('.duration-time').innerHTML = formatTime(song.duration);
    }
}

function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

function playSong(id) {
    let index;
    for (let i = 0; i < newMusics.length; i++) {
        if (newMusics[i].id == id) {
            index = i;
        }
    }
    displayChange(index);
    if (notPlaying) {
        playPause();
    }
    else {
        notPlaying = true;
        playPause();
    }
}



let notPlaying = true;
function playPause() {
    if (notPlaying) {
        song.play();
        notPlaying = false;
        document.querySelector('.play-pause').innerHTML = `<ion-icon name="pause" class="ion-icon" onclick="playPause()"></ion-icon>`;
        document.querySelector('.image').style.animation = 'spinner 10s infinite linear';
    }
    else {
        song.pause();
        notPlaying = true;
        document.querySelector('.play-pause').innerHTML = `<ion-icon name="play" class="ion-icon" onclick="playPause()" id="play"></ion-icon>`;
        document.querySelector('.image').removeAttribute('style');
    }
}


function displayChange(index) {
    document.querySelector('.music-image>img').src = `images/${newMusics[index].image}`;
    document.querySelector('.music-name').innerHTML = `${newMusics[index].songName}`;
    document.querySelector('.singer-name').innerHTML = `Trình bày: ${newMusics[index].singer}`;
    document.querySelector('#song').src = `musics/${newMusics[index].musicFile}`;
}



function playForward() {
    if (isRandom) {
        randomSong();
    }
    else {
        indexSong++;
        if (indexSong >= newMusics.length) {
            indexSong = 0;
            displayChange(indexSong);
            notPlaying = true;
            playPause();

        }
        else {

            displayChange(indexSong);
            notPlaying = true;
            playPause();
        }

    }
}

function playBack() {
    if (isRandom) {
        randomSong();
    }
    else {
        indexSong--;
        if (indexSong < 0) {
            indexSong = newMusics.length - 1;
            displayChange(indexSong);
            notPlaying = true;
            playPause();
        }
        displayChange(indexSong);
        notPlaying = true;
        playPause();
    }
}


let repeatOn = false;
function repeatSong() {
    if (!repeatOn) {
        song.loop = true;
        document.querySelector('#repeat').style.color = '#FFCC99';
        repeatOn = true;
    }
    else {
        song.loop = false;
        document.querySelector('#repeat').removeAttribute('style');
        repeatOn = false;
    }
}

function randomSong() {
    let newIndexSong
    do {
        newIndexSong = Math.floor(Math.random() * newMusics.length);
    } while (newIndexSong == indexSong);
    displayChange(newIndexSong);
    notPlaying = true;
    playPause();
    indexSong = newIndexSong;
}

let isRandom = false;
function playRandom() {
    if (!isRandom) {
        document.querySelector('#random').style.color = '#FFCC99';
        isRandom = true;
    }
    else {
        document.querySelector('#random').removeAttribute('style');
        isRandom = false;
    }
}

function changeRangeBar() {
    song.currentTime = document.querySelector('.range').value;
}


function endSong() {
    if (!isRandom) {
        randomSong();
    }
    else {
        playForward();
    }
}


function openListSong() {
    document.querySelector('.layout-left').classList.remove('ll-hidden');
}

function openPlayList() {
    document.querySelector('.layout-right').classList.remove('lr-hidden');
}


function closeListSong() {
    document.querySelector('.layout-left').classList.add('ll-hidden');
}

function closePlayList() {
    document.querySelector('.layout-right').classList.add('lr-hidden');
}


displayTime();
setInterval(displayTime, 500);
renderListSong();
renderListPlaying();
displayMusicPlayer();
