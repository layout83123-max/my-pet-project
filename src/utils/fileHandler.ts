import { UserModel, IUser} from "../modules/userModel"

export async function saveUser(UserData: {
  name: string
  password: string
  email: string
}): Promise<IUser> {
  
try {
const user = new UserModel(UserData)
return await user.save()
} catch (error: any) {
if (error.code === 11000) {
  throw new Error("Email already exists")
} 
throw new Error("Failed to save the user")
}


}