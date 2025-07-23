import { Request, Response } from "express";
import Role from "../../model/roles.model";


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