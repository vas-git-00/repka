import express from 'express'
import { createUser, getUsers, getUserById, updateUserById, deleteUserById } from '../controllers/userController.js'
import { checkAuth } from '../middleware/checkAuth.js'

export const userRouter = express.Router()

userRouter.post("/user", checkAuth, createUser)
userRouter.get("/users", checkAuth, getUsers)
userRouter.get("/user/:id", checkAuth, getUserById)
userRouter.put("/user/:id", updateUserById)
userRouter.delete("/user/:id", deleteUserById)


