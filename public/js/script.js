

// CONFIG layout thanh nghe nhac

const aplayer=document.querySelector("#aplayer");
if(aplayer){
    const dataSong=JSON.parse(aplayer.getAttribute("data-song"));
const dataSinger=JSON.parse(aplayer.getAttribute("data-singer"));


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

//Button like

const buttonLike=document.querySelector("[button-like]");
if(buttonLike){
    buttonLike.addEventListener("click" , () =>{
        const idSong=buttonLike.getAttribute("button-like");
        const isActive =buttonLike.classList.contains("active");
        const type=isActive ? "dislike" : "like";
        const link =`/songs/like/${type}/${idSong}`;
     fetch(link)
        .then(res => res.json())
        .then(data=>{
            const span=buttonLike.querySelector("span");
            span.innerHTML=`${data.like} like`
            buttonLike.classList.toggle("active");

        })
    })
}