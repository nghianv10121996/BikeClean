const express = require('express');
const router = express.Router();
const updateUserService = require("../../service/user/updateUserService");
const jwt = require('jsonwebtoken');

/* POST user. */
router.put('/user/:userID', async function(req, res, next) {
  const token = req.header('authorization');
  jwt.verify(token.split(" ")[1], 'supersecret', async (err, decoded) => {
    if (err) return res.status(500).send({ message: 'lỗi token.' });
    try {
      const response = await updateUserService(req.body, req.params.userID);
      console.log(response, "response")
      res.status(200).json({
        message: "Cập nhật thành công"
      })
    } catch (err) {
      console.log(err)
      res.status(400).json({
        message: "Cập nhật thất bại."
      })
    }
  });
});

module.exports = router