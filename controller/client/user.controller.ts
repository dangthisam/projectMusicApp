import { Request, Response } from "express";
import User from "../../model/User.model";
import md5 from "md5";


//[POST]  /user/register
export const userRegister= async (req:Request , res:Response) =>{
   const exitsEmail=await User.findOne({
    email:req.body.email
  });
  
  if(exitsEmail){
    req.flash("error" , "Email đã tồn tại ")
    res.redirect("/topics")
    return;
  }

req.body.password=md5(req.body.password);
const user=new User(req.body);
await user.save();
// res.cookie("tokenUser" , user.tokenUser)
req.flash("success" , "Đăng ký thành công");
res.redirect("/topics")

}


//[POST] /user/login
export const userLogin= async (req:Request , res:Response) =>{
     const email=req.body.email;
 const password=md5(req.body.password);

 const user=await User.findOne({
  email,
deleted:false,
 });

 if(!user){
  req.flash("error", "Email không tồn tại")
  res.redirect("/topics")
  return;
 }

 if(user.password!==password){
  req.flash("error", "Mật khẩu không đúng")
  res.redirect("/topics")
  return;
 }

 if(user.status=="inactive"){
  req.flash("error", "Tài khoản chưa được kích hoạt")
  res.redirect("/topics")
  return;
 }

 res.cookie("tokenUser" , user.tokenUser)


 req.flash("success" , "Đăng nhập thành công");
 res.redirect("/topics")
  
}

//[GET  ]  /user/logout

export const userLogout= async (req:Request , res:Response) =>{
  res.clearCookie("tokenUser");
  req.flash("success" , "Đăng xuất thành công");
  res.redirect("/topics")

}


//[GET ] /user/profile

export const userProfile= async (req:Request , res:Response) =>{
  const tokenUser=req.cookies.tokenUser;
  const user=await User.findOne({
    tokenUser:tokenUser,
    deleted:false
  })

  res.render("client/pages/user/profile.pug" ,{
    titlePage:"Trang cá nhân",
    user:user
  })



}

//  [GET]   /user/change-password

export const userChangePass= async (req:Request , res:Response) =>{
  res.render("client/pages/user/change-password.pug",{
    titlePage:"Đổi mật khẩu"
  
  })
}

//[POST]     /user/change-password

export const userChangePostPassword= async (req:Request , res:Response) =>{
   const newPassword=md5(req.body.newPassword);
   const tokenUser=req.cookies.tokenUser;

   await User.updateOne({
    tokenUser:tokenUser
   },{
    password:newPassword
   })

   req.flash("success" , "Đổi mật khẩu thành công")
   res.redirect("profile")





}