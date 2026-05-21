import donetv from "dotenv"
import mongoose from "mongoose"

donetv.config()

export const PORT = process.env.PORT || 3000
export const JWT_SECRET = process.env.JWT_SECRET as string
export const MONGO_URI = process.env.MONGO_URI as string

export async function connectDB(): Promise<void> {
    try {
await mongoose.connect(MONGO_URI)
console.log("mongoDB connect!")
    } catch(error) {
    console.error("error conenect: ", error);
    process.exit(1);
    }
}