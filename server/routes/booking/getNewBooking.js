const express = require('express');
const router = express.Router();
const getNewBookingService = require("../../service/booking/getNewBookingService");
const jwt = require('jsonwebtoken');
const moment = require("moment");

/* GET booking. */
router.get('/new-booking', async function(req, res, next) {
  const token = req.header('authorization');
  jwt.verify(token.split(" ")[1], 'supersecret', async (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Đăng nhập không thành công.' });
    try {
      const response = await getNewBookingService(req.query);
      res.status(200).json({
        status: 200,
        message: "lấy thông tin thành công",
        data: response
      })
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: "lấy thông tin thất bại",
      })
    }
  });
});

module.exports = router