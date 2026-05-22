import { Request, Response, NextFunction } from "express"


export async function roleMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
const role = ( req as any).user.role

if (role !== "admin") {
  res.status(403).json({
    message: "Access denied"
  })
   return
}
next()
}

