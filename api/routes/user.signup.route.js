import express from 'express'
import { signup } from '../controllers/user.auth.js'
import { signin } from '../controllers/user.auth.js'
const router = express.Router()
router.post('/signup',signup)
router.post('/signin',signin)
export default router