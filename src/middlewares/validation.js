const Joi = require('joi');

// Створення схеми JOI для валідації користувача
const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  age: Joi.number().positive().required()
});

exports.validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    // Якщо є помилка валідації, повертаємо 400 та повідомлення про помилку
    return res.status(400).json({ message: error.details[0].message });
  }

  // Якщо валідація пройшла успішно, переходимо до наступного middleware
  next();
};
