const express = require('express');
const validate = require('express-validation');
const roleController = require('../controller/roles');

const {
  postRoleBodySchema,
  editRoleBodySchema
} = require('../validation/joiRequestValidation');

const router = express.Router();

router.get('/',roleController.getAllRoles);

router.get('/:id',roleController.getRole);

router.post('/',validate(postRoleBodySchema),roleController.postRole);

router.put('/:id',validate(editRoleBodySchema), roleController.editRole);

router.delete('/:id',roleController.deleteRole);

module.exports = router;
