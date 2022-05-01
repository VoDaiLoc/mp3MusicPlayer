

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
    new Music(3, 'dunghoangpham.jpg', 'Đế Vương - Remix', 'Dung Hoàng Phạm'),
    new Music(4, 'xuanduc.jpg', 'Mãi Mãi Là Bao Lâu - ReMix', 'Xuân Đức', 'DeVuongRemix.mp3'),
    new Music(5, 'tangduytan.jpg', 'Ngây Thơ', 'Tăng Duy Tân', 'NgayTho.mp3')
]

var newMusics = [];




function renderListSong() {
    let htmls = musics.map(function (music, index) {
        return `
            <div class="lists">
            <div class="list-icon"><ion-icon name="musical-notes"></ion-icon></div>
            <div class="list-image"><img src="images/${music.image}" alt="image${music.id}" class="avatar"></div>
            <div class="list-title">
                <h3>${music.songName}</h3>
                <h5>${music.singer}</h5>
            </div>
            <div class="list-add${index}"><ion-icon name="add-circle-outline" class="ion-icon" onclick="addPlaylist(${index})"></ion-icon></div>
            </div>
        `
    })
    document.querySelector('.list-song').innerHTML = htmls.join('');
}

function renderListPlaying() {
    let htmls = newMusics.map(function (music, index) {
        return `
            <div class="lists">
            <div class="list-icon"><ion-icon name="musical-notes"></ion-icon></div>
            <div class="list-image"><img src="images/${music.image}" alt="image${music.id}" class="avatar"></div>
            <div class="list-title">
                <h3>${music.songName}</h3>
                <h5>${music.singer}</h5>
            </div>
            <div class="list-remove"><ion-icon name="trash-outline" class="ion-icon" onclick="removeSong(${index})"></ion-icon></div>
            </div>
        `
    })
    document.querySelector('.list-playing').innerHTML = htmls.join('');
}




function displayMusicPlayer() {
    let htmls = newMusics.map(function (music, index) {
        return `
            <div class="music-image" id='music-imageid'>
                <img src="images/${music.image}" alt="music-image">
            </div>
            <div class="textName">
                <h3 class="music-name">${music.songName}</h3>
                <p class="singer-name">Trình bày: ${music.singer}</p>
            </div>
            <div class="range-group">
                <input type="range" class="range" onchange="changeRangeBar()">
                <audio src="musics/${music.musicFile}" id="song" onended="endSong()"></audio>
            </div>
            <div class="times">
                <div class="present-time"></div>
                <div class="duration-time"></div>
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
            <div class="action">
                <div class="addMusic">
                    <button type="button" class="btn btn-primary" onclick="openListSong()">DANH SÁCH BÀI HÁT</button>
                </div>
                <div class="list">
                    <span id="list-sp">DANH SÁCH PHÁT</span>
                    <ion-icon name="menu" class="ion-icon" id="icon-menu" onclick="openPlayList()"></ion-icon>
                </div>
            </div>
        `
    })
    let htmlsDefault = `
        <div class="music-image">
        <img src="images/nodisc.png" alt="music-image">
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
        <div class="action">
            <div class="addMusic">
                <button type="button" class="btn btn-primary" onclick="openListSong()">DANH SÁCH BÀI HÁT</button>
            </div>
            <div class="list">
                <span id="list-sp">DANH SÁCH PHÁT</span>
                <ion-icon name="menu" class="ion-icon" id="icon-menu" onclick="openPlayList()"></ion-icon>
            </div>
        </div>
            `
    if (newMusics.length > 0) {
        document.querySelector('.layout-between').innerHTML = htmls.join('');
        song = document.querySelector('#song');
    }
    else {
        document.querySelector('.layout-between').innerHTML = htmlsDefault;
    }
}

renderListSong();
renderListPlaying();
displayMusicPlayer();
let song = document.querySelector('#song');
let indexSong = 0;
// let playbtn = document.querySelector('.play-pause');
// let backbtn = document.querySelector('.play-back');
// let forwardbtn = document.querySelector('.play-forward');
// let durationTime = document.querySelector('.duration-time');
// let presentTime = document.querySelector('.present-time');
let rangeBar = document.querySelector('.range');

function displayTime() {
    rangeBar.max = song.duration;
    rangeBar.value = song.currentTime;
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



let notPlaying = true;
function playPause() {
    if (notPlaying) {
        song.play();
        notPlaying = false;
        document.querySelector('.play-pause').innerHTML = `<ion-icon name="pause" class="ion-icon" onclick="playPause()"></ion-icon>`;
    }
    else {
        song.pause();
        notPlaying = true;
        document.querySelector('.play-pause').innerHTML = `<ion-icon name="play" class="ion-icon" onclick="playPause()" id="play"></ion-icon>`;
    }
}


function displayChange(index) {
    document.querySelector('.music-image').setAttribute("src", `images/thientu.jpg`);
    document.querySelector('.music-name').innerHTML = `${newMusics[index].songName}`;
    document.querySelector('.singer-name').innerHTML = `Trình bày: ${newMusics[index].singer}`;
    document.querySelector('#song').src = `${newMusics[index].musicFile}`;
}



function playForward() {
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


function playBack() {
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




function changeRangeBar() {
    song.currentTime = rangeBar.value;
}


function endSong() {
    playForward();
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

function addPlaylist(index) {
    let checkMusic = newMusics.find(function (music) {
        return music.id == index + 1;
    })
    if (!checkMusic) {
        newMusics.push(musics[index]);
        document.querySelector(`.list-add${index}`).classList.add("add-hidden");
        renderListSong();
        renderListPlaying();
        displayMusicPlayer();
    }
    else {
        alert('Bài hát này đã có trong danh sách phát rồi');
    }
}

function removeSong(index) {
    let confirmed = window.confirm(`Bạn chắc chắn muốn xóa bài hát: ${newMusics[index].songName} ra khỏi danh sách phát?`);
    if (confirmed) {
        newMusics.splice(index, 1);
        renderListPlaying();
        displayMusicPlayer();
    }
}
displayTime();
setInterval(displayTime, 500);
