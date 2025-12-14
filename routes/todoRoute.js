const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');

const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');

const validate = require('../middleware/validate.js');
const{
    createTodoSchema,
    updateTodoSchema
} = require('../validations/todo.validation.js');

// routes
router.post('/', validate(createTodoSchema),createTodo);
router.get('/', getTodos);
router.get('/:id', getTodoById);
router.put('/:id', validate(updateTodoSchema),updateTodo);
router.delete('/:id', deleteTodo);

router.use(auth); //protect all routes below this middleware

module.exports = router;
