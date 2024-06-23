import express from 'express'
import { deleteUser, signoutUser, updateuser } from "../controllers/user.control.js"
import { verifytoken } from '../utils/verifyuser.js'
import { createListing,showListing } from '../controllers/listing.control.js'

const router=express.Router()
// router.get('/test',test)
router.post('/update/:id',verifytoken,updateuser)
router.delete('/delete/:id',verifytoken,deleteUser)
router.post('/signout',signoutUser)
router.get('/listing/:id',verifytoken,showListing)

export default router