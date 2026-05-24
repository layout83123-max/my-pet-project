import { Router } from "express" 
import { getUser, register, login, deleteUser, changePassword, deleteYourAccount, updateRole, getProfile } from "../controllers/userController" // тут імпортуємо функцію
import { authMiddleware } from "../middlewares/authMiddleware"
import { roleMiddleware } from "../middlewares/roleMiddleware"

const router = Router() 

router.post("/auth/register", register)
router.post("/auth/login", login)
router.get("/users", getUser)
router.get("/users/me", authMiddleware, getProfile )
router.patch("/users/me/password", authMiddleware, changePassword)
router.delete("/users/me/delete", authMiddleware, deleteYourAccount)
router.delete("/users/:id", authMiddleware, roleMiddleware, deleteUser)
router.patch("/users/updaterole", authMiddleware, roleMiddleware, updateRole)


export default router 