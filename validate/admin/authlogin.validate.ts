import { Request, Response, NextFunction } from "express";
import systemConfig from "../../config/system.config"; 
export const createAccount=(req:Request , res:Response , next:NextFunction) =>{
    if(!req.body.email){
        req.flash('error', 'Vui lòng nhập email!')
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        return;
    }

    if(!req.body.password){
        req.flash('error', 'Vui lòng nhập mật khẩu!')
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        return ;
    
    }

    
    next();
}