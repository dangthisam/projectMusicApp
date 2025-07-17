import   {Express} from "express";
import systemConfig from "../../config/system.config";
import dashboardRouter from "./dashboard.router"
import topicsRouter from "./topics.router"
import songsRouter from "./songs.router"
const mainAdminRouter =(app:Express ):void =>{
     const PATH_ADMIN =`${systemConfig.prefixAdmin}`;
    app.use( `${PATH_ADMIN}/dashboard` , dashboardRouter)
  app.use(`${PATH_ADMIN}/topics`  , topicsRouter)
  app.use(`${PATH_ADMIN}/songs` , songsRouter)

}

export default mainAdminRouter;