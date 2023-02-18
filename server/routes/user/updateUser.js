const express = require('express');
const router = express.Router();
const updateUserService = require("../../service/user/updateUserService");

/* POST user. */
router.put('/', async function(req, res, next) {
  try {
    res.json(await updateUserService(req.body));
  } catch (err) {
    console.error(`Error: ${err.message}`);
    next(err);
  }
});

module.exports = router