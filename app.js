const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
const globalErrorHandler = require("./utils/globalErrorHandler");
const AppError = require("./utils/AppError");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const app = express();

// Middleware

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});

app.use("/api", limiter);

app.use(
  hpp({
    whitelist: ["tags", "author", "state", "timestamp"],
  })
);

app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler); // Error handling middleware;

module.exports = app;
