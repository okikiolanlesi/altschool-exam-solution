const joi = require("joi");
const AppError = require("../utils/appError");

const createBlogSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  state: joi.string().valid("draft", "published").optional(),
  body: joi.string().required().min(10).max(10000),
  tags: joi.array().items(joi.string()).length(10).optional(),
});

exports.validateCreateBlog = (req, res, next) => {
  const { error } = createBlogSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }
  next();
};

const updateBlogSchema = joi.object({
  title: joi.string().optional(),
  description: joi.string().optional(),
  state: joi.string().valid("draft", "published").optional(),
  body: joi.string().optional().min(10).max(10000),
  tags: joi.array().items(joi.string()).min(1).max(10).optional(),
});

exports.validateUpdateBlog = (req, res, next) => {
  const { error } = updateBlogSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }
  next();
};
