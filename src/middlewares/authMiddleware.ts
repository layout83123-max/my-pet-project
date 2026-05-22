import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config"


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"] 
    const token = authHeader && authHeader.split(" ")[1] 

    if (!token) {
        res.status(401).send("token missing")
        return
    }


    try {
    const decoded = jwt.verify(token, JWT_SECRET);
   (req as any).user = decoded;
    next()
    } catch(error) {
        console.error("Token verification error: ", error)
        res.status(403).send("The token is invalid")
    }
}