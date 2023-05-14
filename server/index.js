const express = require("express");
const methodOverride = require('method-override')
const app = express();
const port = 3000;
const registerUserRoutes = require("./routes/user/registerUser");
const authenticateUser = require("./routes/user/authenticateUser");
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

app.use("/user/register", registerUserRoutes);
app.use("/user/authenticate", authenticateUser);
app.get("/user/:userID", getUserRoutes);
app.use("/user", updateUserRoutes);
app.delete("/user/:userID", deleteUserRoutes);
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});