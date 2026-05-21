import { Router } from "express" 
import { getUser, register, login, deleteUser, changePassword, deleteYourAccount } from "../controllers/userController" // тут імпортуємо функцію
import { authMiddleware } from "../middlewares/authMiddleware"

const router = Router() 

router.get("/users", getUser) 
router.post("/register", register)
router.post("/login", login )
router.delete("/delete-user", authMiddleware, deleteUser)
router.patch("/change-password", authMiddleware, changePassword)
router.delete("/delete-your-account", authMiddleware, deleteYourAccount)

export default router 