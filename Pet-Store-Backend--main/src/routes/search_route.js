

// Import the required modules
const express = require('express');
const searchController = require("../controllers/searchController");


const router = express.Router();
// Routes
router.get('/search', searchController.searchPets);

module.exports = router;