import express from 'express'
import { deleteUser, signoutUser, updateuser } from "../controllers/user.control.js"
import { verifytoken } from '../utils/verifyuser.js'
import { createListing,delListing,showListing,updateList } from '../controllers/listing.control.js'

const router=express.Router()
// router.get('/test',test)
router.post('/update/:id',verifytoken,updateuser)
router.delete('/delete/:id',verifytoken,deleteUser)
router.post('/signout',signoutUser)
router.get('/listing/:id',verifytoken,showListing)
router.delete('/deletelisting/:id',verifytoken,delListing)
router.post('/updatelist/:id',verifytoken,updateList)


export default router