import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import flash from "express-flash";
import path from "path";
import passport from "passport";
import { passportConfig } from "./helper/auth";

dotenv.config();
const app = express();

import connect from "./config/connectDB";
import mainV1Router from "./router/client/index.router";
import mainAdminRouter from "./router/admin/index.router";
import systemConfig from "./config/system.config";
import middlewareUser from "./middleware/client/user.middleware";

// ===== THỨ TỰ MIDDLEWARE ĐÚNG =====
// 1. Body parsing middleware TRƯỚC
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// 2. Method override
app.use(methodOverride('_method'));

// 3. Cookie parser PHẢI TRƯỚC user middleware
app.use(cookieParser('nguyenvansamthichdangthithuy'));

// 4. Session và Flash
app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'nguyenvansamthichdangthithuy', // Thêm secret
    resave: false,
    saveUninitialized: true
}));
app.use(flash());



// 5. Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// 6. Passport middleware
passportConfig();
app.use(passport.initialize());
app.use(passport.session());

// 7. View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// 8. USER MIDDLEWARE - SAU KHI ĐÃ CẤU HÌNH COOKIE PARSER
app.use(middlewareUser);

// 9. Routes cuối cùng
mainAdminRouter(app);
mainV1Router(app);

// Database connection
connect();

// Start server
const port: number | string = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
