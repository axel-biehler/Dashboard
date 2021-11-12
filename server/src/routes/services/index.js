const express = require('express');

const router = express.Router();
router.get('/', require('./listServices'));

module.exports = router;
