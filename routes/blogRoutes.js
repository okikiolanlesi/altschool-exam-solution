const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authController = require("../controllers/authController");
const {
  validateCreateBlog,
  validateUpdateBlog,
} = require("../validators/blog.validator");
router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(
    authController.protect,
    validateCreateBlog,
    blogController.setAuthorId,
    blogController.createBlog
  );
router
  .route("/getMyBlogs")
  .get(authController.protect, blogController.getMyBlogs);
router
  .route("/:id")
  .get(blogController.getBlog)
  .patch(authController.protect, validateUpdateBlog, blogController.updateBlog)
  .delete(authController.protect, blogController.deleteBlog);

module.exports = router;
