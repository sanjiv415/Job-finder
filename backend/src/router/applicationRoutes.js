import express from "express"
import { isAuthenticated } from "../middlewere/auth.middlewere.js"
import { employerGetAllApplications, jobSeekerDeleteApplication, jobSeekerGetApplication, postApplication } from "../controllers/appliocationController.js"

const router = express.Router()

router.post('/post',isAuthenticated,postApplication)
router.get('/employer/getall',isAuthenticated,employerGetAllApplications)
router.get('/jobseeker/getall',isAuthenticated,jobSeekerGetApplication)
router.delete('/deletejob/:id',isAuthenticated,jobSeekerDeleteApplication)


export default router