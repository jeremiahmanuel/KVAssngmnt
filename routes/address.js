const express = require('express');
const validate = require('express-validation');
const addrController = require('../controller/address');
const {authorize} = require("../middleware/authorization.middlware");
const {
  postAddressBodySchema,
  editAddressBodySchema
} = require('../validation/joiRequestValidation');

const router = express.Router();

// GET => /departments
//router.get('/', addrController.getAllDepartments);

// GET => /departments/id
router.get('/:id', authorize,addrController.getAddress);

// POST => /departments
router.post('/',authorize,validate(postAddressBodySchema), addrController.postAddress);

// PUT => /departments/id
router.put('/:id', authorize,validate(editAddressBodySchema), addrController.editAddress);

// DELETE => /departments/id
router.delete('/:id', authorize,addrController.deleteAddress);

module.exports = router;
