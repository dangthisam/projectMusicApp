import { Request, Response } from "express";

import md5 from "md5";
import Account from "../../model/account.model";
import systemConfig from "../../config/system.config";

//  [GET]   /admin/auth/login
export const indexRouterAuth=async (req:Request , res:Response)=>{

    if(req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
        return;
    }
   else{
     res.render("admin/pages/auth/login.pug",{
        titlePage:"Đăng nhập"  })
   }

}

//[POST]    /admin/auth/login
export const adminLoginPost=async (req:Request , res:Response)=>{
   const email=req.body.email;
 
const password=md5(req.body.password);
const find={
    email:email,
    password:password   
}



const account=await Account.findOne(find);
if(!account){
    req.flash("error" , "Email hoặc mật khẩu không đúng")
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    return;
}

if(account.password!==password){
    req.flash("error" , "Email hoặc mật khẩu không đúng")
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    return;
}

if(account.status=="inactive"){
    req.flash("error" , "Tài khoản đã bị khóa")
res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
return;

}

res.cookie("token" , account.token, {
    httpOnly:true,
    secure:false
});
req.flash("success" , "Đăng nhập thành công")

res.redirect(`${systemConfig.prefixAdmin}/dashboard`)




}

//[GET]  /admin/auth/logout

export const accountLogout =async (req:Request , res:Response)=>{
    res.clearCookie("token");
    req.flash("success" , "Đăng xuất thành công")
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)

}