const mongoose = require('mongoose');
mongoose.pluralize(null);
const { Schema } = mongoose
const ObjectId = require('mongoose/lib/schema/objectid');

const CreareProject = new Schema({
    project_name: {
        type: String
    },
    users: [
        {
            type: ObjectId,
            default: []
        }
    ],
    totalUsers: {
        type: Number,
        default: 0
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
})

const ProjectModel = mongoose.model('Projects', CreareProject)

module.exports = {
    ProjectModel
}