const express = require('express');
const validate = require('express-validation');
const depController = require('../controller/departments');
const {authorize} = require("../middleware/authorization.middlware");
const {
  postDepartmentBodySchema,
  editDepartmentBodySchema
} = require('../validation/joiRequestValidation');

const router = express.Router();

// GET => /departments
router.get('/', authorize,depController.getAllDepartments);

// GET => /departments/id
router.get('/:id', authorize,depController.getDepartment);

// POST => /departments
router.post('/',authorize,validate(postDepartmentBodySchema), depController.postDepartment);

// PUT => /departments/id
router.put('/:id',authorize, validate(editDepartmentBodySchema), depController.editDepartment);

// DELETE => /departments/id
router.delete('/:id',authorize, depController.deleteDepartment);

module.exports = router;
