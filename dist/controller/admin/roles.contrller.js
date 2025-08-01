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
exports.rolesPermissionsPatch = exports.rolesPermissions = exports.editPatchRole = exports.editRoles = exports.detailRoles = exports.deleteRoles = exports.createPostRole = exports.createRoles = exports.indexRoles = void 0;
const roles_model_1 = __importDefault(require("../../model/roles.model"));
const system_config_1 = __importDefault(require("../../config/system.config"));
const songs_model_1 = __importDefault(require("../../model/songs.model"));
const indexRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false
    };
    const records = yield roles_model_1.default.find(find);
    res.render("admin/pages/roles/index.pug", {
        titlePage: "Quản lý vai trò",
        records: records
    });
});
exports.indexRoles = indexRoles;
const createRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/roles/create.pug", {
        titlePage: "Tạo vai trò"
    });
});
exports.createRoles = createRoles;
const createPostRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const description = req.body.description;
    const newRoles = new roles_model_1.default({
        title: title,
        description: description
    });
    yield newRoles.save();
    req.flash("success", "Thêm vai trò thành công");
    res.redirect(`${system_config_1.default.prefixAdmin}/roles`);
});
exports.createPostRole = createPostRole;
const deleteRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idRole = req.params.id;
    yield roles_model_1.default.updateOne({
        _id: idRole
    }, {
        deleted: true
    });
    req.flash("success", "Thực hiện xóa role thành công");
    res.redirect(`${system_config_1.default.prefixAdmin}/roles`);
});
exports.deleteRoles = deleteRoles;
const detailRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idRole = req.params.id;
    const role = yield roles_model_1.default.findById({
        _id: idRole,
        deleted: false
    });
    res.render("admin/pages/roles/detail.pug", {
        titlePage: "Chi tiết vai trò",
        role: role
    });
});
exports.detailRoles = detailRoles;
const editRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idRole = req.params.id;
    const role = yield roles_model_1.default.findById({
        _id: idRole,
        deleted: false
    });
    res.render("admin/pages/roles/edit.pug", {
        titlePage: "Chỉnh sửa vai trò",
        role: role
    });
});
exports.editRoles = editRoles;
const editPatchRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idRole = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    yield roles_model_1.default.updateOne({
        _id: idRole
    }, {
        title: title,
        description: description
    });
    req.flash("success", "Chỉnh sửa vai trò thành công");
    res.redirect(`${system_config_1.default.prefixAdmin}/roles`);
});
exports.editPatchRole = editPatchRole;
const rolesPermissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false
    };
    const songs = yield songs_model_1.default.find({
        deleted: false,
        status: "active"
    });
    const role = yield roles_model_1.default.find(find);
    res.render("admin/pages/roles/permissions.pug", {
        titlePage: "Phân quyền vai trò",
        roles: role,
        songs: songs
    });
});
exports.rolesPermissions = rolesPermissions;
const rolesPermissionsPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const permissions = JSON.parse(req.body.permissions);
    for (const item of permissions) {
        const idRole = item.id;
        yield roles_model_1.default.updateOne({
            _id: idRole
        }, {
            permissions: item.permissions
        });
    }
    req.flash("success", "Phân quyền vai trò thành công");
    res.redirect(`${system_config_1.default.prefixAdmin}/roles/permissions`);
});
exports.rolesPermissionsPatch = rolesPermissionsPatch;
