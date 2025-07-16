

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
        const option={
            method:"PATCH"
        
        }
     fetch(link , option)
        .then(res => res.json())
        .then(data=>{
            if(data.code){
                const span=buttonLike.querySelector("span");
            span.innerHTML=`${data.like} like`
            buttonLike.classList.toggle("active");
            }

        })
    })


    
}


//Button heart 

const listbuttonHeart=document.querySelectorAll("[button-heart]");

if(listbuttonHeart.length>0){
    listbuttonHeart.forEach((buttonHeart)=> {
buttonHeart.addEventListener("click" , () =>{
        const idSong=buttonHeart.getAttribute("button-heart");
        const isActive =buttonHeart.classList.contains("active");
        const type=isActive ? "unfavorite" : "favorite";
        const link =`/songs/favorite/${type}/${idSong}`;
        const option={
            method:"PATCH"
        
        }
     fetch(link , option)
        .then(res => res.json())
        .then(data=>{
            
           if(data.code){
             buttonHeart.classList.toggle("active");
           }

        })
    })
    }

    )
    
}