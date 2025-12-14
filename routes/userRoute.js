const express = require('express');
const router = express.Router(); // const router is used to create modular route handlers
const userController = require('../controllers/userController.js')
const auth = require('../middleware/auth.js');

// PROTECTED USER ROUTES (JWT REQUIRED)

// Get logged-in user's profile
router.get('/me', auth, userController.getProfile);

// Update logged-in user's profile
router.put('/me', auth, userController.updateProfile);

// Delete logged-in user's account
router.delete('/me', auth, userController.deleteProfile);

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