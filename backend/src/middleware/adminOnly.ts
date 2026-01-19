import { NextFunction, Request, Response } from "express";

export const adminOnly =(req:Request, res:Response, next:NextFunction)=>{
    if(!req.session || !req.session.user){
        return res.status(401).json({message:"Not authotized"})
    }

    if(req.session.user.role !== "admin"){
        return res.status(403).json({message:"Access denied"})
    }

    next()
}