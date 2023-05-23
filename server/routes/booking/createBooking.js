const express = require('express');
const router = express.Router();
const createBookingService = require("../../service/booking/createBookingService");
const getBookingService = require("../../service/booking/getBookingService");
const jwt = require('jsonwebtoken');
const moment = require("moment");

/* POST booking. */
router.post('/booking/:userID', async function(req, res, next) {
  const token = req.header('authorization');
  jwt.verify(token.split(" ")[1], 'supersecret', async (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Đăng nhập không thành công.' });
    const response = await getBookingService(req.body);
    const isExist = response.filter(i => i.userID === req.params?.userID);
    if(!!isExist[0]) {
      return res.status(400).json({
        status: 400,
        message: "Mỗi tài khoản chỉ được tạo 1 lần trong 1 khung giờ",
      });
    }
    if (response.length >= 2) {
        return res.status(400).json({
            status: 400,
            message: "Lịch đã đầy, vui lòng tạo giờ khác.",
        })
    }
    try {
      await createBookingService(req.body, req.params?.userID);
      res.status(200).json({
        status: 200,
        message: "Tạo lịch thành công",
      })
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: "Tạo lịch thất bại",
      })
    }
  });
});

module.exports = router