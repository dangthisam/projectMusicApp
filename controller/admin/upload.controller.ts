import { Request, Response } from "express";

const index=async (req:Request , res:Response)=>{
   // return link image 
res.json({
    location:req.body.file,

})

}

export default index;