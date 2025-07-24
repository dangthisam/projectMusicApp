import Account from "../../model/account.model";
import { Request, Response , NextFunction } from "express";
import systemConfig from "../../config/system.config";

import Role from "../../model/roles.model";

export const checkLoginSuccess=async (req:Request , res:Response , next:NextFunction)=>{
    const token=req.cookies.token;
    if(!token){
        req.flash("error" , "Bạn cần đăng nhập để thực hiện chức năng này")
        return res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    }

    else{
        const account=await Account.findOne({
            token:token,
            deleted:false,
            status:"active"

        }).select("-password");
        
        if(!account){
            req.flash("error" , "Tài khoản đã bị khóa");
            return res.redirect(`${systemConfig.prefixAdmin}/auth/login`)

        }       else{
           const role =await Role.findById({
            _id:account.role_id,
  
           }).select("title permissions");

           if(!role){
         req.flash("error" , "Tài khoản đã bị khóa")
          return res.redirect(`${systemConfig.prefixAdmin}/auth/login`)

           }

           res.locals.account=account;
           res.locals.role=role;
           next();
        }
    

    }
}