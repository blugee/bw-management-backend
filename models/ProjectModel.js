const mongoose = require('mongoose');
mongoose.pluralize(null);
const { Schema } = mongoose
const ObjectId = require('mongoose/lib/schema/objectid');

const CreareProject = new Schema({
    general: {
        project_name: {
            type: String
        },
        billable: {
            type: Boolean
        },
        record_activity: {
            type: Boolean
        },
        client: {
            type: ObjectId
        }

    },
    budget: {
        base_on: {
            type: String,
            default: null
        },
        cost: {
            type: String,
            default: null
        },
        hours: {
            type: String,
            default: null
        },
        notify_at: {
            type: String,
            default: null
        },
        reset: {
            type: String,
            default: null
        },
        start_date: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: null
        }
    },
    members: {
        manager: [
            {
                type: ObjectId
            }
        ],
        user: [
            {
                type: ObjectId
            }
        ],
        viewer: [
            {
                type: ObjectId
            }
        ]
    },
    team: [
        {
            type: ObjectId
        }
    ]
}, {
    timestamps: true,
    versionKey: false
})

const ProjectModel = mongoose.model('Projects', CreareProject)

module.exports = {
    ProjectModel
}