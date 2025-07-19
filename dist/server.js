"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const method_override_1 = __importDefault(require("method-override"));
const express_flash_1 = __importDefault(require("express-flash"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const connectDB_1 = __importDefault(require("./config/connectDB"));
const index_router_1 = __importDefault(require("./router/client/index.router"));
const index_router_2 = __importDefault(require("./router/admin/index.router"));
const system_config_1 = __importDefault(require("./config/system.config"));
const user_middleware_1 = __importDefault(require("./middleware/client/user.middleware"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, method_override_1.default)('_method'));
app.use((0, cookie_parser_1.default)('nguyenvansamthichdangthithuy'));
app.use((0, express_session_1.default)({
    cookie: { maxAge: 60000 },
    secret: 'nguyenvansamthichdangthithuy',
    resave: false,
    saveUninitialized: true
}));
app.use((0, express_flash_1.default)());
app.use(express_1.default.static(`${__dirname}/public`));
app.use('/tinymce', express_1.default.static(path_1.default.join(__dirname, 'node_modules', 'tinymce')));
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.locals.prefixAdmin = system_config_1.default.prefixAdmin;
app.use(user_middleware_1.default);
(0, index_router_2.default)(app);
(0, index_router_1.default)(app);
(0, connectDB_1.default)();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
