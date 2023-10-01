var express = require('express');
const router = express.Router();

const userController = require('../controller/userController')

const authMiddleware = require('../middleware/auth');

router.get('/users', userController.getAllUsers)

router.post('/users/register', userController.register)

router.post('/users/login', userController.login)

module.exports = router;
