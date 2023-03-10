const mongoose = require('mongoose');
mongoose.pluralize(null);
const { Schema } = mongoose
const ObjectId = require('mongoose/lib/schema/objectid');

const CreareRole = new Schema({
    role: {
        type: String
    },
    read: {
        type: Boolean
    },
    write: {
        type: Boolean
    },
    create: {
        type: Boolean
    }
}, {
    timestamps: true,
    versionKey: false
})

const CreateRoleModel = mongoose.model('Createrole', CreareRole)

module.exports = {
    CreateRoleModel
}