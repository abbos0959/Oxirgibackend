const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
   {
      firstname: {
         type: String,
         required: true,
      },
      lastname: {
         type: String,
         required: true,
      },
      user_image: {
         type: String,
         default:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAEEsRlRZm43yeGkcOCGhOOhnXEmpmc-E58QPinoVBrcohVqKOT_3B5whs00AebvAnodM&usqp=CAU",
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      mobile: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
         select: false,
      },
      role: {
         type: String,
         enum: ["user", "admin", "instructor"],
         default: "user",
      },

      isblocked: {
         type: Boolean,
         default: false,
      },
      profession: {
         type: String,
         required: true,
      },

      stripe_accaunt_id: String,
      stripe_seller: {},
      stripeSession: {},

      passwordChangedAt: Date,
      passwordResetToken: String,
      passwordResetExpires: Date,
   },
   {
      timestamps: true,
   },
   {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
   }
);

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
      return next();
   }
   const hashPassword = await bcrypt.hash(this.password, 12);
   this.password = hashPassword;
   next();
});

userSchema.methods.createPasswordResetToken = async function () {
   const resetToken = crypto.randomBytes(32).toString("hex");
   this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

   this.passwordResetExpires = Date.now() + 30 * 60 * 1000;
   return resetToken;
};

module.exports = mongoose.model("User", userSchema);
