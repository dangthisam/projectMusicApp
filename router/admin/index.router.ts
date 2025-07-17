import   {Express} from "express";
import systemConfig from "../../config/system.config";
import dashboardRouter from "./dashboard.router"

const mainAdminRouter =(app:Express ):void =>{
     const PATH_ADMIN =`${systemConfig.prefixAdmin}`;
    app.use( `${PATH_ADMIN}/dashboard` , dashboardRouter)


}

export default mainAdminRouter;