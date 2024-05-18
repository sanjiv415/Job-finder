import express from "express"
import { deleteJob, getAllJob, getMyjob, getSingleJob, postJob, updateJob } from "../controllers/jobController.js"
import { isAuthenticated } from "../middlewere/auth.middlewere.js"


const router = express.Router()

router.get("/getAllJob",getAllJob)
router.post('/postJob',isAuthenticated,postJob)
router.get('/getMyJob',isAuthenticated,getMyjob)
router.put('/update/:id',isAuthenticated,updateJob)
router.delete('/delete/:id',isAuthenticated,deleteJob)
router.get('/:id',isAuthenticated,getSingleJob)


export default router