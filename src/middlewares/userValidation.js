const Joi = require('joi');

const schemaCreateUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .required(),
  // password: Joi.string().min(6).max(18).required(),
  firstName: Joi.string().alphanum().min(2).required(),
  lastName: Joi.string().alphanum().min(2).required(),
});

const schemaCredentialsUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .required(),
  password: Joi.string().min(6).max(18).required(),
});

module.exports = {
  schemaCreateUser,
  schemaCredentialsUser,
};