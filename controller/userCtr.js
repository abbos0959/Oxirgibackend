const usermodel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const catchAsynchron = require("../utility/catchUtil");
const jwtToken = require("../utility/jwtToken");
const catchErrorAsync = require("../utility/catchUtil");
const { default: mongoose } = require("mongoose");
const AppError = require("../utility/appError");
const sendEmail = require("../utility/sendEmail");

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
         const user = await usermodel.create({
            email,
            firstname,
            lastname,
            mobile,
            profession,
            role,
            password,
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
   const oldUser = await usermodel.findOne({ email }).select("+password");
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

const getAUser = catchAsynchron(async (req, res, next) => {
   try {
      const { id } = req.params;
      const checkUser = new mongoose.Types.ObjectId(id);

      const user = await usermodel.findById(id);

      if (!checkUser || !user) {
         return next(new AppError("bunday user mavjud emas", 404));
      }
      res.status(200).json({
         success: true,
         user,
      });
   } catch (error) {
      res.statu(400).json({
         message: error.message,
      });
   }
});

const blockUser = catchAsynchron(async (req, res, next) => {
   try {
      const { id } = req.params;

      const checkId = new mongoose.Types.ObjectId(id);
      if (!checkId) {
         return next(new AppError("bunday id mavjud emas", 404));
      }
      const userblocked = await usermodel.findByIdAndUpdate(id, { isblocked: true }, { new: true });
      res.status(200).json({
         success: true,
         userblocked,
      });
   } catch (error) {
      res.status(404).json({
         message: error.message,
      });
   }
});
const unblockUser = catchAsynchron(async (req, res, next) => {
   try {
      const { id } = req.params;

      const checkId = new mongoose.Types.ObjectId(id);
      if (!checkId) {
         return next(new AppError("bunday id mavjud emas", 404));
      }
      const userUnblocked = await usermodel.findByIdAndUpdate(
         id,
         { isblocked: false },
         { new: true }
      );
      res.status(200).json({
         success: true,
         userUnblocked,
      });
   } catch (error) {
      res.status(404).json({
         message: error.message,
      });
   }
});

const updatePassword = catchAsynchron(async (req, res, next) => {
   try {
      const { _id } = req.user;

      const { password, newPassword } = req.body;

      if (password === newPassword) {
         return next(new AppError("Yangi parol eskisi bilan bir xil bo'lmasligi kerak", 400));
      }

      const user = await usermodel.findById(_id).select("+password");
      if (!user) {
         return next(new AppError("bunday foydalanuvchi topilmadi", 404));
      }

      if (!(await bcrypt.compare(password, user.password))) {
         return next(new AppError("eski parolni xato kiritdingiz", 404));
      }

      user.password = req.body.newPassword;
      await user.save();
      res.status(200).json({
         success: true,
         message: "parol yangilandi",
      });
   } catch (error) {
      res.status(400).json({
         message: error.message,
      });
   }
});

// const forgotPasswordToken = catchAsynchron(async (req, res, next) => {
//    try {
//       const { email } = req.body;

//       const user = await usermodel.findOne({ email });

//       if (!user) {
//          return next(new AppError("bunday email user mavjud emas", 404));
//       }

//       const token = await usermodel.createPasswordResetToken();
//       await user.save();
//       const resetLink = `http://localhost:4000/api/user/reset-password/${token}`;
//       res.status(200).json(resetLink);
//    } catch (error) {
//       res.status(400).json({
//          message: error.message,
//       });
//    }
// });
const forgotPasswordToken = async (req, res) => {
   try {
      const user = await usermodel.findOne({ email: req.body.email }).select("+password");
      console.log(user);

      if (!user) {
         return res.status(404).json({
            success: false,
            message: "bunday user mavjud emas",
         });
      }

      const resetPasswordToken = await user.createPasswordResetToken();

      console.log(resetPasswordToken);
      await user.save();

      const resetPasswordUrl = `${req.protocol}://${req.get(
         "host"
      )}/api/v1/user/reset-password/${resetPasswordToken}`;

      const message = `sizning  parolingiz  tiklash tokeni ${resetPasswordUrl}`;

      try {
         await sendEmail({
            email: user.email,
            subject: "parolingizni tiklash tokeni",
            message,
         });
         res.status(200).json({
            message: "emailga token yuborildi",
         });
      } catch (error) {
         (user.passwordResetToken = undefined), (user.passwordResetExpires = undefined);
         await user.save({ validateBeforeSave: false });
         res.status(500).json({
            success: false,
            message: error.message,
         });
      }
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

const resetPassword = async (req, res) => {
   try {
      const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

      //token bo'yicha userni qidirib topish
      const user = await usermodel
         .findOne({
            passwordResetToken: resetPasswordToken,
            passwordResetExpires: { $gt: Date.now() },
         })
         .select("+password");

      if (!user) {
         return res.status(404).json({
            success: false,
            message: "token Xatolik mavjud",
         });
      }
      // parolni o'zgartirish

      // const hashPassword1 = await bcrypt.hash(req.body.password, 12);
      user.password = req.body.password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      await user.save();
      res.status(200).json({
         success: true,
         message: "parol yangilandi",
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

module.exports = {
   getAUser,
   registerUser,
   loginUSer,
   unblockUser,
   blockUser,
   getAllUser,
   UpdateUser,
   UpdateUserprofile,
   deleteUser,
   updatePassword,
   forgotPasswordToken,
   resetPassword,
};
