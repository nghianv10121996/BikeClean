const express = require('express');
const router = express.Router();
const getMemberService = require("../../service/member/getMemberService");
const jwt = require('jsonwebtoken');

/* GET user. */
router.get('/member', async function(req, res, next) {
  const token = req.header('authorization');
  jwt.verify(token.split(" ")[1], 'supersecret', async (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Đăng nhập không thành công.' });
    try {
      const member = await getMemberService();
      res.status(200).json({
        message: "Đăng nhập thành công",
        members: member
      })
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: "Đăng nhập thất bại"
      })
    }
  });
});

module.exports = router