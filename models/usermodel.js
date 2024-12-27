const mongoose = require("mongoose");

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

module.exports = mongoose.model("User", userSchema);
