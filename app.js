const express = require("express");
const app = express();
const path = require("path");
const userRouter = require("./router/user");

app.use(express.json());
app.use(express.urlencoded({ extend: false }));
app.use(express.static(path.join(__dirname, "assets")));

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/views/register.html");
});

app.get("/classes", (req, res) => {
  console.log("Hello");
  res.sendFile(__dirname + "/views/classes.html");
});

app.get("/login", (req, res) => {
  console.log("Hello");
  res.sendFile(__dirname + "/views/login.html");
});

app.listen(3000, () => {
  console.log("Puerto conectado en el puerto 8080");
});
