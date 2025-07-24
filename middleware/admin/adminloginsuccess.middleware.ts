import Account from "../../model/account.model";
import { Request, Response , NextFunction } from "express";

export const checkLoginSuccess=async (req:Request , res:Response , next:NextFunction)=>{

    const token=req.cookies.token;

    if(token){
        const account=await Account.findOne({
            token:token,
            deleted:false,
            status:"active"

        }).select("email username role");
        
       res.locals.account=account;
    
}
 next();


}