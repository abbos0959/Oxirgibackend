const express = require("express");
const {
   registerUser,
   loginUSer,
   getAllUser,
   UpdateUserprofile,
   UpdateUser,
   deleteUser,
   getAUser,
   blockUser,
   unblockUser,
   updatePassword,
} = require("../controller/userCtr");

const userRouter = express.Router();
const authoriseRoles = require("../middlewares/isAuth");

//  Post routerlar

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUSer);

// get Routerlar

userRouter.get(
   "/all",
   authoriseRoles.Isauthentication,

   authoriseRoles.role(["admin"]),
   getAllUser
);
userRouter.get("/:id", authoriseRoles.Isauthentication, getAUser);

// patch routerlar

userRouter.patch("/update-profile", authoriseRoles.Isauthentication, UpdateUserprofile);
userRouter.patch(
   "/update-user-profile/:id",
   authoriseRoles.Isauthentication,
   authoriseRoles.role(["admin"]),
   UpdateUser
);

userRouter.patch(
   "/block/:id",
   authoriseRoles.Isauthentication,
   authoriseRoles.role(["admin"]),
   blockUser
);
userRouter.patch(
   "/unblock/:id",
   authoriseRoles.Isauthentication,
   authoriseRoles.role(["admin"]),
   unblockUser
);

userRouter.patch("/update-password", authoriseRoles.Isauthentication, updatePassword);
//  delete routerlar
userRouter.delete(
   "/delete/:id",
   authoriseRoles.Isauthentication,
   authoriseRoles.role(["admin"]),
   deleteUser
);

module.exports = userRouter;
