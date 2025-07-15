import   {Express} from "express";
import TopicRouter from "./topic.router";
import songRouter from "./song.router";

const mainV1Router =(app:Express ):void =>{
    
    app.use("/topics",TopicRouter)
    app.use("/songs" , songRouter)

}

export default mainV1Router;