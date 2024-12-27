const express = require("express");
const {
   registerUser,
   loginUSer,
   getAllUser,
   UpdateUserprofile,
   UpdateUser,
   deleteUser,
} = require("../controller/userCtr");

const userRouter = express.Router();
const authoriseRoles = require("../middlewares/isAuth");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUSer);
userRouter.get(
   "/all",
   authoriseRoles.Isauthentication,

   authoriseRoles.role(["admin"]),
   getAllUser
);

userRouter.patch("/update-profile", authoriseRoles.Isauthentication, UpdateUserprofile);
userRouter.patch(
   "/update-user-profile/:id",
   authoriseRoles.Isauthentication,
   authoriseRoles.role(["admin"]),
   UpdateUser
);
userRouter.delete(
   "/delete/:id",
   authoriseRoles.Isauthentication,
   authoriseRoles.role(["admin"]),
   deleteUser
);

module.exports = userRouter;
