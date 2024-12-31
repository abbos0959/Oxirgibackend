const jwt = require("jsonwebtoken");

const AppError = require("../utility/appError");
const usermodel = require("../models/usermodel");
const catchErrorAsync = require("../utility/catchUtil");
//token bor yoki  yo'qligini tekshirish
exports.Isauthentication = catchErrorAsync(async (req, res, next) => {
   const { token } = req.cookies;
   if (!token) {
      return next(new AppError("Iltimos avval Ro`yhatdan o`ting", 401));
   }
   const decodeData = jwt.verify(token, "secret");

   if (!decodeData) {
      return next(new AppError("bunday IDli user mavjud emas", 401));
   }
   req.user = await usermodel.findById(decodeData.id);

   next();
});

// role bo`yicha kirish
exports.role = (roles) => {
   return catchErrorAsync(async (req, res, next) => {
      // 1) User ni roleni olamiz databasedan, tekshiramiz
      if (!roles.includes(req.user.role)) {
         return next(new AppError("Siz bu amaliyotni bajarish huquqiga ega emassiz!", 401));
      }
      next();
   });
};
