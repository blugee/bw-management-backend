const mongoose = require('mongoose');
mongoose.pluralize(null);
const { Schema } = mongoose
const ObjectId = require('mongoose/lib/schema/objectid');

const permissionSchema = new Schema({
    permission_name: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

const PermissionModel = mongoose.model('Permission', permissionSchema)

module.exports = {
    PermissionModel
}