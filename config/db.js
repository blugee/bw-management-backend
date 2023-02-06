const dotenv = require('dotenv');
dotenv.config()
const mongoose = require("mongoose")

const { UserModel } = require("../models/UserModel");
const helpers = require("../helpers/validations")

const connectDB = () => {
    mongoose.connect(process.env.DB_CONNECTION)
        .then(() => {
            console.log("Database Connected SuccessFully")
            UserModel.findOne({ role: "ADMIN" }, function (err, data) {
                if (!data) {
                    UserModel.create({
                        email: "shreehariji.test@gmail.com",
                        password: helpers.hashPassword("Demo123!@#"),
                        signup_token: new Date().getTime(),
                        is_confirmed: true,
                        is_active: true,
                        role: "ADMIN",
                        username: "shreehariji",
                        fullName: "test",
                        phone_number: "9876543210",
                        age: "22",
                        address: "surat",
                        address1: "gujarat",
                        pincode: "395006",
                        gender: "Male",
                        health_status: "Good",
                        marital_status: "Un-Married",
                        ability: [
                            {
                                action: 'manage',
                                subject: 'all'
                            }
                        ]
                    }, (e, adminData) => {
                        console.log(`Admin User Created Successfully with Email "mailto:shreehariji.test@gmail.com" And id ${adminData._id}`);
                    })
                }
            });
        })
        .catch((err) => console.error("Could not connect to MongoDB...", err));
}

mongoose.set('strictQuery', false);
module.exports = { connectDB } 
