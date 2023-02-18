const express = require("express");
const methodOverride = require('method-override')
const app = express();
const port = 3000;
const registerUserRoutes = require("./routes/user/registerUser");
const getUserRoutes = require("./routes/user/getUser");
const updateUserRoutes = require("./routes/user/updateUser");
const deleteUserRoutes = require("./routes/user/deleteUser");
function errorHandler (err, req, res, next) {
  throw new Error(err)
}

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/register", registerUserRoutes);
app.get("/account/:userID", getUserRoutes);
app.use("/account", updateUserRoutes);
app.delete("/account/:userID", deleteUserRoutes);
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});