const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config({});

const database = async () => {
   try {
      await mongoose.connect(process.env.DB_URL);
      console.log(colors.underline.bold.bgYellow("databasaga ulandi"));
   } catch (error) {
      console.log(colors.underline.bold.bgRed("databasaga ulanmadi"), error);
   }
};
module.exports = database;
