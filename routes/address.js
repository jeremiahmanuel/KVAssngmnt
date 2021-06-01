const express = require('express');
const validate = require('express-validation');
const addrController = require('../controller/address');
const {
  postAddressBodySchema,
  editAddressBodySchema
} = require('../validation/joiRequestValidation');

const router = express.Router();

// GET => /departments
//router.get('/', addrController.getAllDepartments);

// GET => /departments/id
router.get('/:id', addrController.getAddress);

// POST => /departments
router.post('/',validate(postAddressBodySchema), addrController.postAddress);

// PUT => /departments/id
router.put('/:id', validate(editAddressBodySchema), addrController.editAddress);

// DELETE => /departments/id
router.delete('/:id', addrController.deleteAddress);

module.exports = router;
