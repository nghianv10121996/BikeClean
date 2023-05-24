const express = require('express');
const router = express.Router();
const deleteBookingService = require("../../service/booking/deleteBookingService");
const jwt = require('jsonwebtoken');
const moment = require("moment");

/* DELETE booking. */
router.delete('/booking', async function(req, res, next) {
  const token = req.header('authorization');
  console.log(req.query)
  jwt.verify(token.split(" ")[1], 'supersecret', async (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Đăng nhập không thành công.' });
    try {
      await deleteBookingService(req.query);
      res.status(200).json({
        status: 200,
        message: "Xóa Lịch thành công",
      })
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: "Xóa lịch thất bại",
      })
    }
  });
});

module.exports = router