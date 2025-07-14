import   {Express} from "express";
import TopicRouter from "./topic.router";
const mainV1Router =(app:Express ):void =>{
    
    app.use("/topics",TopicRouter)

}

export default mainV1Router;