const express = require('express');
const router = express.Router();

const AuthRoute = require("./AuthRoute");
const CreateRoleRoute = require("./CreateRoleRoute");
const PermissionRoute = require("./PermissionRoute");
const UserRoute = require("./UserRoute");
const ProjectRoute = require("./ProjectRoute");
const CreateTaskRoute = require("./CreateTaskRoute");

router.use(
    '/api',
    AuthRoute,
    CreateRoleRoute,
    PermissionRoute,
    UserRoute,
    ProjectRoute,
    CreateTaskRoute
);

module.exports = router