import express from 'express'
import { verifytoken } from '../utils/verifyuser.js'
import { createListing,showListing } from '../controllers/listing.control.js'
const router=express.Router()

router.post('/createlisting',verifytoken,createListing)
router.get('/listing/:id',verifytoken,showListing)

export default router