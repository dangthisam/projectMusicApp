import { Request, Response } from "express";

export const indexRouterAuth=async (req:Request , res:Response)=>{
    res.render("admin/pages/auth/login.pug",{
        titlePage:"Đăng nhập"
    })

}