

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
const key_data = "newMusics_data";
if (getData(key_data) == null) {
    newMusics = [];
}
else {
    newMusics = getData(key_data);
}

function getData(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function renderListSong() {
    let htmls = musics.map(function (music) {
        let result = newMusics.find(function (music1) {
            if (music.id == music1.id) return true;
        })
        if (result == null) {
            return `
                <div class="lists">
                <div  class="list-icon icon-notes"><ion-icon name="musical-notes"></ion-icon></div>
                <div class="list-image"><img src="images/${music.image}" alt="image${music.id}" class="avatar"></div>
                <div class="list-title">
                    <h3>${music.songName}</h3>
                    <h5>${music.singer}</h5>
                </div>
                <div  class="list-add${music.id} list-icon icon-add" ><ion-icon  name="add-circle-outline" onclick="addPlaylist(${music.id})"></ion-icon></div>
                </div>
            `;
        } else {
            return `
            <div class="lists">
            <div  class="list-icon icon-notes"><ion-icon name="musical-notes"></ion-icon></div>
            <div class="list-image"><img src="images/${music.image}" alt="image${music.id}" class="avatar"></div>
            <div class="list-title">
                <h3>${music.songName}</h3>
                <h5>${music.singer}</h5>
            </div>
            <div  class="list-add${music.id} list-icon icon-add add-hidden" ><ion-icon  name="add-circle-outline" onclick="addPlaylist(${music.id})"></ion-icon></div>
            </div>
        `;
        }

    })
    document.querySelector('.list-song').innerHTML = htmls.join('');
}

function renderListPlaying() {
    let htmls = newMusics.map(function (music) {
        return `
            <div class="lists">
            <div class="list-icon icon-notes"><ion-icon name="musical-notes"></ion-icon></div>
            <div class="list-image"><img src="images/${music.image}" alt="image${music.id}" class="avatar"></div>
            <div class="list-title">
                <h3 class="linkSongName" onclick="playSong(${music.id})">${music.songName}</h3>
                <h5>${music.singer}</h5>
            </div>
            <div class="list-remove list-icon icon-remove"><ion-icon name="trash-outline"  onclick="removeSong(${music.id})"></ion-icon></div>
            </div>
        `
    })
    document.querySelector('.list-playing').innerHTML = htmls.join('');
}




function displayMusicPlayer() {
    if (newMusics.length > 0) {
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
        <div id ="lyric"><h4 onclick="displayLyrics(${newMusics[0].id})">Lời bài hát</h4></div>
    `
        document.querySelector('.layout-between').innerHTML = htmls
        song = document.querySelector('#song');
    }
    else {
        let htmlsDefault = `
        <div class= "music-image">
        <img class= "image ani-none" src="images/nodisc.jpg" alt="music-image">
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
        document.querySelector('.layout-between').innerHTML = htmlsDefault;
    }
}


function addPlaylist(id) {
    let music;
    for (let i = 0; i < musics.length; i++) {
        if (musics[i].id == id) {
            music = musics[i];
        }
    }
    newMusics.push(music);
    document.querySelector(`.list-add${id}`).classList.add("add-hidden");
    renderListPlaying();
    if (newMusics.length == 1) {
        displayMusicPlayer();
    }
    setData(key_data, newMusics);
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
        if (!notPlaying) {
            notPlaying = true;
        }
        renderListPlaying();
        displayMusicPlayer();
        setData(key_data, newMusics);
    }
}


let song = document.querySelector('#song');
let indexSong = 0;


