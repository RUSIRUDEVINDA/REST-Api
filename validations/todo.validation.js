const Joi = require('joi');

exports.createTodoSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required(),

  completed: Joi.boolean()
});

exports.updateTodoSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  completed: Joi.boolean()
});
