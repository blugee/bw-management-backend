const express = require('express');
const router = express.Router();
const {
    createPermission,
    getAllPermission,
    getPermissionById,
    getPermissionByName,
    updatePermission,
    deletePermission
} = require('../controllers/PermissionController');

router.post('/permission', createPermission);
router.get('/permission', getAllPermission);
router.get('/permission/:id', getPermissionById);
router.get('/permission/name/:permission', getPermissionByName);
router.put('/permission', updatePermission);
router.delete('/permission/:id', deletePermission);

module.exports = router 