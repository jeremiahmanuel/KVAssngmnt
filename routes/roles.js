const express = require('express');
const validate = require('express-validation');
const roleController = require('../controller/roles');
const {authorize} = require("../middleware/authorization.middlware");
const {
  postRoleBodySchema,
  editRoleBodySchema
} = require('../validation/joiRequestValidation');

const router = express.Router();

router.get('/',authorize,roleController.getAllRoles);

router.get('/:id',authorize,roleController.getRole);

router.post('/',authorize,validate(postRoleBodySchema),roleController.postRole);

router.put('/:id',authorize,validate(editRoleBodySchema), roleController.editRole);

router.delete('/:id',authorize,roleController.deleteRole);

module.exports = router;
