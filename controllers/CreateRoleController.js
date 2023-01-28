const { CreateRoleModel } = require('../models/CreateRoleModel');
const error = require("../config/errors").errors;

const createNewRole = async (req, res) => {
    const {
        role,
        is_active,
        modified_by
    } = req.body

    let obj = new CreateRoleModel({
        role,
        modified_by,
        is_active
    })

    try {
        let data = await obj.save();
        return res.status(201).send({ status: 201, message: "Role Create Successfully", data })
    } catch (error) {
        res.status(400).send({ status_code: 400, message: "Error", error })
    }
}

const getAllRole = async (req, res) => {
    try {
        let data = await CreateRoleModel.find().populate([{ path: 'modified_by', model: 'User', select: ['first_name', 'last_name', 'profile_img'] }])
        return res.status(200).send({ status: 200, message: "OK", data })
    } catch (error) {
        res.status(400).send({ status_code: 400, message: "Error", error })
    }
}

const getRoleById = async (req, res) => {
    const { id } = req.params
    try {
        let data = await CreateRoleModel.findById(id).populate([{ path: 'modified_by', model: 'User', select: ['first_name', 'last_name', 'profile_img'] }])
        return res.status(200).send({ status: 200, message: "OK", data })
    } catch (error) {
        res.status(400).send({ status_code: 400, message: "Error", error })
    }
}

const updateRoleStatus = async (req, res) => {
    const existingRole = await CreateRoleModel.findOne({ _id: req.body._id });
    if (!existingRole) {
        return res.status(200).send({ errorCode: error.ENTITY_NOT_PRESENT.code, error: error.ENTITY_NOT_PRESENT });
    }

    try {
        let data = await CreateRoleModel.findByIdAndUpdate({ _id: req.body._id }, { $set: { is_active: req.body.is_active } }, { new: true });
        res.status(200).send({ status_code: 200, message: "Ok", data })
    } catch (error) {
        res.status(400).send({ error })
    }
}

const updateRole = async (req, res) => {
    const existingRole = await CreateRoleModel.findOne({ _id: req.body._id });
    if (!existingRole) {
        return res.status(400).send({ errorCode: error.ENTITY_NOT_PRESENT.code, error: error.ENTITY_NOT_PRESENT });
    }

    try {
        let data = await CreateRoleModel.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
        res.status(200).send({ status_code: 200, message: "Ok", data })
    } catch (error) {
        res.status(400).send({ error })
    }
}

const deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        const existingRole = await CreateRoleModel.findOne({ _id: id });
        if (!existingRole) {
            return res.status(400).send({ errorCode: error.ENTITY_NOT_PRESENT.code, error: error.ENTITY_NOT_PRESENT });
        }

        let response = await CreateRoleModel.findByIdAndDelete({ _id: id });
        response = {
            status_code: 200,
            message: "Ok",
        }

        res.status(200).send({ response, message: `Role Deleted Successfully with Id:${id}` })
    } catch (error) {
        res.status(400).send({ error })
    }
}

module.exports = {
    createNewRole,
    getAllRole,
    getRoleById,
    updateRoleStatus,
    updateRole,
    deleteRole
}