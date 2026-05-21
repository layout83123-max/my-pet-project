import express from "express"
import userRoutes from "./routes/userRoutes"
import { PORT, connectDB } from "./config"

const app = express()
app.use(express.json())

app.use("/api", userRoutes )

connectDB().then(() => {
app.listen(PORT, () => {
    console.log("Server is running: http://localhost:3000")
})
})