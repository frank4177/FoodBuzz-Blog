const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const categoriesRoute = require("./routes/categories");
const cors = require("cors");


dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to MongoDB"))
  .catch((err) => console.log(err));

//cors permits
const corsOptions = {
  origin: "https://foodbuzz.herokuapp.com/api/",
  credentials: true,
  origin: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", categoriesRoute);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});


app.listen(process.env.PORT || "5000", () => {
  console.log("Backend is running");
});
