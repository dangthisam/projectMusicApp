import { Request, Response , NextFunction} from "express";
import User from "../../model/User.model"
import md5 from "md5";
 const validateresetPassword=async (req :Request,res:Response, next:NextFunction)=>{

   const tokenUser=req.cookies.tokenUser;
   const user=await User.findOne({
    tokenUser:tokenUser,
    deleted:false,
    status:"active"
   })

   if(!user){
    req.flash("error" , "Tài khoản không tồn tại")
    res.redirect("back")
    return;
   }

   if(md5(req.body.currentPassword) !==user.password){
    req.flash("error" , "Mật khẩu cũ  không đúng")
    res.redirect("change-password")
    return;
   }


   

    if(!req.body.newPassword){
        req.flash('error', 'Vui lòng nhập mật khẩu!');
        res.redirect("change-password");
        return;
    }

    if(req.body.newPassword.length<6){
        req.flash('error', 'Mật khẩu phải có ít nhất 6 ký tự!');
        res.redirect("change-password");
        return;
    }
    if(req.body.newPassword==req.body.currentPassword){
        req.flash('error', 'Mật khẩu mới không được trùng với mật khẩu cũ!');
        res.redirect("change-password");
        return;
    }
  
    if(req.body.newPassword!==req.body.confirmPassword){
        req.flash('error', 'Mật khẩu không khớp!');
        res.redirect("change-password");
        return;
    }
    next();
 
    
};


export default validateresetPassword;