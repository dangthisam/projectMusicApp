import   {Express} from "express";
import systemConfig from "../../config/system.config";
import dashboardRouter from "./dashboard.router"
import topicsRouter from "./topics.router"

const mainAdminRouter =(app:Express ):void =>{
     const PATH_ADMIN =`${systemConfig.prefixAdmin}`;
    app.use( `${PATH_ADMIN}/dashboard` , dashboardRouter)
  app.use(`${PATH_ADMIN}/topics`  , topicsRouter)

}

export default mainAdminRouter;