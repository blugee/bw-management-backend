const { UserModel } = require("../models/UserModel");
const { VerifyOtpModel } = require("../models/VerifyOtpModel");
require('dotenv').config()
const error = require("../config/errors").errors;
const helpers = require("../helpers/validations")
const email = require("../helpers/email")
const { otpEmail } = require("../helpers/email")

const loginUser = async (req, res) => {
    // const User = await UserModel.findOne({ email: req.body.user }) || ({ phone_number: req.body.user });
    var User = await UserModel.findOne({ email: req.body.email });
    try {
        if (!User) {
            return res.status(400).send({ errorCode: error.ENTITY_NOT_PRESENT.code, error: error.ENTITY_NOT_PRESENT });
        }
        if (!User.password) {
            return res.status(404).send({ message: "Invalid Login Type", error: error.INVALID_LOGIN_TYPE });
        }
        if (!helpers.comparePassword(User.password, req.body.password)) {
            return res.status(400).send({ message: "Password is Incorrect ", error: error.INVALID_CREDENTIAL });
        }
        let token = helpers.generateUserToken(User._id, User.email, User.first_name, User.last_name, User.is_active, User.profile_img,User.role)
        return res.status(200).send({ message: "Login Successfully", token: token, is_firstTime: false });
    } catch (error) {
        res.status(400).send({ status_code: 400, message: "Error", error: error.message })
    }
}

const resetPassword = async (req, res) => {

    if (!req.body.email || !req.body.currentPassword || !req.body.newPassword || !req.body.confirmPassword) {
        return res.status(400).send(error.MANDATORY_FIELDS.message, error.MANDATORY_FIELDS.response_code, error.MANDATORY_FIELDS);
    }

    try {
        let data = await UserModel.findOne({
            email: req.body.email,
            is_active: true,
            is_confirmed: true,
        });

        if (!helpers.comparePassword(data.password, req.body.currentPassword)) {
            return res.status(400).send({ message: "Password is Incorrect ", error: error.INVALID_CREDENTIAL });
        }

        if (data) {

            let result = {
                password: helpers.hashPassword(req.body.newPassword)
            };

            await UserModel.updateOne({ email: req.body.email }, result);
            let response = {
                status_code: 200,
                message: "Password successfully updated"
            }
            return res.status(200).send(response);
        }
        else {
            return res.status(400).send(error.SESSION_TOKEN_NOT_VALID.message, error.SESSION_TOKEN_NOT_VALID.response_code, error.SESSION_TOKEN_NOT_VALID);
        }
    } catch (error) {
        res.status(400).send({ error: error.message })
    };
}

/* const forgotPasswordEmail = async (req, res) => {

    if (req.body_encrypted) {
        let original_data = helpers.decrypt(req.body_encrypted);
        console.log(original_data);
        req = original_data;
    }

    if (!req.email) {
        return res.status(400).send(error.MANDATORY_FIELDS.message, error.MANDATORY_FIELDS.response_code, error.MANDATORY_FIELDS);
    }

    if (!helpers.isValidEmail(req.email)) {
        return res.status(400).send(error.INVALID_EMAIL.message, error.INVALID_EMAIL.response_code, error.INVALID_EMAIL)
    }

    try {
        let user = await UserModel.findOne({
            email: req.email,
            is_active: true,
            is_confirmed: true
        });
        if (user) {
            let result = {
                updated_at: helpers.getUTCDateTime(),
                signup_token: new Date().getTime()
            };

            let x = JSON.parse(JSON.stringify(result));

            await UserModel.updateOne({ email: req.email }, result);

            let parameter = {};
            parameter.signup_token = x.signup_token;
            parameter.email = req.email;
            parameter.name = user.first_name + " " + user.last_name;

            await email.forgotPasswordEmailSend(parameter)
            let response = {
                status_code: 200,
                message: "Email sent successfully"
            }
            return response;
        }
        else {
            return res.status(400).send(error.USER_NOT_FOUND.message, error.USER_NOT_FOUND.response_code, error.USER_NOT_FOUND)
        }
    } catch (error) {
        res.status(400).send({ error })
    };
} */

const forgotPasswordEmail = async (req, res) => {
    let otp = await helpers.generateOTP1()
    if (!req.body.email) {
        return res.status(400).send(error.MANDATORY_FIELDS.message, error.MANDATORY_FIELDS.response_code, error.MANDATORY_FIELDS);
    }

    if (!helpers.isValidEmail(req.body.email)) {
        return res.status(400).send(error.INVALID_EMAIL.message, error.INVALID_EMAIL.response_code, error.INVALID_EMAIL)
    }

    try {
        let user = await UserModel.findOne({
            email: req.body.email,
            is_active: true,
            is_confirmed: true
        });
        if (user) {
            let result = {
                updated_at: helpers.getUTCDateTime(),
                signup_token: otp
                // signup_token: new Date().getTime()
            };

            let x = JSON.parse(JSON.stringify(result));

            await UserModel.updateOne({ email: req.body.email }, result);

            let parameter = {};
            parameter.signup_token = x.signup_token;
            parameter.email = req.body.email;
            parameter.name = user.first_name + " " + user.last_name;

            await email.forgotPasswordEmailSend(parameter)
            let response = {
                status_code: 200,
                message: "Email sent successfully"
            }
            return res.status(200).send({ status_code: 200, message: "Ok", response })
        }
        else {
            return res.status(400).send(error.USER_NOT_FOUND.message, error.USER_NOT_FOUND.response_code, error.USER_NOT_FOUND)
        }
    } catch (error) {
        res.status(400).send({ error: error.message })
    };
}

