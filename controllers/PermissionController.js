const { PermissionModel } = require('../models/PermissionModel');
const error = require("../config/errors").errors;

const createPermission = async (req, res) => {
    const {
        permission_name,
        assign_by
    } = req.body

    let obj = new PermissionModel({
        permission_name,
        assign_by
    })

    try {
        let data = await obj.save();
        return res.status(201).send({ status: 201, message: "Permission Create Successfully", data })
    } catch (error) {
        res.status(400).send({ status_code: 400, message: "Error", error })
    }
}

const getAllPermission = async (req, res) => {
    try {
        let data = await PermissionModel.find().populate([{ path: 'assign_by', model: 'User', select: ['profile_img', 'first_name', 'last_name'] }]).sort({ createdAt: -1 })
        return res.status(200).send({ status: 200, message: "OK", data })
    } catch (error) {
        res.status(400).send({ status_code: 400, message: "Error", error })
    }
}

const getPermissionById = async (req, res) => {
    const { id } = req.params
    try {
        let data = await PermissionModel.findById(id).populate([{ path: 'assign_by', model: 'User', select: ['profile_img', 'first_name', 'last_name'] }])
        return res.status(200).send({ status: 200, message: "OK", data })
    } catch (error) {
        res.status(400).send({ status_code: 400, message: "Error", error })
    }
}

const getPermissionByName = async (req, res) => {
    const { permission } = req.params
    try {
        let data = await PermissionModel.find({ permission_name: { $regex: new RegExp("^" + permission.toLowerCase(), "i") } }).populate([{ path: 'assign_by', model: 'User', select: ['profile_img', 'first_name', 'last_name'] }])
        return res.status(200).send({ status: 200, message: "OK", data })
    } catch (error) {
        res.status(400).send({ status_code: 400, message: "Error", error })
    }
}

const updatePermission = async (req, res) => {
    const existingPermission = await PermissionModel.findOne({ _id: req.body._id });
    if (!existingPermission) {
        return res.status(400).send({ errorCode: error.ENTITY_NOT_PRESENT.code, error: error.ENTITY_NOT_PRESENT });
    }

    try {
        let data = await PermissionModel.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
        res.status(200).send({ status_code: 200, message: "Ok", data })
    } catch (error) {
        res.status(400).send({ error })
    }
}

const deletePermission = async (req, res) => {
    const { id } = req.params;
    try {
        const existingPermission = await PermissionModel.findOne({ _id: id });
        if (!existingPermission) {
            return res.status(400).send({ errorCode: error.ENTITY_NOT_PRESENT.code, error: error.ENTITY_NOT_PRESENT });
        }

        let response = await PermissionModel.findByIdAndDelete({ _id: id });
        response = {
            status_code: 200,
            message: "Ok",
        }

        res.status(200).send({ response, message: `Permission Deleted Successfully with Id:${id}` })
    } catch (error) {
        res.status(400).send({ error })
    }
}

module.exports = {
    createPermission,
    getAllPermission,
    getPermissionById,
    getPermissionByName,
    updatePermission,
    deletePermission
}