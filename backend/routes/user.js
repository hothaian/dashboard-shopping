const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// notify if they are in the user API
router.get('/', userController.userAPI);
// Create a new user
router.post('/create', userController.createUser);
// Fetch all users
router.get('/all', userController.getAllUsers);



module.exports = router;
