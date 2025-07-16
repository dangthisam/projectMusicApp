import   {Express} from "express";
import TopicRouter from "./topic.router";
import songRouter from "./song.router";
import favoriteSongsRouter from "./favorite-songs.router";
import searchSongs from "./search.router";

const mainV1Router =(app:Express ):void =>{
    
    app.use("/topics",TopicRouter)
    app.use("/songs" , songRouter)
    app.use("/favorite-songs" ,favoriteSongsRouter )
    app.use("/search" , searchSongs)

}

export default mainV1Router;