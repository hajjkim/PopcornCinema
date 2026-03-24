const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "popcorn_cinema_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

// truyền user sang toàn bộ view
app.use((req, res, next) => {
  res.locals.sessionUser = req.session.user || null;
  next();
});

// routes
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

const authRouter = require("./routes/auth.route");
app.use("/auth", authRouter);

const movieRouter = require("./routes/movie.route");
app.use("/movie", movieRouter);

const promotionRoute = require("./routes/promotion.route");
app.use("/promotion", promotionRoute);

const bookingRoute = require("./routes/booking.route");
app.use("/booking", bookingRoute);

const adminRoute = require("./routes/admin.route");
app.use("/admin", adminRoute);

const userRouter = require("./routes/user.route");
app.use("/", userRouter);

module.exports = app;