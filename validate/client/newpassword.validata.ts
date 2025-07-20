import { Request, Response , NextFunction} from "express";
import User from "../../model/User.model"
import md5 from "md5";
 const validateNewPassword=async (req :Request,res:Response, next:NextFunction)=>{

   const tokenUser=req.cookies.tokenUser;
   const user=await User.findOne({
    tokenUser:tokenUser,
    deleted:false,
    status:"active"
   })

 
   


   

    if(!req.body.newPassword){
        req.flash('error', 'Vui lòng nhập mật khẩu!');
        res.redirect("/user/password/reset");
        return;
    }

    if(req.body.newPassword.length<6){
        req.flash('error', 'Mật khẩu phải có ít nhất 6 ký tự!');
        res.redirect("/user/password/reset");
        return;
    }
 
  
    if(req.body.newPassword!==req.body.confirmPassword){
        req.flash('error', 'Mật khẩu không khớp!');
        res.redirect("/user/password/reset");
        return;
    }
    next();
 
    
};


export default validateNewPassword;