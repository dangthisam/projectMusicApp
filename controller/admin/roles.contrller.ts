import { Request, Response } from "express";
import Role from "../../model/roles.model";
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