const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Create a new user
router.post('/create', userController.createUser);

// Fetch all users
router.get('/all', userController.getAllUsers);



module.exports = router;
