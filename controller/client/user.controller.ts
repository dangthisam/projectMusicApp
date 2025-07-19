import { Request, Response } from "express";
import User from "../../model/User.model";
import md5 from "md5";

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
