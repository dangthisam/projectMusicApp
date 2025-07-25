import { Request, Response } from "express";
import Role from "../../model/roles.model";
import systemConfig from "../../config/system.config";
import Song from "../../model/songs.model";
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

// [GET]  /admin/detail/:id

export const detailRoles=async (req:Request , res:Response)=>{
    const idRole=req.params.id;
    const role=await Role.findById({
        _id:idRole,
        deleted:false
    })
    res.render("admin/pages/roles/detail.pug",{
        titlePage:"Chi tiết vai trò",
        role:role
    })
}


//[GET] /admin/roles/edit/:id

export const editRoles=async (req:Request , res:Response)=>{
    const idRole=req.params.id;
    const role=await Role.findById({
        _id:idRole,
        deleted:false
    })
  res.render("admin/pages/roles/edit.pug",{
    titlePage:"Chỉnh sửa vai trò",
    role:role
  } )

}

//[PATCH]  /admin/roles/edit/:id

export const editPatchRole=async (req:Request , res:Response)=>{
  const idRole=req.params.id;
  const title=req.body.title;
  const description=req.body.description;

  await Role.updateOne({
    _id:idRole
  },{
    title:title,
    description:description
  })

  req.flash("success" , "Chỉnh sửa vai trò thành công")
  res.redirect(`${systemConfig.prefixAdmin}/roles`)
}


// [GET]  /admin/roles/permissions

export const rolesPermissions=async (req:Request , res:Response)=>{
const find={
    deleted:false

}
const songs= await Song.find({
    deleted:false,
    status:"active"
})
const role=await Role.find(find);
    res.render("admin/pages/roles/permissions.pug",{
        titlePage:"Phân quyền vai trò",
        roles:role,
        songs:songs
    })

}

// [PATCH]  /admin/roles/permissions

export const rolesPermissionsPatch=async (req:Request , res:Response)=>{
    const permissions =JSON.parse(req.body.permissions);
   for (const item of permissions){
    const idRole=item.id;
    await Role.updateOne({
        _id:idRole
    },{
        permissions:item.permissions
    
    })
   }

   req.flash("success" , "Phân quyền vai trò thành công")
   res.redirect(`${systemConfig.prefixAdmin}/roles/permissions`)


}