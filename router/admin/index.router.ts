import { Express } from "express";
import systemConfig from "../../config/system.config";
import dashboardRouter from "./dashboard.router";
import topicsRouter from "./topics.router";
import songsRouter from "./songs.router";
import uploadImageRouter from "./upload-image.router";
import rolesRouter from "./roles.router";
import accountRouter from "./account.router";
import authRouter from "./auth.router";
import * as authMiddleware from "../../middleware/admin/auth.middleware";

const mainAdminRouter = (app: Express): void => {
  const PATH_ADMIN = `${systemConfig.prefixAdmin}`;
  app.use(
    `${PATH_ADMIN}/dashboard`,
    authMiddleware.checkLoginSuccess,
    dashboardRouter
  );
  app.use(
    `${PATH_ADMIN}/topics`,
    authMiddleware.checkLoginSuccess,
    topicsRouter
  );
  app.use(`${PATH_ADMIN}/songs`, authMiddleware.checkLoginSuccess, songsRouter);
  app.use(
    `${PATH_ADMIN}/upload-image`,
    authMiddleware.checkLoginSuccess,
    uploadImageRouter
  );
  app.use(`${PATH_ADMIN}/roles`, authMiddleware.checkLoginSuccess, rolesRouter);
  app.use(
    `${PATH_ADMIN}/accounts`,
    authMiddleware.checkLoginSuccess,
    accountRouter
  );
  app.use(`${PATH_ADMIN}/auth`, authRouter);
};

export default mainAdminRouter;
