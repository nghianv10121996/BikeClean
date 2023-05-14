const express = require('express');
const router = express.Router();
const regiterUserService = require("../../service/user/registerUserService");
const bcrypt = require('bcryptjs');

/* POST user. */
router.post('/', async function(req, res, next) {
  const hashedPassword = await bcrypt.hash(req.body.password, 8);
  const params = {
    phoneNumber: req.body.phoneNumber,
    password: hashedPassword
  }
  try {
    res.json(await regiterUserService(params));
  } catch (err) {
    console.log(err)
    next(err);
  }
});

module.exports = router