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
exports.deleteAccount = exports.editAccountPatch = exports.editAccount = exports.postCreateAccount = exports.createAccount = exports.indexAccount = void 0;
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
        email: req.body.email
    };
    const emailExist = yield account_model_1.default.findOne(find);
    if (emailExist) {
        req.flash("error", "Email đã tồn tại");
        res.redirect(`${system_config_1.default.prefixAdmin}/accounts/create`);
        return;
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
const editAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idAccount = req.params.id;
    const account = yield account_model_1.default.findById({
        _id: idAccount,
        deleted: false,
        status: "active"
    });
    const roles = yield roles_model_1.default.find({
        deleted: false,
    });
    res.render("admin/pages/account/edit.pug", {
        titlePage: "Chỉnh sửa tài khoản",
        account: account,
        roles: roles
    });
});
exports.editAccount = editAccount;
const editAccountPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idAccount = req.params.id;
    const emailExist = yield account_model_1.default.findOne({
        email: req.body.email,
        _id: { $ne: idAccount },
        deleted: false,
        status: "active"
    });
    if (!req.file) {
        delete req.body.avatar;
    }
    if (emailExist) {
        req.flash("error", "Email đã tồn tại");
        res.redirect(`${system_config_1.default.prefixAdmin}/accounts/edit/${idAccount}`);
    }
    else {
        if (req.body.password) {
            req.body.password = (0, md5_1.default)(req.body.password);
        }
        else {
            delete req.body.password;
        }
        yield account_model_1.default.updateOne({
            _id: idAccount
        }, req.body);
        req.flash("success", "Chỉnh sửa tài khoản thành công");
        res.redirect(`${system_config_1.default.prefixAdmin}/accounts`);
    }
});
exports.editAccountPatch = editAccountPatch;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idAccount = req.params.id;
    const find = {
        _id: idAccount,
        deleted: false,
        status: "active"
    };
    const account = yield account_model_1.default.findOne(find);
    if (!account) {
        req.flash("error", "Không tìm thấy tài khoản");
        res.redirect(`${system_config_1.default.prefixAdmin}/accounts`);
    }
    else {
        yield account_model_1.default.updateOne({
            _id: idAccount
        }, {
            deleted: true
        });
        req.flash("success", "Xóa tài khoản thành công");
        res.redirect(`${system_config_1.default.prefixAdmin}/accounts`);
    }
});
exports.deleteAccount = deleteAccount;
