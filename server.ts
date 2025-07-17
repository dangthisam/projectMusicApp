import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
import connect from"./config/connectDB";
import mainV1Router from "./router/client/index.router";


import path from "path"
import mainAdminRouter from "./router/admin/index.router";
import systemConfig from "./config/system.config";
mainAdminRouter(app);
mainV1Router(app);
connect();
const port: number |string= process.env.PORT || 3000;
app.use(express.static('public'))
app.locals.prefixAdmin=systemConfig.prefixAdmin
app.set("views", "./views");
app.set("view engine", "pug");

//tinyEcm

app.use('/tinymce', express.static(path.join(process.cwd(), 'node_modules', 'tinymce')));

//end tinyEcm
app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`);
});