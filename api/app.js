const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

require("dotenv").config();

const userRoute = require("./routes/userRoute");
const friendRequestRoute = require("./routes/friendRequestRoute");
const notificationRoute = require("./routes/notificationRoute");

app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(friendRequestRoute);
app.use("/noti", notificationRoute);

const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECT_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED TO MONGODB");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
