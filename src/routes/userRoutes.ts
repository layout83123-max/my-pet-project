import { Router } from "express" 
import { getUser, register, login, deleteUser, changePassword, deleteYourAccount } from "../controllers/userController" // тут імпортуємо функцію
import { authMiddleware } from "../middlewares/authMiddleware"
import { roleMiddleware } from "../middlewares/roleMiddleware"

const router = Router() 

router.post("/auth/register", register)
router.post("/auth/login", login)
router.get("/users", getUser)
router.patch("/users/me/password", authMiddleware, changePassword)
router.delete("/users/me", authMiddleware, deleteYourAccount)
router.delete("/users/:id", authMiddleware, roleMiddleware, deleteUser)

export default router 