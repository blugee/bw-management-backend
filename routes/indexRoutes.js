const express = require('express');
const router = express.Router();

const AuthRoute = require("./AuthRoute");
const CreateRoleRoute = require("./CreateRoleRoute");
const PermissionRoute = require("./PermissionRoute");
const UserRoute = require("./UserRoute");
const ProjectRoute = require("./ProjectRoute");

router.use(
    '/api',
    AuthRoute,
    CreateRoleRoute,
    PermissionRoute,
    UserRoute,
    ProjectRoute
);

module.exports = router