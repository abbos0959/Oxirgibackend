const express = require("express");
const database = require("../db/database");
const userRouter = require("../routers/user.router");
const cookieparser = require("cookie-parser");
const errorHandler = require("../controller/errorHandler");
const app = express();

database();

app.use(express.json({}));
app.use(cookieparser());

app.use("/api/v1/user", userRouter);

app.all("*", (req, res, next) => {
   res.status(404).json({
      message: `Bunday url  ${req.originalUrl} mavjud emas`,
   });
   next();
});
app.use(errorHandler);
module.exports = app;
