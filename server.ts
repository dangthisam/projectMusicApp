import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import methodOverride from "method-override";
dotenv.config();
const app = express();
import connect from"./config/connectDB";
import mainV1Router from "./router/client/index.router";


import path from "path"
import mainAdminRouter from "./router/admin/index.router";
import systemConfig from "./config/system.config";
    app.use(methodOverride('_method'))
mainAdminRouter(app);
mainV1Router(app);
connect();
const port: number |string= process.env.PORT || 3000;
app.use(express.static('public'))
app.locals.prefixAdmin=systemConfig.prefixAdmin
app.set("views", "./views");
app.set("view engine", "pug");

//tinyEcm
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// to send data in form to server
    // Middleware to parse URL-encoded form data
    app.use(bodyParser.urlencoded({ extended: true }));
    // Middleware to parse JSON data (if you also handle JSON submissions)
    app.use(express.json());



app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`);
});