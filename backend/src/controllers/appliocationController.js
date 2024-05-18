import cloudinary from "cloudinary";
import { Job } from "../model/jobSchema.js";
import { Application } from "../model/applicationSchema.js";



export async function postApplication(req, res, next) {
    const { role } = req.user;

    if (role === "Employer") {
        return res.status(400).json({
            message: "Employer does not have the access of this section",
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            message: "resume is required ",
        });
    }
    
        const { resume } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(resume.mimetype)) {
        return res.status(400).json({
            message: "invalid file of resume , please upload correct resume ",
        });
    }
//    console.log(resume);
  
    const cloudnaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath
    );

    // console.log("cloudnaryResponse",cloudnaryResponse);

    if (!cloudnaryResponse) {
        return res.status(400).json({
            message: "failed to file on cloudnary",
        });
    }

    const { name, email, coverLetter, phone, address, jobId } = req.body;
   

    const applicantID = {
        user: req.user._id,
        role: "Job Seeker",
    };
    // console.log(applicantID);

    const jobDetail = await Job.findById(jobId);

    if (!jobDetail) {
        return res.status(400).json({
            message: "job detail are not available ",
        });
    }

    const employerID = {
        user: jobDetail.postedBy,
        role: "Employer",
    };
 console.log(employerID);
    if (
        !name ||
        !email ||
        !coverLetter ||
        !phone ||
        !address ||
        !applicantID ||
        !employerID ||
        !resume
    ) {
        return res.status(400).json({
            message: "all field are required ",
        });
    }

    const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID,
        employerID,
        resume: {
            public_id: cloudnaryResponse.public_id,
            url: cloudnaryResponse.secure_url,
        },
    });

    if (!application) {
        return res.status(400).json({
            message: "fail to post job application",
        });
    }

    return res.status(200).json({
        message: "job application post successfully",
        success: true,
        application,
    });
}

export async function employerGetAllApplications(req, res, next) {
    const { role } = req.user;

    if (role === "Job Seeker") {
        return res.status(400).json({
            message: "job seeker does not have access of this section",
        });
    }

    const { _id } = req.user;

    const employerAllApplication = await Application.find({
        "employerID.user": _id,
    });

    if (!employerAllApplication) {
        return res.status(400).json({
            message: "failed to fetched employer application",
        });
    }

    return res.status(200).json({
        success: true,
        employerAllApplication,
    });
}

export async function jobSeekerGetApplication(req, res, next) {
    const { role } = req.user;
    console.log("role",role);

    if (role === "Employer") {
        return res.status(400).json({
            message: "employer does not have the access of this section",
        });
    }
    const allApplication = await Application.find({
        "applicantID.user": req.user._id,
    });

    console.log("allApplication",allApplication);

    if (!allApplication) {
        return res.status(400).json({
            message: "failed to fetched application ",
        });
    }
    return res.status(200).json({
        success: true,
        allApplication,
    });
}

export async function jobSeekerDeleteApplication(req, res, next) {
    const { role } = req.user;

    if (role === "Employer") {
        return res.status(400).json({
            message: "employer does not have the access of this section",
        });
    }

    const { id } = req.params;

    const application = await Application.findById(id);

    if (!application) {
        return res.status(400).json({
            message: "application not found ",
        });
    }

    await application.deleteOne();

    return res.status(400).json({
        message: "application deleted successfully",
    });
}
