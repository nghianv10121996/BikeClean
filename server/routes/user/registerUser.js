const express = require('express');
const router = express.Router();
const regiterUserService = require("../../service/user/registerUserService");

/* POST user. */
router.post('/', async function(req, res, next) {
  try {
    res.json(await regiterUserService(req.body));
  } catch (err) {
    console.error(`Error: ${err.message}`);
    next(err);
  }
});

module.exports = router