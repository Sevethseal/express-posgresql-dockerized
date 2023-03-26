const express = require("express");
const cookieParser = require("cookie-parser");
const bookRoutes = require("./routes/books");
const authRoute = require("./routes/authRoute");
const session = require("express-session");
const pool = require("./db");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(
  session({
    secret: "ABCDEFGHIJK",
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/login", authRoute);
app.use((req, res, next) => {
  next();
  // if (req.session.user) {
  //   next();
  // } else {
  //   res.status(401).send("Authentication Failed");
  // }
});
app.use("/api", bookRoutes);

app.listen(PORT, () => console.log(`application running in port ${PORT}`));
