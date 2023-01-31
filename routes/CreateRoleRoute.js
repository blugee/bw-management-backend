const express = require('express');
const router = express.Router();
const {
    createNewRole,
    getAllRole,
    getRoleById,
    getRoleByName,
    updateRole,
    deleteRole
} = require('../controllers/CreateRoleController');

router.post('/role', createNewRole);
router.get('/role', getAllRole);
router.get('/role/:id', getRoleById);
router.get('/role/name/:role', getRoleByName);
router.put('/role', updateRole);
router.delete('/role/:id', deleteRole);

module.exports = router 