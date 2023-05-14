const express = require('express');
const router = express.Router();
const getUserService = require("../../service/user/getUserService");
const jwt = require('jsonwebtoken');

/* GET user. */
router.get('/user/:phoneNumber', async function(req, res, next) {
  const token = req.header('authorization');
  jwt.verify(token.split(" ")[1], 'supersecret', async (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Đăng nhập không thành công.' });
    try {
      res.json({
        message: "Đăng nhập thành công"
      })
    } catch (err) {
      // console.error(`Error: ${err}`);
      next(err);
    }
  });
});

module.exports = router