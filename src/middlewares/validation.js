const statusCode = require('../helpers/constants');

const validate = shema => {
  return (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return next({
        status: statusCode.BAD_REQUEST,
        message: 'missing fields',
      });
    }
    const { error } = shema.validate(req.body);
    if (error) {
      const [{ message }] = error.details;
      return next({
        status: statusCode.BAD_REQUEST,
        message: `${message.replace(/"/g, '')}`,
      });
    }
    next();
  };
};

module.exports = { validate };