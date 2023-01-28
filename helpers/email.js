const nodemailer = require('nodemailer');
const helpers = require('./validations');
// const { CompanyModel } = require("../models/CompanyModel");

const sendEmail = async (data, mailOptions) => {
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'shreehariji.test1@gmail.com',
                pass: 'zzqzrqyktulfwfhw'
            }
        });
        var promise = new Promise((resolve, reject) => {

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("error >>", error);
                    reject()
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve();
                }
            });
        });
        await promise
    }
    catch (e) {
        throw e;
    }
}

// const getDynamicVaribleFromDB = async (data) => {

//     return new Promise(async resolve => {
//         try {
//             let company = await CompanyModel.findOne({ name: "Blackwolve" });

//             if (company) {
//                 data.support_email = company.email;
//                 // data.sender_name = company.contact_person;
//                 data.organization_name = company.name;
//                 data.organization_address = company.address;
//             }
//             resolve(data);
//         } catch (err) {
//             console.log(err)
//             resolve(false);
//         };
//     });
// }

module.exports = {
    otpEmail: async (data) => {
        let otp = data.otp.toString()

        var mailOptions = {
            to: data.email,
            subject: "Otp For Sign Up",
            html: `<h3>Yout Otp Is :- </h3><h1>${otp}</h1>`
        };
        try {
            await sendEmail(data, mailOptions);
            return true;
        } catch (e) {
            throw e
        }
    },
    forgotPasswordEmailSend: async (data) => {

        let linkData = {
            "email": data.email,
            "Otp": data.signup_token
        }


        /* let encryptedData = await helpers.encryptLinkData(linkData);
        let requestURL = "http://localhost:3000/forgotPassword?" + encryptedData;

        // var template = await getHTMLContentFromFile("FORGOT_PASSWORD", data.language)

        data = await getDynamicVaribleFromDB(data);
        data.action_url = requestURL;

        // template.body = await replaceVariables(template.body, data)

        var mailOptions = {
            to: data.email,
            subject: " Forgot Password Email",
            html: `<h3>If You Want Do Forgot Password Then Click On Below Given Forgot-Password Link</h3>
            <br>
            <a href=${data.action_url}>Forgot-Password</a>`,
        }; */

        var mailOptions = {
            to: data.email,
            subject: " Forgot Password Email",
            html: `<p>For Your Forgot Password <u><em>SignUp Token</em></u> Is :-<strong>${data.signup_token}</strong></p>`
        };


        try {
            await sendEmail(linkData, mailOptions);
            return true;
        } catch (e) {
            throw e
        }
    },
    newUserEmail: async (data) => {

        var mailOptions = {
            to: data.email,
            subject: "Temporary Password For Login",
            html: `<h3>Your Temporary Password is :- </h3><h1>${data.password}</h1>`
        };
        try {
            await sendEmail(data, mailOptions);
            return true;
        } catch (e) {
            throw e
        }
    },
}