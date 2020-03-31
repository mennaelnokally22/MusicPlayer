var aud = document.getElementById('song');
var songsList = document.querySelectorAll('#song-list');
let ele;
var durationSecs ;
var duration;
var seconds;
document.querySelector("#audios").addEventListener('click',function(e)
{
    ele = e.target;
    console.log(ele.classList[1]);
    document.getElementById('songName').classList.toggle(ele.classList[1]);
    document.getElementById('songName').textContent = ele.dataset.src;
    aud.src = ele.dataset.src;
});
aud.onloadeddata = function()
{
    durationSecs = aud.duration;
    duration = secondsTimeSpanToHMS(durationSecs);
    document.getElementById('seekRange').setAttribute("max",durationSecs);
    document.getElementById('seekLbl').textContent = duration;
    seconds = parseInt(durationSecs%60);
    console.log(seconds);
}
document.getElementById('seekRange').addEventListener('input',function()
{
    aud.currentTime = document.getElementById('seekRange').value;
    document.getElementById('seekLbl1').textContent   = secondsTimeSpanToHMS(aud.currentTime);
});
aud.addEventListener('timeupdate',function()
{
    document.getElementById('seekRange').value = aud.currentTime;
    document.getElementById('seekLbl1').textContent   = secondsTimeSpanToHMS(aud.currentTime);
})

function secondsTimeSpanToHMS(s) {
    var h = Math.floor(s/3600); //Get whole hours
    s -= h*3600;
    var m = Math.floor(s/60); //Get remaining minutes
    s -= m*60;
    s = parseInt(s);
    return m+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
}

document.getElementById("btnPlay").addEventListener('click',function()
{
    aud.play(); 
});

document.getElementById("btnPause").addEventListener('click',function()
{
    aud.pause();
});

document.getElementById("btnStop").addEventListener('click',function()
{
    aud.pause();
    aud.load();
});

document.getElementById("btnMute").addEventListener('click',function()
{
    aud.muted =!aud.muted;
    if(aud.muted === true)
    {
        document.querySelector("#fa").classList.remove('fa-volume-up');
        document.querySelector("#fa").classList.add('fa-volume-mute');
    }
    else
    {
        document.querySelector("#fa").classList.remove('fa-volume-mute');
        document.querySelector("#fa").classList.add('fa-volume-up');
    }
});

document.getElementById("volRange").addEventListener('input',function()
{
    var rangeVal = parseFloat(document.getElementById("volRange").value/100);
    aud.volume = rangeVal;
});
