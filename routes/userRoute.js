const express = require('express');
const router = express.Router(); // const router is used to create modular route handlers
const userController = require('../controllers/userController.js')

// Define routes and link to controller functions

// POST /api/users        -> create user
router.post('/User',userController.createUser);

// GET /api/users         -> list users
router.get('/User',userController.getUsers);

// GET /api/users/:id     -> get user by id
router.get('/User/:id',userController.getUserById)

// PUT /api/users/:id -> update user
router.put('/User/:id',userController.updateUser);

// DELETE /api/users/:id  -> delete user
router.delete('/User/:id',userController.deleteuser);

module.exports = router;