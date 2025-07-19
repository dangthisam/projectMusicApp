import User from "../../model/User.model"
import { Request, Response , NextFunction } from "express";



const userMiddleware=async (req:Request , res:Response , next:NextFunction)=>{

    const tokenUser=req.cookies.tokenUser;

    if(tokenUser){
        const user=await User.findOne({
            tokenUser:tokenUser,
            deleted:false,
            status:"active"

        })
        
       res.locals.users=user;
    
}

 next();
}

export  default userMiddleware