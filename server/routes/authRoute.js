import express from 'express'
import { registration, login, authMe } from '../controllers/authController.js'
import { checkAuth } from '../middleware/checkAuth.js'

export const authRouter = express.Router()

authRouter.post("/registration", registration)
authRouter.post("/login", login)
authRouter.get("/check-auth", checkAuth, authMe)