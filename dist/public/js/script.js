

// CONFIG layout thanh nghe nhac

const aplayer=document.querySelector("#aplayer");
if(aplayer){
    const dataSong=JSON.parse(aplayer.getAttribute("data-song"));
  console.log(dataSong.lyrics)
const dataSinger=JSON.parse(aplayer.getAttribute("data-singer"));
    const ap = new APlayer({
    container: aplayer,
      lrcType: 1,
    audio: [{
        
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover:dataSong.avatar,
      lrc:dataSong.lyrics

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


ap.on('ended' , function(){
       const link =`/songs/listen/${dataSong._id}`;
        const option={
            method:"PATCH"
        
        }
      fetch(link , option)
        .then(res => res.json())
        .then(data=>{
            if(data.code==200){
               console.log(data);
               const documentLIstend=document.querySelector(".singer-detail .inner-listen span")
    documentLIstend.innerHTML=`${data.listen} listened`;
            }

        })

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

// search suggest 

const boxSearch=document.querySelector(".search-box");

if(boxSearch){
    const inputSearch=boxSearch.querySelector("input[name=keyword]");
    const boxSuggest=boxSearch.querySelector(".inner-suggest");

        inputSearch.addEventListener("keyup" , () =>{
            const keyword=inputSearch.value.trim();
         const link =`/search/suggest?keyword=${keyword}`;

fetch(link)
.then(res=>res.json())
.then(data=>{
    if(data.code=200){
    const song=data.songs
    console.log(song);
    if(song.length>0){
            boxSuggest.classList.add("show");
            const html =song.map(song =>{
                return `<a href="/songs/detail/${song.slug}" class="inner-item">
                                <div class="inner-image">
                                    <img src=${song.avatar} />
                                </div>
                                <div class="inner-info">
                                    <div class="inner-title">${song.title}</div>
                                    <div class="inner-singer"><i class="fa-solid fa-microphone-lines"></i> ${song.infoSinger.fullName}</div>
                                </div>
                            </a>
                          `
            })

            const innerList=boxSearch.querySelector(".inner-list");
            innerList.innerHTML=html.join("");


    }else{
      boxSuggest.classList.remove("show");

    }
    }
})
        })


}


//show alert 
const alert = document.querySelector("[show-alert]");
const closeAlert = document.querySelector("[close-alert]");
if(closeAlert){
    const time = alert.getAttribute("data-time");
    alert.style.transition = "all 0.3s ease-in-out";
    closeAlert.addEventListener("click", ()=>{
        alert.remove();
    });
    if(alert){
        setTimeout(()=>{
            alert.remove();
        }, time);
    }
}
