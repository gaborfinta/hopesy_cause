const express = require('express');
const hello = require('./controllers/hello_world');

const router = express.Router();
router.get('/', hello);

module.exports = router;