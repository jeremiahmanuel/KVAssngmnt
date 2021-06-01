const Address = require('../models/address');

exports.getAddress = (req, resp, next) => {
  const id = req.params.id;

  Address.findByPk(id)
    .then(address => {
      resp.status(200).json({
        message:'Found right address',
        address
      });
    })
    .catch(err => {
      console.log(err);
      resp.status(404).json({
        message:'Address not found'
      });
    });
}

exports.postAddress =(req, resp , next) => {
  const city = req.body.name;
  const street = req.body.street;
  const pincode = req.body.pincode;
  const state = req.body.state;

  Address.create({
    city:city,
    street:street,
    pincode:pincode,
    state:state
  })
    .then(addr => {
      resp.status(200).json({
        message:'Address created successfully',
        addr
      });
    })
    .catch(err => {
      console.log(err);
      resp.status(404).json({
        message:'Address creation failed '
      });
    });
};

exports.editAddress = (req, resp, next) => {
  const id = req.params.id;
  const city = req.body.city;
  const street = req.body.street;
  const pincode = req.body.pincode;
  const state = req.body.state;
  Address.findByPk(id)
      .then(addr => {
          addr.city = city;
          addr.street = street;
          addr.pincode = pincode;
          addr.state = state;
          return addr.save();
      })
      .then(addr => {
          resp.status(200).json({
              message: 'Address updated successfully',
              addr
          });
      })
      .catch(err => {
          console.log(err);
          resp.status(404).json({
              message: 'Address updation failed',
          });
      });
};

exports.deleteAddress = (req, resp, next) => {
  const id = req.params.id;

  Address.findByPk(id)
    .then(addr => {
      return addr.destroy();
    })
    .then(add => {
      resp.status(200).json({
        message:'Address deleted successfully'
      });
    })
    .catch(err => {
      resp.status(404).json({
        message:'Address deletion failed'
      })
    });
};
