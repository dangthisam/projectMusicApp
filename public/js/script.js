

// CONFIG layout thanh nghe nhac

const aplayer=document.querySelector("#aplayer");
if(aplayer){
    const dataSong=JSON.parse(aplayer.getAttribute("data-song"));
const dataSinger=JSON.parse(aplayer.getAttribute("data-singer"));
console.log(dataSong);
console.log(dataSinger)

    const ap = new APlayer({
    container: aplayer,
    audio: [{
        
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover:dataSong.avatar

    }],
    autoplay:true,
    volume :1
});

const avatar=document.querySelector(".singer-detail .inner-avatar img ");
ap.on('play' , function(){
    avatar.style.animationPlayState="running";

})
ap.on('pause' , function(){
    avatar.style.animationPlayState="paused";

})
}