const Todo = require('../models/Todo');

// CREATE TODO
exports.createTodo = async (req, res, next) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      owner: req.userId
    });

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

// GET USER TODOS
exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ owner: req.userId });
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

// GET TODO BY ID

exports.getTodoById = async(req,res,next)=>{
    try{
        const todo = await Todo.findById(req.params.id)
        res.status(200).json({message:'Todo found',todo});
    }catch(error){
        next(error).json({message:'Error retrieving todo',err:error.message})
    }

}

// UPDATE TODO
exports.updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      req.body,
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
};

// DELETE TODO
exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      owner: req.userId
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted' });
  } catch (error) {
    next(error);
  }
};
