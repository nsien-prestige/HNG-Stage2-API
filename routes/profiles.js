const express = require('express');
const { getAllProfiles } = require('../controllers/profilesController');

const router = express.Router();

// router.get('/search')
router.get('/', getAllProfiles)

module.exports = router
