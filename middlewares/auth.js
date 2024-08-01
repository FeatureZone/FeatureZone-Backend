import jwt from "jsonwebtoken";
import { UserModel } from "../models/user_model.js";
import { roles } from "../config/role.js";

export const isAuthenticated = (req,res,next) => {
    if (req.session.user) {
        next();
    }else if (req.headers.authorization) {
        try {
            const token =req.headers.authorization.split(' ')[1];
    
            //Verify the token 
            req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
            next();
        } catch (error) {
            res.status(401).json({error: "Token expired"});
        }
    }else{
        res.status(401).json("User is not authenticated")  
    }
}

export const hasPermission = (permission) => {
    return async (req, res, next) => {
        
       try {
         const id = req.session?.user?.id || req.user.id;
 
         //Find by id
         const user = await UserModel.findById(id);
         
         //Find user role with permissions
         const userRole = roles.find(element => element.role === user.role)
 
           // Use role to check if user has permission
         if(userRole && userRole.permissions.includes(permission)){
             next();
         }else {
             res.status(403).json('Not Authorized!');
         }
       } catch (error) {
        next(error);
       }

    }
}