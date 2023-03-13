const express = require('express')
const router = express.Router()
const { verifyToken } = require("../helpers/validations")

const {
    createTask,
    getAllTask,
    getAllTaskById,
    updateTaskStatus,
    updateTask,
    deleteTask
} = require('../controllers/CreateTaskController')

router.post("/task", /* verifyToken, */ createTask)
router.get("/task", getAllTask)
router.get("/task/:id", getAllTaskById)
router.put("/task/status", /* verifyToken, */ updateTaskStatus)
router.put("/task", /* verifyToken, */ updateTask)
router.delete("/task/:id", /* verifyToken, */ deleteTask)

module.exports = router 
