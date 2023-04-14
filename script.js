let titlelist=[
"Let's jam!",
"Music awaits!",
"Ready, set, listen!",
"Welcome back!",
"Rock on!",
"Turn it up!",
"Get grooving!",
"Your playlist awaits!",
"Press play!"]

let currentsong = new Audio(src = 'songs/Dil Galti Kar Baitha Hai.mp3')
let playbutton = $('#mainPlay')
let progressbar = $("#progressBar")
let songInfo = $('.songInfo')
let songItemList = $('.songItemList .songItem')
let newSongNum = 1

songList={
    // name, song location, coverphoto location
1:['Dil Galti Kar Baitha Hai.mp3','songs/Dil Galti Kar Baitha Hai.mp3','covers/1.jpg'],
2:['Har Har Shambhu Shiv Mahadeva','songs/Har Har Shambhu Shiv Mahadeva.mp3','covers/2.jpg'],
3:['Kesariya','songs/Kesariya.mp3','covers/3.jpg'],
4:['Maan Meri Jaan','songs/Maan Meri Jaan.mp3','covers/4.jpg'],
5:['Raatan Lambiyan.mp3','songs/Raatan Lambiyan.mp3','covers/5.jpg']
}
totalSongs=5

index=0
for(let key in songList){
    songItemList.find('img').eq(index).attr('src', songList[key][2])
    songItemList.find('.songName').eq(index).text(songList[key][0])
    index++;
}




$('.pb').click(function (event) {
    if ($(this).hasClass('fa-play')) {
        removePlayAll();
        $(this).addClass('fa-pause')
        $(this).removeClass('fa-play')
        newSongNum = parseInt(event.target.id)
        newSongsrc =songList[newSongNum][1]
        if (currentsong.getAttribute('src') != newSongsrc) { currentsong.src = newSongsrc }
        currentsong.play()
        playbutton.removeClass('fa-play')
        playbutton.addClass('fa-pause')
        $(songInfo).css('opacity', 1)
        $(`#songText`).text(songList[newSongNum][0])
        removeSongDurationAll()
    }
    else {
        $(this).addClass('fa-play')
        $(this).removeClass('fa-pause')
        currentsong.pause()
        playbutton.removeClass('fa-pause')
        playbutton.addClass('fa-play')
        $(songInfo).css('opacity', 0)
        $(`#songText`).text(songList[newSongNum][0])
    }
})

playbutton.click(function () {
    if (currentsong.paused || progressbar.val() == 0) {
        currentsong.play();
        removeSongDurationAll()
        playbutton.removeClass('fa-play').addClass('fa-pause')
        $(songInfo).css('opacity', 1)
        $(`#${newSongNum}`).addClass('fa-pause').removeClass('fa-play')
        $(`#songText`).text(songList[newSongNum][0])
    }
    else {
        currentsong.pause();
        playbutton.removeClass('fa-pause').addClass('fa-play')
        $(songInfo).css('opacity', 0)
        $(`#${newSongNum}`).removeClass('fa-pause').addClass('fa-play')
        $(`#songText`).text(songList[newSongNum][0])
    }
})

progressbar.on('change', function () {
    currentsong.currentTime = ($('#progressBar').val() * currentsong.duration) / 100
})

function removePlayAll() {
    $('.pb').each(function () {
        $(this).removeClass('fa-pause');
        $(this).addClass('fa-play')
    })
}

function removeSongDurationAll() {

    for (i = 1; i <= Object.keys(songList).length+1; i++) { $(`#songDuration${i}`).text('00:00') }
}

$(currentsong).on('timeupdate', function () {
    if (currentsong.currentTime == currentsong.duration) { next() }
    progress = parseInt(currentsong.currentTime / currentsong.duration * 100)
    sec_pass = Math.floor(parseInt(currentsong.currentTime) % 60)
    min_pass = Math.floor(parseInt(currentsong.currentTime) / 60)
    time = min_pass.toLocaleString('en-US', { minimumIntegerDigits: 2 }) + ':' + sec_pass.toLocaleString('en-US', { minimumIntegerDigits: 2 })
    $(`#songDuration${newSongNum}`).text(time)
    
    $(progressbar).val(progress)
})

function next() {
    newSongNum += 1
    if (newSongNum > 5) {
        newSongNum = 1
    }
    removePlayAll()
    removeSongDurationAll()
    $(`#${newSongNum}`).removeClass('fa-play').addClass('fa-pause')
    playbutton.removeClass('fa-play').addClass('fa-pause')
    currentsong.src = songList[newSongNum][1]
    $(songInfo).css('opacity', 1)
    currentsong.play()
    $(`#songText`).text(songList[newSongNum][0])
}

function prev() {
    newSongNum -= 1
    if (newSongNum == 0) {
        newSongNum = 3
    }
    removePlayAll()
    removeSongDurationAll()
    $(`#${newSongNum}`).removeClass('fa-play').addClass('fa-pause')
    currentsong.src = songList[newSongNum][1]
    playbutton.removeClass('fa-play').addClass('fa-pause')
    currentsong.play()
    $(`#songText`).text(songList[newSongNum][0])
}

$('#next').click(next)
$('#prev').click(prev)
