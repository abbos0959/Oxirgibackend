const app = require("./middlewares/app");
require("dotenv").config({});
const colors = require("colors");

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () => {
   // eslint-disable-next-line no-undef
   console.log(colors.bold.bgBlue("server ishladi"), process.env.PORT, "portda");
});
