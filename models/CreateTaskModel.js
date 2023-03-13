const mongoose = require('mongoose');
const ObjectId = require('mongoose/lib/schema/objectid');
mongoose.pluralize(null)
const { Schema } = mongoose

const CreateTaskSchema = new Schema({
    title: {
        type: String
    },
    assignee: [
        {
            type: ObjectId
        }
    ],
    due_date: {
        type: Date,
        default: Date.now()
    },
    tags: {
        type: Array
    },
    description: {
        type: String
    },
    mark_as_done: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});

const CreateTaskModel = mongoose.model('Task', CreateTaskSchema)

module.exports = {
    CreateTaskModel
}