function displayTime() {
    song = document.querySelector('#song')
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
    document.querySelector('#lyric').innerHTML = `<h4 onclick="displayLyrics(${newMusics[index].id})">Lời bài hát</h4>`;
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

function closeLyrics() {
    document.querySelector('.listSong').classList.remove('lsong-hidden')
    document.querySelector('.lyrics').classList.add('lyrics-hidden')
}


setInterval(displayTime, 500);
renderListSong();
renderListPlaying();
displayMusicPlayer();

function displayLyrics(id) {
    let lyrics1 = `
    <div class="close"><ion-icon name="close-circle-outline" class="list-icon" onclick="closeLyrics()"></ion-icon>
    </div>
    <div>
    <pre>
    <h2>ANH YÊU VỘI THẾ</h2>
    Còn đấy những khát khao, yêu thương đang dâng trào
    Ngày hôm nay em đành quên
    Phải cố gắng bước qua, chẳng thể nói thứ tha
    Người đi làm tim em buồn

    Vì những tổn thương ai gieo lâu nay vỡ nát rồi
    Chỉ biết khóc cười vậy thôi
    Nếu Anh là Em
    Em muốn kết thúc nhưng Anh phải đau ngàn lần hơn…

    Anh đi vào sâu tim em
    Giết chết yêu thương ở đây
    Sẽ còn mãi nơi này
    Hình dung một người thay đổi

    Anh yêu vộj thế, cứ thích buông lời trêu đùa
    Chẳng biết đâu thật tâm là ngọt ngào hay lừa dối
    Đến bây giờ sau cơn mê em mới thấu ra
    Trong tim anh lâu nay chỉ toàn dối gian

    Đêm nay bật khóc, biết trót yêu người sai lầm
    Đánh mất đi bản thân vì nhiều điều anh từng nói
    Hãy giả vờ quên tên em, để em thứ tha cho bản thân vội vàng
    Cho trái tim em nơi này.
    `
    let lyrics2 = `
    <div class="close"><ion-icon name="close-circle-outline" class="list-icon" onclick="closeLyrics()"></ion-icon>
    </div>
    <div>
    <pre>
    <h2>CÔ ĐỘC VƯƠNG</h2>
    Nửa đời sầu nửa đời âu, gập ghềnh mưa gió nửa đời người
    Chợt nhận ra tuyết rơi, bên khung cửa sổ
    Lệ ta rơi lòng ta đau,thừa cô đơn quá dư u sầu
    Tìm men say chỉ mong, Sẽ yên lòng hơn.

    Mình tôi lê bước, lạc vào giấc mơ hão huyền
    Mà đâu biết em phũ phàng, thiên Sơn đất trời
    Ngàn bình rượu đựng nào vơi, tổn thương bấy lâu
    Nguyện thân trai một đời, bóng cô góc trời
    Mờ xa gió mưa chẳng màng, thôi kiếp này chọn một mình
    Giọt lệ ta sẽ chẳng rơi một lần
    Nửa đời sầu nửa đời âu, gập ghềnh mưa gió nửa đời người
    Chợt nhận ra tuyết rơi, bên khung cửa sổ
    Lệ ta rơi lòng ta đau, thừa cô đơn quá dư u sầu
    Tìm men say chỉ mong, sẽ yên lòng hơn

    Mình tôi lê bước, lạc vào giấc mơ hão huyền
    Mà đâu biết em phũ phàng, thiên Sơn đất trời
    Ngàn bình rượu đựng nào vơi, tổn thương bấy lâu
    Nguyện thân trai một đời
    Bóng cô góc trời, mờ xa gió mưa chẳng màng
    Thôi kiếp này chọn một mình, giọt lệ ta sẽ chẳng rơi một lần.

    Mình tôi lê bước, lạc vào giấc mơ hão huyền
    Mà đâu biết em phũ phàng, thiên Sơn đất trời
    Ngàn bình rượu đựng nào vơi, tổn thương bấy lâu
    Nguyện thân trai một đời, bóng cô góc trời
    Mờ xa gió mưa chẳng màng, thôi kiếp này chọn một mình
    Giọt lệ ta sẽ chẳng rơi một lần
    Trọn cuộc đời một mình thôi, vẫn bước đi về về đâu.
    </pre>
    </div>
    `
    let lyrics3 = `
    <div class="close"><ion-icon name="close-circle-outline" class="list-icon" onclick="closeLyrics()"></ion-icon>
    </div>
    <div>
    <pre>
    <h2>ĐẾ VƯƠNG</h2>
    Một bậc quân vương mang trong con tim hình hài đất nước
    Ngỡ như gian nan ta sẽ chẳng bao giờ buồn
    Nào ngờ một hôm ngao du nhân gian chạm một ánh mắt
    Khiến cho ta say ta mê như trốn thiên đường

    Trời cao như đang trêu ngươi thân ta khi bông hoa ấy
    Trót mang con tim trao cho một nam nhân thường
    Giận lòng ta ban cho bông hoa thơm hồi về cung cấm
    Khiến em luôn luôn bên ta mãi mãi không buồn

    Mà nào ngờ đâu thân em nơi đây tâm trí nơi nào
    Nhìn về quê hương em ôm tương tư nặng lòng biết bao
    Một người nam nhân không vinh không hoa mà có lẽ nào
    Người lại yêu thương quan tâm hơn ta một đế vương sao

    Giọt lệ quân vương không khi nào rơi khi nước chưa tàn
    Mà tình chưa yên nên vương trên mi giọt buồn chứa chan
    Đành lòng buông tay cho em ra đi với mối tình vàng
    Một bậc quân vương uy nghiêm oai phong nhưng tim nát tan
    `
    let lyrics4 = `
    <div class="close"><ion-icon name="close-circle-outline" class="list-icon" onclick="closeLyrics()"></ion-icon>
    </div>
    <div>
    <pre>
    <h2>MÃI MÃI LÀ BAO LÂU</h2>
    Đã có lúc em hỏi anh
    Rằng bên nhau mãi mãi là bao lâu
    Mà sao em chẳng thấy tương lai
    Đâu là hạnh phúc
    Đã có lúc anh từng nghĩ
    Đến những ngày của sau này
    Của đôi ta Sẽ chẳng còn xa những tháng ngày

    Không còn lời hứa
    Thì thầm bên tai hằng đêm
    Xa vời ngày tháng mình bên nhau êm đềm
    ĐK: Vì cơn mưa rơi mau chiều nay Làm nhòe hết yêu thương em bao ngày
    Vì anh chẳng thể nói lên Tiếng yêu này vẫn chưa,
    vẫn chưa phôi phai
    Chẳng thể mong em sẽ dừng bước
    Chỉ muốn em sẽ đến lúc biết được
    Rằng anh vẫn còn yêu Vẫn còn yêu rất nhiều

    Bridge: Là vì do chính anh Không mang được hạng phúc cho em hay là
    Điều gì giưa chúng ta
    Dần làm em xa cách
    Mãi mãi sẽ là bao lâu, hay là lời hứa lúc tình còn đậm sâu..!

    Là vì anh đã sai làm sao giữ em ở lại
    `
    let lyrics5 = `
    <div class="close"><ion-icon name="close-circle-outline" class="list-icon" onclick="closeLyrics()"></ion-icon>
    </div>
    <div>
    <pre>
    <h2>NGÂY THƠ</h2>
    Thời gian sẽ chẳng đợi chờ điều gì
    Và cho đến khi ta nhận ra
    Tình yêu giống một trò đùa dại khờ
    Hay anh quá ngây thơ khi tin vào em
    Cánh hoa phai tàn kìa tiếng mưa đang rơi
    Lòng bỗng như chơi vơi càng nhớ em không rời
    Đã hơn hai giờ nhắm mắt nhưng không mơ
    Đầu vẫn đang ngu ngơ chìm đắm trong hững hờ
    Từng cuộc gọi mỗi tối làm sao anh quên
    Kìa giọng nói em còn vương vấn anh
    Thì thầm đâu đó lời nào bên tai
    Vậy là lời nói yêu em là người nói điêu
    Là do anh ngây thơ tưởng tình là cơn mơ
    Là do anh ngây thơ tưởng tình là cơn mơ
    Thời gian sẽ chẳng đợi chờ điều gì
    Và cho đến khi ta nhận ra
    Tình yêu giống một trò đùa dại khờ
    Hay anh quá ngây thơ khi tin vào em
    Cánh hoa phai tàn kìa tiếng mưa đang rơi
    Lòng bỗng như chơi vơi càng nhớ em không rời
    Đã hơn hai giờ nhắm mắt nhưng không mơ
    Đầu vẫn đang ngu ngơ chìm đắm trong hững hờ
    Từng cuộc gọi mỗi tối làm sao anh quên
    Kìa giọng nói em còn vương vấn anh
    Thì thầm đâu đó lời nào bên tai
    Vậy là lời nói yêu em là người nói điêu
    Là do anh ngây thơ tưởng tình là cơn mơ
    Là do anh ngây thơ tưởng tình là cơn mơ
    `
    document.querySelector('.listSong').classList.add('lsong-hidden')
    document.querySelector('.lyrics').classList.remove('lyrics-hidden')
    switch (id) {
        case 1: {
            document.querySelector('.lyrics').innerHTML = lyrics1;
            break;
        }
        case 2: {
            document.querySelector('.lyrics').innerHTML = lyrics2;
            break;
        }
        case 3: {
            document.querySelector('.lyrics').innerHTML = lyrics3;
            break;
        }
        case 4: {
            document.querySelector('.lyrics').innerHTML = lyrics4;
            break;
        }
        case 5: {
            document.querySelector('.lyrics').innerHTML = lyrics5;
            break;
        }
    }
}