const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const MONGODB_URI = process.env.DB_URI;

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

// Auth Routes
const authRoutes = require("./routes/auth/auth.routes");
const homeRoutes = require("./routes/home/home.routes");
const mainRoutes = require("./routes/main/main.routes");
const adminRoutes = require("./routes/admin/admin.routes");
const errorRoutes = require("./routes/error/error.routes");
const setLocals = require("./middleware/setLocals");
const setAuth = require("./middleware/setAuth");
const { getFriend } = require("./middleware/cronJobs");
const blocker = require("./middleware/blocker");

app.set("view engine", "ejs");
app.set("views", "views");

// app.use(helmet());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "c13c68ed634cd9e0fbdbbdcc80c81b656fc335e3e54f1b234d2d95a24a86191d",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(cookieParser());
app.use(flash());
app.use(csrf());

app.use(setAuth);

app.use(setLocals);

app.use(blocker);

app.get("/are-you-there", (req, res, next) => {
  res.send("Yes");
});

// auth
app.use(authRoutes);

// home
app.use(homeRoutes);

// main
app.use(mainRoutes);

// admin
app.use(adminRoutes);

// error
app.use(errorRoutes);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(process.env.PORT);
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });
