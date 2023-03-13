const { CreateTaskModel } = require('../models/CreateTaskModel')
const error = require('../config/errors').errors

const createTask = async (req, res) => {
    const {
        title,
        assignee,
        due_date,
        tags,
        description,
        mark_as_done
    } = req.body

    let obj = new CreateTaskModel({
        title,
        assignee,
        due_date,
        tags,
        description,
        mark_as_done
    })
    try {

        let data = await obj.save()
        return res.status(201).send({ status: 201, message: "Task create successfully", data })

    } catch (error) {
        return res.status(400).send(error)

    }
}

const getAllTask = async (req, res) => {

    try {
        let data = await CreateTaskModel.find().populate([{ path: 'assignee', model: 'User', select: ['fullName', 'username', 'avatar'] }]).sort({ createdAt: -1 })
        res.status(200).send({ status: 200, message: "Ok", data })
    } catch (error) {
        return res.status(400).send(error)
    }

}

const getAllTaskById = async (req, res) => {

    try {
        let { id } = req.params
        let data = await CreateTaskModel.findById(id).populate([{ path: 'assignee', model: 'User', select: ['fullName', 'username', 'avatar'] }])
        res.status(200).send({ status: 200, message: "Ok", data })

    } catch (error) {
        return res.status(400).send(error)
    }

}

const updateTaskStatus = async (req, res) => {

    const existingTask = await CreateTaskModel.findOne({ _id: req.body.id });
    if (!existingTask) {
        return res.status(400).send({ errorCode: error.ENTITY_NOT_PRESENT.code, error: error.ENTITY_NOT_PRESENT });
    }
    try {
        let response = await CreateTaskModel.findByIdAndUpdate({ _id: req.body.id }, { $set: { mark_as_done: req.body.mark_as_done } }, { new: true });
        res.status(200).send({ status_code: 200, message: "Ok", response })
    } catch (error) {
        res.status(400).send({ error })
    }

}

const updateTask = async (req, res) => {

    const existingTask = await CreateTaskModel.findOne({ _id: req.body.id });
    if (!existingTask) {
        return res.status(400).send({ errorCode: error.ENTITY_NOT_PRESENT.code, error: error.ENTITY_NOT_PRESENT });
    }
    try {
        let response = await CreateTaskModel.findByIdAndUpdate({ _id: req.body.id }, req.body, { new: true });
        res.status(200).send({ status_code: 200, message: "Ok", response })
    } catch (error) {
        res.status(400).send({ error })
    }

}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const existingTask = await CreateTaskModel.findOne({ _id: id });
        if (!existingTask) {
            return res.status(400).send({ errorCode: error.ENTITY_NOT_PRESENT.code, error: error.ENTITY_NOT_PRESENT });
        }
        let response = await CreateTaskModel.findByIdAndDelete({ _id: id });
        response = {
            status_code: 200,
            message: "Ok",
        }
        res.status(200).send({ response, message: `Task deleted successfully with id:${id}` })
    } catch (error) {
        res.status(400).send({ error })
    }
}

module.exports = {
    createTask,
    getAllTask,
    getAllTaskById,
    updateTaskStatus,
    updateTask,
    deleteTask
}