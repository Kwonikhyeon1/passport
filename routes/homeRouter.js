const express = require('express');
const router = express.Router();
const homeService = require('../lib/service/homeService');

    router.get('/', (req, res) => {

        homeService.home(req, res);
    })

module.exports = router;