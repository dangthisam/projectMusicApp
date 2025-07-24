// Ensure this file exports the createProducts method
import { Request, Response, NextFunction } from "express";
import systemConfig from "../../config/system.config";
export const createAccount=(req:Request , res:Response , next:NextFunction) =>{
    if(!req.body.username){
        req.flash('error', 'Vui lòng nhập tên đăng nhập!');
        res.redirect(`back`);
        return;
    }

    if(!req.body.password){
        req.flash('error', 'Vui lòng nhập mật khẩu!');
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`);
        return;
    }
    if(!req.body.email){
        req.flash('error', 'Vui lòng nhập email!');
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`);
        return;
    }
    if(!req.body.role_id){
        req.flash('error', 'Vui lòng chọn quyền!');
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`);
        return;
    }
    if(!req.body.status){
        req.flash('error', 'Vui lòng chọn trạng thái!');
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`);
        return;
    }
    next();
    // other exports
    
};


export const createPassword=(req,res , next) =>{
    if(!req.body.username){
        req.flash('error', 'Vui lòng nhập tên đăng nhập!');
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`);
        return;
    }

    
    if(!req.body.email){
        req.flash('error', 'Vui lòng nhập email!');
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`);
        return;
    }
    if(!req.body.role_id){
        req.flash('error', 'Vui lòng chọn quyền!');
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`);
        return;
    }
    if(!req.body.status){
        req.flash('error', 'Vui lòng chọn trạng thái!');
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`);
        return;
    }
    next();
    // other exports
    
};
