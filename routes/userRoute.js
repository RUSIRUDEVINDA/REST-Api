const express = require('express');
const router = express.Router(); // const router is used to create modular route handlers
const userController = require('../controllers/userController.js')

// Define routes and link to controller functions

// POST /api/users        -> create user
router.post('/',userController.createUser);

// GET /api/users         -> list users
router.get('/',userController.getUsers);

// GET /api/users/:id     -> get user by id
router.get('/:id',userController.getUserById)

// PUT /api/users/:id -> update user
router.put('/:id',userController.updateUser);

// DELETE /api/users/:id  -> delete user
router.delete('/:id',userController.deleteuser);

module.exports = router;