import { Request, Response } from "express";
import Account from "../../model/account.model";
import Role from "../../model/roles.model";
import systemConfig from "../../config/system.config";
import md5 from "md5";
import { emitWarning } from "process";

//  [GET] /admin/accounts
export const indexAccount =async (req:Request , res:Response)=>{

    const find={
        deleted:false,
    status:"active"
    }


    const records =await Account.find(find);

    for (const item of records){
        const role=await Role.findById({
            _id:item.role_id,
            deleted:false,
            status:"active"
        })
        item["role"]=role;
    }
        
    res.render("admin/pages/account/index.pug",{
        titlePage:"Quản lý tài khoản",
        records:records
    
    
    })

}

//[GET] /admin/accounts/create

export const createAccount=async (req:Request , res:Response)=>{
    const roles=await Role.find({
        deleted:false,
     
    })
    res.render("admin/pages/account/create.pug",{
        titlePage:"Tạo tài khoản",
        roles:roles
    })

}

//  [POST]     /admin/accounts/create

export const postCreateAccount=async (req:Request , res:Response)=>{

    const find={
        email:req.body.email,
    delete:false,
    status:"active"
    }

    const emailExist=await Account.findOne(find);
    if(emailExist){
        req.flash("error" , "Email đã tồn tại")

    }else{
        const account=new Account({
    username:req.body.username,
    email:req.body.email,
    password:md5(req.body.password),
phone:req.body.phone,
role_id:req.body.role_id,
status:req.body.status,
avatar:req.body.avatar

   })

   await account.save();
   req.flash("success" , "Thêm tài khoản thành công")
   
    }
res.redirect(`${systemConfig.prefixAdmin}/accounts`)



   
}