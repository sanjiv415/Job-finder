import { Job } from "../model/jobSchema.js"

export async function postJob(req,res,next){
 const { role } = req.user

 if(role === "Job Seeker"){
    return res.status(400).json({
        success:false,
        message:"job seeker do not have the access of this resourse "
    })
 }

 const { title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo, } = req.body

    if(!title || !description || !category || !country || !city || !location){
        return res.status(400).json({
            message:"please fill all the field of jobscontroller "
        })
    }

    if((!salaryFrom || !salaryTo) && !fixedSalary){
        return res.status(400).json({
            message : "please , Either provide salary range or fixed salary"
        })
    }

    if(salaryFrom && salaryTo && fixedSalary){
        return res.status(400).json({
            message : " salary range and fixed salary can not be together "
        })
    }

    const postedBy = req.user._id

    const job = await Job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy
    })

    if(!job){
        return res.status(400).json({
            message : "failed to post job"
        })
    }

    return res.status(200).json({
        message : "job posted successfully",
        success:true ,
        job
    })
}

export async function getAllJob(req,res,next){
 const jobs = await Job.find()
 if(!jobs){
    return res.status(400).json({
        message : "jobs not found "
    })
 }

 return res.status(200).json({
    message : "jobs found successfully",
    jobs
 })
}

export async function getMyjob(req,res,next){
 const { role  } = req.user
 
 if(role === "Job Seeker"){
    return res.status(400).json({
        message:"job seeker does not have the access of this section"
    })
 }

 const jobs = await Job.find({postedBy:req.user._id})

 if(!jobs){
    return res.status(400).json({
        message : "failed to fetched jobs"
    })
 }
 return res.status(200).json({
    message : "jobs fetched successfully",
    jobs
 })
}

export async function updateJob(req,res,next){
 const { role } = req.user

 if(role === "Job Seeker"){
    return res.status(400).json({
        message : "job seeker does not have the access of this section "
    })
 }

 const { id  } = req.params

 const job = await Job.findById(id)

 if(!job){
    return res.status(400).json({
        message : 'jobs not found '
    })
 }

 const updatedJob = await Job.findByIdAndUpdate(id,req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
 })

 if(!updateJob){
    return res.status(400).json({
        message : "failed to update job "
    })
 }

 return res.status(200).json({
    message : "job updated successfully",
    updateJob
 })
}

export async function deleteJob(req,res,next){
    const { role } = req.user

    if(role === "Job Seeker"){
        return res.status(400).json({
            message : "job seeker does not have the access of this section "
     })
    }

    const { id } = req.params

    const job = await Job.findById(id)

    if(!job){
        return res.status(400).json({
            message : "job not found in deleted job section"
        })
    }

    await job.deleteOne()

    return res.status(200).json({
        message : "job deleted successfully"
    })
}
export async function getSingleJob(req,res,next){
 
 const { id } = req.params

 try {
    const job = await Job.findById(id)
   
    if(!job){
       return res.status(400).json({
           message : "job not found "
       })
    }
   
    return res.status(200).json({
       message : "job detail found successfully",
       job
    })
 } catch (error) {
    console.log(error);
 }

}