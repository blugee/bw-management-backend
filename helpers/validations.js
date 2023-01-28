const dotenv = require("dotenv")
dotenv.config()
const CryptoJS = require("crypto-js");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const isValidEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
};

const encrypt = (data) => {
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.ENCRYPTION_KEY).toString();
    let result = ciphertext.toString().replace(/\+/g, 'p1L2u3S').replace(/\//g, 's1L2a3S4h').replace(/=/g, 'e1Q2u3A4l');
    return result;
}

const decrypt = (data) => {
    var decryptedData = null;
    if (data != "null" && data != null && data != undefined) {
        ciphertext = data.replace(/p1L2u3S/g, '+').replace(/s1L2a3S4h/g, '/').replace(/e1Q2u3A4l/g, '=');
        var bytes = CryptoJS.AES.decrypt(ciphertext, process.env.ENCRYPTION_KEY);
        decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    return decryptedData
}

const encryptLinkData = async (data) => {
    try {
        return encrypt(data);
    }
    catch (e) {
        throw e;
    }
}

const generateUserToken = (
    _id,
    email,
    first_name,
    last_name,
    is_active,
    profile_img,
    role
) => {
    const token = jwt.sign({
        _id,
        email,
        first_name,
        last_name,
        is_active,
        profile_img,
        role
    },
        process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24, issuer: process.env.JWT_ISSUER },
    );
    return token;
};

const decodeJWTToken = (token) => {
    options = {
        expiresIn: 60 * 60 * 24,
        issuer: process.env.JWT_ISSUER
    };
    return jwt.verify(token, process.env.JWT_SECRET_KEY, options);
}

const verifyToken = (req, res, next) => {
    try {
        const accessToken = req.headers["authorization"];
        const bearerToken = accessToken.split(" ")[1];
        if (accessToken) {
            const payload = decodeJWTToken(bearerToken);
            if (!payload) {
                return res.json({ msg: "Invalid Token" });
            }
            req.user = payload;
            return next();
        } else {
            return res.json({ error: "Invalid Token" });
        }
    } catch (error) {
        return res.status(400).json({ message: "Authentication Invalid", error: error });
    }
}

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);

const comparePassword = (hashedPassword, password) => {
    return bcrypt.compareSync(password, hashedPassword);
};

const generateOTP1 = () => new Promise(res =>
    crypto.randomBytes(3, (err, buffer) => {
        res(
            parseInt(buffer.toString("hex"), 16)
                .toString()
                .substr(0, 6)
        );
    })
);

const getUTCDateTime = () => {
    var d1 = new Date();
    return d1.toUTCString();
}

module.exports = {
    isValidEmail,
    encrypt,
    decrypt,
    encryptLinkData,
    generateUserToken,
    decodeJWTToken,
    verifyToken,
    hashPassword,
    comparePassword,
    generateOTP1,
    getUTCDateTime,
}