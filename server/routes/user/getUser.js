const express = require('express');
const router = express.Router();
const getUserService = require("../../service/user/getUserService");

/* GET user. */
router.get('/account/:userID', async function(req, res, next) {
  try {
    res.json(await getUserService(req.params.userID));
  } catch (err) {
    console.error(`Error: ${err.message}`);
    next(err);
  }
});

module.exports = router