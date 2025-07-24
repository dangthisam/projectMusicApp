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
exports.postCreateAccount = exports.createAccount = exports.indexAccount = void 0;
const account_model_1 = __importDefault(require("../../model/account.model"));
const roles_model_1 = __importDefault(require("../../model/roles.model"));
const system_config_1 = __importDefault(require("../../config/system.config"));
const md5_1 = __importDefault(require("md5"));
const indexAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false,
        status: "active"
    };
    const records = yield account_model_1.default.find(find);
    for (const item of records) {
        const role = yield roles_model_1.default.findById({
            _id: item.role_id,
            deleted: false,
            status: "active"
        });
        item["role"] = role;
    }
    res.render("admin/pages/account/index.pug", {
        titlePage: "Quản lý tài khoản",
        records: records
    });
});
exports.indexAccount = indexAccount;
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield roles_model_1.default.find({
        deleted: false,
    });
    res.render("admin/pages/account/create.pug", {
        titlePage: "Tạo tài khoản",
        roles: roles
    });
});
exports.createAccount = createAccount;
const postCreateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        email: req.body.email,
        delete: false,
        status: "active"
    };
    const emailExist = yield account_model_1.default.findOne(find);
    if (emailExist) {
        req.flash("error", "Email đã tồn tại");
    }
    else {
        const account = new account_model_1.default({
            username: req.body.username,
            email: req.body.email,
            password: (0, md5_1.default)(req.body.password),
            phone: req.body.phone,
            role_id: req.body.role_id,
            status: req.body.status,
            avatar: req.body.avatar
        });
        yield account.save();
        req.flash("success", "Thêm tài khoản thành công");
    }
    res.redirect(`${system_config_1.default.prefixAdmin}/accounts`);
});
exports.postCreateAccount = postCreateAccount;
