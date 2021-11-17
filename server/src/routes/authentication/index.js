const express = require('express');

const router = express.Router();
router.post('/register', require('./register'));
router.post('/login', require('./login'));
router.post('/reddit', require('./redditOauth'));

module.exports = router;
