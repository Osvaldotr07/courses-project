const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "images" });
const userRouter = require("./router/user");
const ibmdb = require("ibm_db");
const connstr =
  "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-14.services.dal.bluemix.net;PORT=50001;PROTOCOL=TCPIP;UID=qks86401;PWD=0j2z3xk+rxg9hn5x;Security=SSL;";

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

app.post('/user-login',(req, res) => {
  const {
    email,
    password,
  } = req.body;

  ibmdb.open(connstr, (err, conn) => {
    if (err) {
      res.status(500).json({message: 'Error connection with db'})
    }
    else {
      conn.query(
        `SELECT * from QKS86401.USERS WHERE email='${email}'`,
        (err, data) => {
          if(err){
            res.json({ message: `Error in connection: ${err}` })
          }
          else{
            let dataJson = JSON.parse(JSON.stringify(data))
            if(dataJson[0].PASSWORD.trim() === password){
              res.status(201).json({ message: "Access correct", status: true,  data: dataJson })
            }
            else {
              res.status(403).json({message: 'Contraseña o usuario incorrecto'})
            }
          }
          ibmdb.close();
        }
      );
    }

  });
  
})

app.listen(8080, () => {
  console.log("Puerto conectado en el puerto 8080");
});
