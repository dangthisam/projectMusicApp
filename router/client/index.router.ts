import   {Express} from "express";
import TopicRouter from "./topic.router";
import songRouter from "./song.router";
import favoriteSongsRouter from "./favorite-songs.router";
import searchSongs from "./search.router";
import authRouter from "./auth.router";
import home from "./home.router"
const mainV1Router =(app:Express ):void =>{
    app.use("/" , home);
    app.use("/topics",TopicRouter)
    app.use("/songs" , songRouter)
    app.use("/favorite-songs" ,favoriteSongsRouter )
    app.use("/search" , searchSongs)
    app.use("/user" , authRouter)
    

}

export default mainV1Router;