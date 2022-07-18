console.log("Welcome to Eargasm")
// Initialize the variables
let songindex =0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay')
let myprogressbar = document.getElementById('myprogressbar')
let gif = document.getElementById('gif')
let mastersongname = document.getElementById('mastersongname')
let songitems = Array.from(document.getElementsByClassName('songitem'));
let songitemplay = Array.from(document.getElementsByClassName('songitemplay'));

let songs=[{songname: "I Don't do DRUGS - Doja Cat and Ariana Grande ", filepath: "songs/1.mp3", coverpath: "covers/1.jpg" },
{songname: "Kiss Me More (feat - SZA) ", filepath: "songs/2.mp3", coverpath: "covers/2.jpg" },
{songname: "34+35 - Ariana Grande ", filepath: "songs/3.mp3", coverpath: "covers/3.jpg" },
{songname: "Motive(with Doja Cat) ", filepath: "songs/4.mp3", coverpath: "covers/4.jpg" },
{songname: "SafetyNet(feat. Ty Dolla $) ", filepath: "songs/5.mp3", coverpath: "covers/5.jpg" },
{songname: " Positions - Ariana Grande", filepath: "songs/6.mp3", coverpath: "covers/6.jpg" },
{songname: "Search - The Search ", filepath: "songs/7.mp3", coverpath: "covers/7.jpg" },
{songname: "When I grow up - The Search", filepath: "songs/8.mp3", coverpath: "covers/8.jpg" },
{songname: "Six Thirty- Ariana Grande", filepath: "songs/9.mp3", coverpath: "covers/9.jpg" },
{songname: "Time - The Search", filepath: "songs/10.mp3", coverpath: "covers/10.jpg" },
]
songitems.forEach((element,i)=>{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src= songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
})


// audioElement.play()
// Handle play/pause click
masterplay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity=1 
        mastersongname.innerText = songs[songindex].songname;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
}) 

// listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value = progress;
})
myprogressbar.addEventListener('change',()=>{
    audioElement.currentTime = myprogressbar.value * audioElement.duration/100 ;
})
const makeallplays = ()=>{
    Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(audioElement.paused || audioElement.currentTime <=0){
            makeallplays();
            songindex = parseInt(e.target.id);
            progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
            myprogressbar.value = progress;
            audioElement.currentTime = myprogressbar.value * audioElement.duration/100;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songindex+1}.mp3`;
            audioElement.play();
            mastersongname.innerText = songs[songindex].songname;
            gif.style.opacity=1;
            masterplay.classList.add('fa-circle-pause');
            masterplay.classList.remove("fa-circle-play");
        }
        else{
            makeallplays();
            songindex = parseInt(e.target.id);
            progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
            myprogressbar.value = progress;
            audioElement.currentTime = myprogressbar.value * audioElement.duration/100;
            audioElement.src = `songs/${songindex+1}.mp3`;
            mastersongname.innerText = songs[songindex].songname;
            audioElement.pause();
            gif.style.opacity=0;
            masterplay.classList.add('fa-circle-play');
            masterplay.classList.remove("fa-circle-pause");

        }
       
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songindex==9){
        songindex = 0;
    }else{
        songindex +=1;
    }
    audioElement.src = `songs/${songindex+1}.mp3`;
    mastersongname.innerText = songs[songindex].songname;
    audioElement.currentTime = 0;
    audioElement.play()
    gif.style.opacity = 1;
    masterplay.classList.add('fa-circle-pause');
    masterplay.classList.remove("fa-circle-play");
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songindex==0){
        songindex = 9;
    }else{
        songindex -=1;
    }
   
    audioElement.src = `songs/${songindex+1}.mp3`;
    mastersongname.innerText = songs[songindex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterplay.classList.add('fa-circle-pause');
    masterplay.classList.remove("fa-circle-play");
})

