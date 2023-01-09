const joi = require("joi");
const AppError = require("../utils/appError");

const createUserSchema = joi.object({
  first_name: joi.string().required().max(20),
  last_name: joi.string().required().max(20),
  email: joi
    .string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }),
  password: joi.string().required().min(8),
  passwordConfirm: joi.string().required().valid(joi.ref("password")),
});

exports.validateCreateUser = (req, res, next) => {
  const { error } = createUserSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }
  next();
};

const updateUserSchema = joi.object({
  first_name: joi.string().optional().max(20),
  last_name: joi.string().optional().max(20),
});

exports.validateUpdateUser = (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }
  next();
};

const changePasswordSchema = joi.object({
  password: joi.string().required().min(8),
  passwordConfirm: joi.string().required().valid(joi.ref("password")),
});

exports.validateChangePassword = (req, res, next) => {
  const { error } = changePasswordSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }
  next();
};

const loginSchema = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
    .required(),
  password: joi.string().required(),
});

exports.validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }
  next();
};
