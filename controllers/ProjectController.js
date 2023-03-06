const { ProjectModel } = require('../models/ProjectModel');
const error = require("../config/errors").errors;

const createNewProject = async (req, res) => {
    const {
        project_name,
        users,
        totalUsers,
        is_active
    } = req.body

    let obj = new ProjectModel({
        project_name,
        users,
        totalUsers,
        is_active
    })

    try {

        let existingProject = await ProjectModel.findOne({ project_name: req.body.project_name })
        if (!existingProject) {
            let data = await obj.save();
            // return res.status(201).send({ status_code: 201, message: "Cat Create Successfully", data })
            return res.status(201).send({ status: 201, message: "Project Create Successfully", data })
        } else {
            return res.status(409).send({ message: "Project Name Is Already Exist" });
        }
    } catch (error) {
        res.status(400).send({ status_code: 400, message: "Error", error })
    }
}

const getAllProject = async (req, res) => {
    try {
        let data = await ProjectModel.find().populate([{ path: 'users', model: 'User', select: ['fullName', 'avatar', 'size'] }])
        return res.status(200).send({ status: 200, message: "OK", data })
    } catch (error) {
        res.status(400).send({ status_code: 400, message: "Error", error })
    }
}

const getProjectById = async (req, res) => {
    const { id } = req.params
    try {
        let data = await ProjectModel.findById(id)
        return res.status(200).send({ status: 200, message: "OK", data })
    } catch (error) {
        res.status(400).send({ status_code: 400, message: "Error", error })
    }
}

const updateProject = async (req, res) => {
    const existingProject = await ProjectModel.findOne({ _id: req.body._id });
    if (!existingProject) {
        return res.status(400).send({ errorCode: error.ENTITY_NOT_PRESENT.code, error: error.ENTITY_NOT_PRESENT });
    }

    try {
        let data = await ProjectModel.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
        res.status(200).send({ status_code: 200, message: "Ok", data })
    } catch (error) {
        res.status(400).send({ error })
    }
}

const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const existingProject = await ProjectModel.findOne({ _id: id });
        if (!existingProject) {
            return res.status(400).send({ errorCode: error.ENTITY_NOT_PRESENT.code, error: error.ENTITY_NOT_PRESENT });
        }

        let response = await ProjectModel.findByIdAndDelete({ _id: id });
        response = {
            status_code: 200,
            message: "Ok",
        }

        res.status(200).send({ response, message: `Project Deleted Successfully with Id:${id}` })
    } catch (error) {
        res.status(400).send({ error })
    }
}

module.exports = {
    createNewProject,
    getAllProject,
    getProjectById,
    updateProject,
    deleteProject
}