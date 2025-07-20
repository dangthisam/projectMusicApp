import { Request, Response } from "express";
import User from "../../model/User.model";
import md5 from "md5";
import sendEmail from "../../helper/sendMail";
import PasswordReset from "../../model/forgotPassword";
import { generateRandomNumber } from "../../helper/generateString"
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

//[GET]  /user/forgot-password

export const userForgotpassword= async (req:Request , res:Response) =>{
  res.render("client/pages/user/forgot-password.pug",{
    titlePage:" Lấy lại mật khẩu"
  
  })
}


//[POST]  /user/forgot-password

export const userPostForgotpassword= async (req:Request , res:Response) =>{
   const email=req.body.email;

  const user=await User.findOne({
    email:email,
    deleted:false,
    status:"active"
  })


  if(!user){
    req.flash("error", "Email không tồn tại")
    res.redirect("back")
    return;
  
  }

  //tao OTP
  const OTP = generateRandomNumber(8);
  const expiresAt=Date.now()+120000;


  // luu vao trong db

const objectForgotPassword={
  email:email,
  otp:OTP,
  expiresAt:expiresAt

}


const passwordReset=new PasswordReset(objectForgotPassword);
const subject="Mã OTP để đặt lại mật khẩu"
const html=`Mã OTP để  láy lại mật khẩu là ${OTP}`

  // helpSendMail.sendSMS(OTP);
  sendEmail(email, subject, html)
  

await passwordReset.save();


res.redirect(`password/otp?email=${email}`)
// Gửi mail
  


  
}

// [ GET] /user/password/otp

export const userPasswordOtp= async (req:Request , res:Response) =>{
  const email=req.query.email;

  
  res.render("client/pages/user/enterNewpasswordOTP", {
    titlePage:"Nhập OTP",
    email:email
  })

}


// [POST] /user/verify-otp
export const userVerifyOtp = async (req: Request, res: Response) => {
  // ... validate OTP
const email=req.body.email;
const otp=req.body.otp
  // ✅ Lưu vào session thay vì cookie
  req.session.resetEmail = email;
  req.session.otpVerified = true;

  res.redirect("/user/password/reset");
}

// [GET] /user/password/reset
export const passWordReset = async (req: Request, res: Response) => {
  // ✅ Kiểm tra session thay vì cookie
  if (!req.session.otpVerified || !req.session.resetEmail) {
    req.flash("error", "Phiên làm việc đã hết hạn");
    res.redirect("/user/forgot-password");
    return;
  }

  res.render("client/pages/user/reset-password.pug", {
    titlePage: "Đặt lại mật khẩu"
  });
}

// [POST] /user/password/reset
export const passWordResetPost = async (req: Request, res: Response) => {
  if (!req.session.otpVerified || !req.session.resetEmail) {
    req.flash("error", "Phiên làm việc đã hết hạn");
    res.redirect("/user/forgot-password");
    return;
  }

  const password = md5(req.body.newPassword);
  const email = req.session.resetEmail;

  await User.findOneAndUpdate({
    email: email,
    deleted: false
  }, {
    password: password
  });

  // ✅ Xóa session và không tự động đăng nhập
  delete req.session.resetEmail;
  delete req.session.otpVerified;

  req.flash("success", "Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại");
  res.redirect("/topics");
}