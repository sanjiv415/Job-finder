import { User } from "../model/userSchema.js"
import { sendToken } from "../utils/getToken.js"

async function register(req, res, next) {

    const { name, email, phone, password, role } = req.body

    if (!name || !email || !phone || !password || !role) {
        return res.status(400).json({
            message: "please fill full form",
            status: 400
        })
    }

    const isEmail = await User.findOne({ email })

    if (isEmail) {
        return res.status(400).json({
            message: "user already exit "
        })
    }

    const user = await User.create({
        name,
        email,
        phone,
        password,
        role
    })

    if (!user) {
        return res.status(400).json({
            message: "user not registered",
            status: 400
        })
    }

    return res.status(200).json({
        message: "user registered successfully",
        user
    })

}

async function login(req, res, next) {
    const { email, password, role } = req.body

    if (!email || !password || !role) {
        return res.status(400).json({
            message: "please fill all the fields "
        })
    }

    const user = await User.findOne({
        email
    }).select("+password")

    if (!user) {
        return res.status(400).json({
            message: " invalid email or password "
        })
    }

    const isPasswordMatch = await user.comparePassword(password)
    console.log(isPasswordMatch);

    if (isPasswordMatch === false) {
        return res.status(400).json({
            message: "invalid password "
        })
    }

    if (user.role !== role) {
        return res.status(400).json({
            message: `User with provided email and ${role} not found!`
        })
    }

    sendToken(user, 200, res, "user logged In successfully")

}

async function logout(req, res, next) {
    return res.status(200).cookie("token", "", {
        httpOnly: true,
        expiresIn: new Date(Date.now()),
    }).json({
        success: true,
        message: "user logged out successfully"
    })
}

async function getuser(req, res, next) {

    const user = req.user

    return res.status(200).json({
        message: "user fetched successfully",
        user
    })

}

export {
    register,
    login,
    logout,
    getuser
}