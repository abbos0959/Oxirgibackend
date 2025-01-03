const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var courseSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true,
   },
   email: {
      type: String,
      required: true,
   },
   mobile: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
});

//Export the model
module.exports = mongoose.model("User", courseSchema);
