const express = require("express")
const router = express.Router()

const {
    loginUser,
    resetPassword,
    forgotPasswordEmail,
    forgotPassword,
    confirmEmail,
    sendOtp,
} = require("../controllers/AuthController")

router.post("/auth/login", loginUser)
router.post("/auth/resetPassword", resetPassword)
router.post("/auth/forgotPasswordEmail", forgotPasswordEmail)
router.post("/auth/forgotPassword", forgotPassword)
router.post("/auth/confirmEmail", confirmEmail)
router.post("/auth/send-otp", sendOtp)

module.exports = router 
