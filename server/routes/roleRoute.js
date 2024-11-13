import express from 'express'
import { getRoles } from '../controllers/roleController.js'
import { checkAuth } from '../middleware/checkAuth.js'

export const roleRouter = express.Router()

roleRouter.get("/roles", checkAuth, getRoles)