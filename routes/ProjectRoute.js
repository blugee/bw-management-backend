const express = require("express")
const router = express.Router()
const { verifyToken } = require("../helpers/validations")

const {
    createNewProject,
    getAllProject,
    getProjectById,
    updateProject,
    deleteProject
} = require("../controllers/ProjectController")

router.post("/project", createNewProject)
router.get("/project", getAllProject)
router.get("/project/:id", getProjectById)
router.put("/project", updateProject)
router.delete("/project/:id", deleteProject)

module.exports = router