const app = require("./middleware/app");
const connectDb = require("./config/db");
const env = require("dotenv").config();
connectDb();
app.listen(process.env.PORT, () => {
  console.log("Server running on", process.env.PORT || 3000);
});
