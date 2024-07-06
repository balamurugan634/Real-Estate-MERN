import express from 'express'
import { deleteUser, landlord, signoutUser, updateuser } from "../controllers/user.control.js"
import { verifytoken } from '../utils/verifyuser.js'
import { createListing,delListing,showListing,updateList,getlist, searchList} from '../controllers/listing.control.js'

const router=express.Router()
// router.get('/test',test)
router.get('/get',searchList)

router.post('/update/:id',verifytoken,updateuser)
router.delete('/delete/:id',verifytoken,deleteUser)
router.post('/signout',signoutUser)
router.get('/listing/:id',verifytoken,showListing)
router.delete('/deletelisting/:id',verifytoken,delListing)
router.post('/updatelist/:id',verifytoken,updateList)
router.get('/getlist/:id',verifytoken,getlist)
router.get('/:id',verifytoken,landlord)
export default router