const bcryptjs = require("bcryptjs")
const User = require("../models/user.model.js")
const { errorHandler } = require("../utils/error.js")
const jwt = require("jsonwebtoken")

const signup = async (req, res, next) => {

    const { username, email, password } = req.body
    if (
        !username ||
        !email ||
        !password ||
        username === "" ||
        email === "" ||
        password === ""
    ) {
        console.log("edslfk")
        return next(errorHandler(400, "All fields are required"))
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(errorHandler(400, "Email alredy registered"))
    }
    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    })

    try {
        await newUser.save()

        res.status(201).json("Signup successful")
    } catch (error) {
        next(error)
    }
}

const signin = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password || email === "" || password === "") {
        return next(errorHandler(400, "All fields are required"))
    }

    try {
        const validUser = await User.findOne({ email })

        if (!validUser) {
            return next(errorHandler(404, "User not found"))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)

        if (!validPassword) {
            return next(errorHandler(400, "Incorrect Password"))
        }

        const token = jwt.sign(
            { id: validUser._id, isAdmin: validUser.isAdmin },
            process.env.JWT_SECRET
        )
        const { password: pass, ...rest } = validUser._doc
          
          
        res.status(200).cookie("access_token", token, { httpOnly: true,sameSite: 'none' }).json(rest)
    } catch (error) {
        next(error)
    }
}


const google = async (req, res, next) => {
    const { email, name, profilePhotoUrl } = req.body

    try {
        const user = await User.findOne({ email })

        if (user) {
            const token = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                process.env.JWT_SECRET
            )

            const { password: pass, ...rest } = user._doc

            return res
                .status(200)
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .json(rest)
        }

        const generatedPassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8)

        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)

        // sucide_machine
        const newUser = new User({
            username:
                name.toLowerCase().split(" ").join("") +
                Math.random().toString(9).slice(-4),
            email,
            password: hashedPassword,
            profilePicture: profilePhotoUrl,
        })

        await newUser.save()

        const token = jwt.sign(
            { id: newUser._id, isAdmin: newUser.isAdmin },
            process.env.JWT_SECRET
        )

        const { password: pass, ...rest } = newUser._doc

        return res
            .status(200)
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .json(rest)
    } catch (error) {
        next(error)
    }
}

module.exports = { signup, signin, google };