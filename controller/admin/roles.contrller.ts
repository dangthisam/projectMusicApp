import { Request, Response } from "express";
import Role from "../../model/roles.model";
import systemConfig from "../../config/system.config";

//[GET]  /admin/roles
export const indexRoles =async (req:Request , res :Response) =>{

    const find ={
        deleted:false
    }

    const records =await Role.find(find);
    res.render("admin/pages/roles/index.pug",{
        titlePage:"Quản lý vai trò",
        records:records
    
    })

}

//[GET]  /admin/roles/create

export const createRoles =async (req:Request , res :Response) =>{
    res.render("admin/pages/roles/create.pug",{
        titlePage:"Tạo vai trò"
    })

}

// [POST] /admin/roles/create

export const createPostRole=async (req:Request , res:Response)=>{
    const title =req.body.title;
    const description =req.body.description

    const newRoles=new Role({
        title:title,
        description:description
    
    })

    await newRoles.save();
    req.flash("success" , "Thêm vai trò thành công")
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

//[DELETE]  /admin/delete/:id

export const deleteRoles=async (req:Request , res:Response)=>{
    const idRole=req.params.id;
     await Role.updateOne({
        _id:idRole
     },{
        deleted:true
     
     })

     req.flash("success", "Thực hiện xóa role thành công")
     res.redirect(`${systemConfig.prefixAdmin}/roles`)

}