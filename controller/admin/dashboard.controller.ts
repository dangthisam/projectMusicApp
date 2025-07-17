import { Request, Response } from "express"
export const dashboardIndex=async (req:Request , res:Response)=>{

    res.render("admin/pages/dashboard/index.pug",{
        titlePage:"Trang Tong quan"
    })
}