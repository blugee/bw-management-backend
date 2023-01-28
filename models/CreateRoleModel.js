const mongoose = require('mongoose');
mongoose.pluralize(null);
const { Schema } = mongoose
const ObjectId = require('mongoose/lib/schema/objectid');

const CreareRole = new Schema({
    role: {
        type: String
    },
    is_active: {
        type: Boolean
    },
    modified_by: {
        type: ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
    versionKey: false
})

const CreateRoleModel = mongoose.model('Createrole', CreareRole)

module.exports = {
    CreateRoleModel
}