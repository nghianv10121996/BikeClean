const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const getUserService = require("../../service/user/getUserService");

/* GET user. */
router.post('/', async function (req, res, next) {
  try {
    const user = await getUserService(req.body.phoneNumber);
    const isCorrectPW = await bcrypt.compare(req.body.password, user?.password);
    if (!user || !isCorrectPW) {
      return res.status(400).json({
        message: "Nhập mật khẩu hoặc số điện thoại chưa đúng"
      })
    }
    const token = jwt.sign({
      phoneNumber: req.body.phoneNumber
    }, 'supersecret', {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).json({
      user: user,
      token: token
    });
  } catch (error) {
    return res.status(400).json({
      message: "Nhập mật khẩu hoặc số điện thoại chưa đúng"
    })
  }
});

module.exports = router