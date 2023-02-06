const mongoose = require('mongoose');
mongoose.pluralize(null);
const { Schema } = mongoose
const ObjectId = require('mongoose/lib/schema/objectid');

const permissionSchema = new Schema({
    permission_name: {
        type: String
    },
    assign_by: {
        type: ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
    versionKey: false
})

const PermissionModel = mongoose.model('Permission', permissionSchema)

module.exports = {
    PermissionModel
}