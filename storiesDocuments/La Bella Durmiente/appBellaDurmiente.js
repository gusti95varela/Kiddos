const storiesList = [
    {
        title: "La Bella Durmiente",
        path: "http://dicenque.az.com.ar/labelladurmiente/audio/audio.mp3"
    }
]

let currentStories = 0

const stories = document.querySelector('#audio');

const seekBar = document.querySelector('.seek__bar');
const storieName = document.querySelector('.stories__name');
const currentTime = document.querySelector('.current__time');
const storiesDuration = document.querySelector('.song__duration');
const playBtn = document.querySelector('.btn__play');


/* Play Audios Stories */

playBtn.addEventListener('click', () => {
    if(playBtn.className.includes('pause')){
        stories.play();
    }else{
        stories.pause();
    }

    playBtn.classList.toggle('pause');
});

//setup Stories

const setStories = (i) =>{
    seekBar.value = 0; // set range slide value to 0
    let storie = storiesList[i];
    currentStories = i;
    stories.src = storie.path;
    storieName.innerHTML = storie.title;

    currentTime.innerHTML = "00:00";
    setTimeout(() => {
        seekBar.max = stories.duration;
        storiesDuration.innerHTML = formatTime(stories.duration);
    }, 300);
}  

setStories(0);

// formatting time in min and seconds format

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10){
        min = `0${min}`;
    }

    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
}

// seek bar

setInterval(() => {
    seekBar.value = stories.currentTime;
    currentTime.innerHTML = formatTime(stories.currentTime);
}, 500);

seekBar.addEventListener('change', () => {
    stories.currentTime = seekBar.value;
})