/* const forgotPassword = async (req, res) => {

    if (req.body_encrypted) {
        let original_data = helpers.decrypt(req.body_encrypted);
        console.log(original_data);
        req = original_data;
    }

    if (!req.email || !req.password || req.password === "") {
        return res.status(400).send(error.MANDATORY_FIELDS.message, error.MANDATORY_FIELDS.response_code, error.MANDATORY_FIELDS);
    }

    let original_data = await helpers.decrypt(req.encrypted_data);

    if (!helpers.isValidEmail(req.email)) {
        return res.status(400).send(error.INVALID_EMAIL.message, error.INVALID_EMAIL.response_code, error.INVALID_EMAIL);
    }

    try {
        let data = await UserModel.findOne({
            email: original_data.email,
            is_active: true,
            is_confirmed: true,
            signup_token: original_data.signup_token.toString()
        });

        if (data) {

            let result = {
                updated_at: helpers.getUTCDateTime(),
                signup_token: null,
                password: helpers.hashPassword(req.body.password)
            };

            await UserModel.updateOne({ email: original_data.email }, result);
            let response = {
                status_code: 200,
                message: "Password successfully updated"
            }
            return res.status(200).send(response);
        }
        else {
            return res.status(400).send(error.SESSION_TOKEN_NOT_VALID.message, error.SESSION_TOKEN_NOT_VALID.response_code, error.SESSION_TOKEN_NOT_VALID);
        }
    } catch (error) {
        res.status(400).send({ error:error.message })
    };
} */

const forgotPassword = async (req, res) => {

    if (!req.body.email || !req.body.password || req.body.password === "") {
        return res.status(400).send(error.MANDATORY_FIELDS.message, error.MANDATORY_FIELDS.response_code, error.MANDATORY_FIELDS);
    }

    if (!helpers.isValidEmail(req.body.email)) {
        return res.status(400).send(error.INVALID_EMAIL.message, error.INVALID_EMAIL.response_code, error.INVALID_EMAIL);
    }

    try {
        let data = await UserModel.findOne({
            email: req.body.email,
            is_active: true,
            is_confirmed: true,
            signup_token: req.body.signup_token.toString()
        });

        if (data) {

            let result = {
                updated_at: helpers.getUTCDateTime(),
                signup_token: null,
                password: helpers.hashPassword(req.body.password)
            };

            await UserModel.updateOne({ email: req.body.email }, result);
            let response = {
                status_code: 200,
                message: "Password successfully updated"
            }
            return res.status(200).send(response);
        }
        else {
            return res.status(400).send(error.SESSION_TOKEN_NOT_VALID.message, error.SESSION_TOKEN_NOT_VALID.response_code, error.SESSION_TOKEN_NOT_VALID);
        }
    } catch (error) {
        res.status(400).send({ error: error.message })
    };
}

/* const confirmEmail = async (req, res) => {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (!existingUser) {
        return res.json({ errorCode: error.ENTITY_NOT_PRESENT.code, error: error.ENTITY_NOT_PRESENT });
    }
    if (existingUser.signup_token == req.body.signup_token) {
        let response = await UserModel.findByIdAndUpdate({ _id: existingUser.id }, { $set: { is_confirmed: true, is_active: true, signup_token: null } }, { new: true });
        res.json({ message: "Email confirmed successfully", response })
    } else {
        res.json({ message: 'Missing or invalid authentication token' });
    }
} */

const confirmEmail = async (req, res) => {
    if (req.body.body_encrypted) {
        let original_data = await helpers.decrypt(req.body.body_encrypted);
        console.log((original_data));
        const existingUser = await UserModel.findOne({ email: original_data.email });
        if (!existingUser) {
            return res.status(400).send({ errorCode: error.ENTITY_NOT_PRESENT.code, error: error.ENTITY_NOT_PRESENT });
        }
        if (existingUser.signup_token == original_data.token) {
            let response = await UserModel.findByIdAndUpdate({ _id: existingUser.id }, { $set: { is_confirmed: true, is_active: true, signup_token: null } }, { new: true });
            res.status(200).send({ message: "Email confirmed successfully", response })
        } else {
            res.status(400).send({ message: 'Missing or invalid authentication token' });
        }
    }
    else {
        res.status(400).send({ message: 'Encrypted Data Not Found In Requested Body' });
    }
}

const sendOtp = async (req, res) => {
    let { email, type } = req.body

    var minutesToAdd = 5;
    var currentDate = new Date();

    var time = new Date(currentDate.getTime() + minutesToAdd * 60000);
    let otp = await helpers.generateOTP1()
    const obj = new VerifyOtpModel({
        email,
        otp,
        time,
        type
    });

    try {
        await VerifyOtpModel.deleteMany({ email: email, type: type });
        let Otp = await obj.save();
        await otpEmail(Otp)
        res.status(200).send({ status_code: 200, message: "Otp Sent SuccessFully" })
    } catch (error) {
        res.status(400).send({ status_code: 400, message: "Error", error: error.message })
    }
}

module.exports = {
    loginUser,
    resetPassword,
    forgotPasswordEmail,
    forgotPassword,
    confirmEmail,
    sendOtp,
}