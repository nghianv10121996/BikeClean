const express = require('express');
const router = express.Router();
const deleteUserService = require("../../service/user/deleteUserService");

/* GET user. */
router.delete('/user/:userID', async function(req, res, next) {
  try {
    const response = await deleteUserService(req.params.userID);
    res.status(200).json({
      status: 200,
      message: "Xóa thành công"
    })
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(400).json({
      message: "Xóa thất bại"
    })
  }
});

module.exports = router