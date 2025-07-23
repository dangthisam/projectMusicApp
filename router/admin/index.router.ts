import   {Express} from "express";
import systemConfig from "../../config/system.config";
import dashboardRouter from "./dashboard.router"
import topicsRouter from "./topics.router"
import songsRouter from "./songs.router"
import uploadImageRouter from "./upload-image.router"
import rolesRouter from "./roles.router";
const mainAdminRouter =(app:Express ):void =>{
     const PATH_ADMIN =`${systemConfig.prefixAdmin}`;
    app.use( `${PATH_ADMIN}/dashboard` , dashboardRouter)
  app.use(`${PATH_ADMIN}/topics`  , topicsRouter)
  app.use(`${PATH_ADMIN}/songs` , songsRouter)
app.use(`${PATH_ADMIN}/upload-image` , uploadImageRouter)
app.use(`${PATH_ADMIN}/roles` , rolesRouter)
}

export default mainAdminRouter;