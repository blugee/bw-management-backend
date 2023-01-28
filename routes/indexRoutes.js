const express = require('express');
const router = express.Router();

const AuthRoute = require("./AuthRoute");
const CreateRoleRoute = require("./CreateRoleRoute");
const UserRoute = require("./UserRoute");

router.use(
    '/api',
    AuthRoute,
    CreateRoleRoute,
    UserRoute,
);

module.exports = router