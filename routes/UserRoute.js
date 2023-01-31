const express = require("express")
const router = express.Router()
const { verifyToken } = require("../helpers/validations")

const {
    createUser,
    getUser,
    getUserById,
    getUserByRole,
    getUserByPermission,
    getUserByEmail,
    updateUser,
    deleteUser
} = require("../controllers/UserController")

router.post("/user", createUser)
router.get("/user", /* verifyToken, */ getUser)
router.get("/user/:id", getUserById)
router.post("/user/email", getUserByEmail)
router.get("/user/role/:id", getUserByRole)
router.get("/user/permission/:id", getUserByPermission)
router.put("/user", updateUser)
router.delete("/user/:id", deleteUser)

module.exports = router