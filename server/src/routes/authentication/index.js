const express = require('express');

const router = express.Router();
router.post('/register', require('./register'));
router.post('/login', require('./login'));
router.post('/reddit/login', require('./redditLogin'));
router.get('/verifyEmail/:token', require('./verifyEmail'));

module.exports = router;
