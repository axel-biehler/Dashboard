const express = require('express');

const router = express.Router();

router.patch('/patch', require('./updateProfile'));
router.patch('/password', require('./updatePassword'));
router.get('/get', require('./getProfile'));

module.exports = router;
