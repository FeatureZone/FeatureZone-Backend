import jwt from "jsonwebtoken";

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
            res.status(401).json(error);
        }
    }else{
        res.status(401).json('No user session')  
    }
}