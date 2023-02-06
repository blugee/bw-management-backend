const mongoose = require('mongoose');
mongoose.pluralize(null);
const { Schema } = mongoose
const ObjectId = require('mongoose/lib/schema/objectid');

const UserSchema = new Schema({
    avatar: {
        type: String,
        default: "https://demo-bucket.fra1.digitaloceanspaces.com/dummy_user.png"
    },
    username: {
        type: String,
        default: ""
    },
    fullName: {
        type: String,
        default: ""
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    contact: {
        type: String
    },
    age: {
        type: Number
    },
    address: {
        type: String
    },
    address1: {
        type: String
    },
    is_confirmed: {
        type: Boolean
    },
    signup_token: {
        type: String
    },
    pincode: {
        type: String
    },
    gender: {
        type: String
    },
    health_status: {
        type: Array
    },
    marital_status: {
        type: String
    },
    is_active: {
        type: Boolean
    },
    role: {
        type: String
    },
    ability: {
        type: Object
    },
    status: {
        type: String,
        default: 'pending'
    },
    modified_by: {
        type: ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    versionKey: false
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = {
    UserModel
}