const express = require('express');
const router = express.Router();
const changeStatusBookingService = require("../../service/booking/changeStatusBookingService");
const jwt = require('jsonwebtoken');
const moment = require("moment");

/* PUT booking. */
router.put('/booking/:bookingID', async function(req, res, next) {
  const token = req.header('authorization');
  console.log(req)
  console.log(req.query)
  jwt.verify(token.split(" ")[1], 'supersecret', async (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Đăng nhập không thành công.' });
    try {
      await changeStatusBookingService(req.body, req.params?.bookingID);
      res.status(200).json({
        status: 200,
        message: "Đổi trạng thái thành công",
      })
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: "Đổi trạng thái thất bại",
      })
    }
  });
});

module.exports = router