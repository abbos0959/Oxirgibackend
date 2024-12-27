const usermodel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const catchAsynchron = require("../utility/catchUtil");
const jwtToken = require("../utility/jwtToken");
const catchErrorAsync = require("../utility/catchUtil");
const { default: mongoose } = require("mongoose");
const AppError = require("../utility/appError");

const registerUser = catchAsynchron(async (req, res) => {
   try {
      const { email, password, firstname, lastname, mobile, profession, role } = req.body;
      const finduser = await usermodel.findOne({ email });
      const findusermobile = await usermodel.findOne({ mobile });

      if (finduser || findusermobile) {
         res.status(400).json({
            message: "bunday user allaqachon mavjud",
         });
      } else {
         const hashpassword = await bcrypt.hash(password, 10);
         const user = await usermodel.create({
            email,
            firstname,
            lastname,
            mobile,
            profession,
            role,
            password: hashpassword,
         });
         jwtToken(user, 200, res);
      }
   } catch (error) {
      res.status(404).json({
         message: error.message,
      });
   }
});

const loginUSer = catchErrorAsync(async (req, res) => {
   const { email, password } = req.body;
   const oldUser = await usermodel.findOne({ email });
   if (!oldUser) {
      return res.status(404).json({
         message: "parol yoki email xatoligi",
      });
   }

   const compareapssword = await bcrypt.compare(password, oldUser.password);

   if (!compareapssword) {
      return res.status(400).json({
         message: "Parol yoki email Xatodir",
      });
   }
   jwtToken(oldUser, 200, res);
});

const getAllUser = catchAsynchron(async (req, res) => {
   try {
      const alluser = await usermodel.find();

      res.status(200).json({
         count: alluser.length,
         success: true,
         alluser,
      });
   } catch (error) {
      res.status(404).json({
         success: false,
         message: error.message,
      });
   }
});

const UpdateUser = catchAsynchron(async (req, res, next) => {
   try {
      const id = req.params.id;
      const { role } = req.body;

      const checkid = new mongoose.Types.ObjectId(id);

      if (!checkid) {
         return res.status(404).json({
            message: "bunday id mavjud emas",
         });
      }
      if (role) {
         return res.status(404).json({
            message: "siz o'z rolingizni o'zgartira olmaysiz",
         });
      }

      const user = await usermodel.findByIdAndUpdate(id, req.body, { new: true });
      if (!user) {
         return res.status(400).json({
            message: "bunday user mavjud emas",
         });
      }
      res.status(200).json({
         message: "user yangilandi",
         user,
      });
   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
});

const UpdateUserprofile = catchAsynchron(async (req, res, next) => {
   try {
      const { _id } = req.user;
      const { role } = req.body;
      const checkid = new mongoose.Types.ObjectId(_id);

      if (!checkid) {
         return res.status(404).json({
            message: "bunday id mavjud emas",
         });
      }
      if (role) {
         return res.status(404).json({
            message: "siz o'z rolingizni o'zgartira olmaysiz",
         });
      }

      const user = await usermodel.findByIdAndUpdate(_id, req.body, { new: true });
      if (!user) {
         return res.status(400).json({
            message: "bunday user mavjud emas",
         });
      }
      res.status(200).json({
         message: "user yangilandi",
         user,
      });
   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
});

const deleteUser = catchAsynchron(async (req, res, next) => {
   try {
      const { id } = req.params;

      const checkid = new mongoose.Types.ObjectId(id);

      const user = await usermodel.findById(id);
      if (!user || !checkid) {
         return next(new AppError("bunday idli user mavjud emas", 404));
      } else {
         await usermodel.findByIdAndDelete(id);
         res.status(200).json({
            message: "user o'chirildi",
         });
      }
   } catch (error) {
      res.status(400).json({
         message: error.message,
      });
   }
});
module.exports = { registerUser, loginUSer, getAllUser, UpdateUser, UpdateUserprofile, deleteUser };
