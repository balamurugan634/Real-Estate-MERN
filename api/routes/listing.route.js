import express from 'express'
import { verifytoken } from '../utils/verifyuser.js'
import { createListing,searchList,showListing } from '../controllers/listing.control.js'
const router=express.Router()
router.post('/createlisting',verifytoken,createListing)

export default router