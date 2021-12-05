const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

require("dotenv").config();

const userRoute = require("./routes/userRoute");
app.use(cors());
app.use(express.json());
app.use(userRoute);

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
