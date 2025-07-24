"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLoginSuccess = void 0;
const account_model_1 = __importDefault(require("../../model/account.model"));
const system_config_1 = __importDefault(require("../../config/system.config"));
const roles_model_1 = __importDefault(require("../../model/roles.model"));
const checkLoginSuccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token) {
        req.flash("error", "Bạn cần đăng nhập để thực hiện chức năng này");
        return res.redirect(`${system_config_1.default.prefixAdmin}/auth/login`);
    }
    else {
        const account = yield account_model_1.default.findOne({
            token: token,
            deleted: false,
            status: "active"
        }).select("-password");
        if (!account) {
            req.flash("error", "Tài khoản đã bị khóa");
            return res.redirect(`${system_config_1.default.prefixAdmin}/auth/login`);
        }
        else {
            const role = yield roles_model_1.default.findById({
                _id: account.role_id,
            }).select("title permissions");
            if (!role) {
                req.flash("error", "Tài khoản đã bị khóa");
                return res.redirect(`${system_config_1.default.prefixAdmin}/auth/login`);
            }
            res.locals.account = account;
            res.locals.role = role;
            next();
        }
    }
});
exports.checkLoginSuccess = checkLoginSuccess;
