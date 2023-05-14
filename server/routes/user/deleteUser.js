const express = require('express');
const router = express.Router();
const deleteUserService = require("../../service/user/deleteUserService");

/* GET user. */
router.delete('/user/:userID', async function(req, res, next) {
  try {
    res.json(await deleteUserService(req.params.userID));
  } catch (err) {
    console.error(`Error: ${err.message}`);
    next(err);
  }
});

module.exports = router