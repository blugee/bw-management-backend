const express = require('express');
const router = express.Router();

const AuthRoute = require("./AuthRoute");
const CreateRoleRoute = require("./CreateRoleRoute");
const PermissionRoute = require("./PermissionRoute");
const UserRoute = require("./UserRoute");

router.use(
    '/api',
    AuthRoute,
    CreateRoleRoute,
    PermissionRoute,
    UserRoute
);

module.exports = router