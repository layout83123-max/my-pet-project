import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";
import { userSchema, User, loginSchema, changePassSchema, emailSchema } from "../types/user"
import { UserModel } from "../modules/userModel";


export async function getUser(req: Request, res: Response): Promise<void> {
  const users = await UserModel.find()
  res.json(users)
}


export async function register(req: Request<{}, {}, User>, res: Response): Promise<void> {
  const result = userSchema.safeParse(req.body)

  if (!result.success) {
    res.status(400).json(result.error.format())
    return
  }

  const { name, email, password } = result.data

  const userExits = await UserModel.findOne({ email })
if (userExits) {
  res.status(409).json({
    message: "User already exists"
  })
  return
}

const hash = await bcrypt.hash(password, 11)


await UserModel.create({ name, email, password: hash })
  res.status(201).send("Registration successful")
}





export async function login(req: Request, res: Response): Promise<void> {
  const result = loginSchema.safeParse(req.body)

  if (!result.success) {
    res.status(400).json(result.error.format())
    return
  }
  const { email, password } = result.data

const user = await UserModel.findOne({ email });
console.log("user.role:", user?.role) // що виводить?

  if (!user) {
    res.status(401).send("Invalid email")
    return
  }

  const isValid = await bcrypt.compare(password, user.password)

if (!isValid) {
res.status(401).send("password wrong")
return
}
const token = jwt.sign(
  { email: user.email,
   role: user.role },
  JWT_SECRET,
  { expiresIn: "3d"}
)
res.status(200).json({
  message: "You have successfully logged in",
  token: token
})
}




  export async function deleteUser(req: Request, res: Response): Promise<void> {
    const result = emailSchema.safeParse(req.body)

    if (!result.success) {
      res.status(400).json(result.error.format())
      return
    }
  
const { email } = result.data
  const deleted = await UserModel.findOneAndDelete({ email });

  if (!deleted) {
    res.status(404).json({
      message: "User not found"
    })
    return
  }
res.status(200).json({
  message: "User deleted successfully"
})
  }





export async function changePassword(req: Request, res: Response): Promise<void> {
  const result = changePassSchema.safeParse(req.body)

  if (!result.success) {
    res.status(400).json(result.error.format())
    return
  }

  const email = (req as any).user.email
  const { password, newPassword } = result.data 
  const user = await UserModel.findOne({ email });




  if (!user) {
    res.status(404).json({ message: "User not found" })
    return
  }

const isValid = await bcrypt.compare(password, user.password)
if(!isValid) {
  res.status(401).send("wrong old password ")
  return
}

const hash = await bcrypt.hash(newPassword, 11)
await UserModel.findOneAndUpdate({ email }, {password: hash})
  res.status(200).json({ message: "Password changed successfully" })
}


export async function deleteYourAccount(req: Request, res: Response): Promise<void> {

const email = (req as any).user.email
const deleted = await UserModel.findOneAndDelete({ email })

if (!deleted) {
  res.status(404).json({
    message: "User not found"
  })
  return
}
res.status(200).json({ 
  message: "Your account has been deleted successfully"
})
}


  
