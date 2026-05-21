import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config"


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"] // this should contain the user's token, the header name is authorization
    const token = authHeader && authHeader.split(" ")[1] // split by space to separate Bearer from the token

    if (!token) {
        res.status(401).send("token missing")
        return
    }


    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        (req as any).user.email = decoded 
        next()
    } catch(error) {
        res.status(403).send("The token is invalid")
    }
}