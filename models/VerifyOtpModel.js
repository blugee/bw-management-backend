const mongoose = require('mongoose');
mongoose.pluralize(null);

const VerifyOtpSchema = new mongoose.Schema({
    email: {
        type: String
    },
    otp: {
        type: Number
    },
    time: {
        type: String
    },
    type: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

const VerifyOtpModel = mongoose.model('VerifyOtp', VerifyOtpSchema)

module.exports = {
    VerifyOtpModel
}