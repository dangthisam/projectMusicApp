import { Request, Response } from "express";
import Account from "../../model/account.model";

//  [GET] /admin/account
export const indexAccount =async (req:Request , res:Response)=>{

    const find={
        deleted:false,
    status:"active"
    }

    const records =await Account.find(find);
    res.render("admin/pages/account/index.pug",{
        titlePage:"Quản lý tài khoản",
        records:records
    
    
    })

}