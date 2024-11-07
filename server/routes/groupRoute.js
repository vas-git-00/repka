import express from 'express'
import { createGroup, getGroups, getGroupById, updateGroupById, deleteGroupById, addUserToGroup, getUsersInGroup, getUsersFreeForGroup } from '../controllers/groupController.js'
import { checkAuth } from '../middleware/checkAuth.js'

export const groupRouter = express.Router()

groupRouter.post("/group", checkAuth, createGroup)
groupRouter.get("/groups", checkAuth, getGroups)
groupRouter.get("/group/:id", checkAuth, getGroupById)
groupRouter.put("/group/:id", checkAuth, updateGroupById)
groupRouter.delete("/group/:id", checkAuth, deleteGroupById)
groupRouter.post("/users-group", checkAuth, addUserToGroup)
groupRouter.get("/users-group/:id", checkAuth, getUsersInGroup)
groupRouter.get("/users-group/:id/available-users", checkAuth, getUsersFreeForGroup)
