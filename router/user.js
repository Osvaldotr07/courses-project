var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "images" });
const ibmdb = require("ibm_db");
const connstr =
  "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-14.services.dal.bluemix.net;PORT=50001;PROTOCOL=TCPIP;UID=qks86401;PWD=0j2z3xk+rxg9hn5x;Security=SSL;";



router.post('/login', upload.single(),(req, res) => {
  console.log(req.body);
  const {
    email,
    password,
  } = req.body;

  ibmdb.open(connstr, (err, conn) => {
    if (err) return console.log("error in connection: ", err);

    conn.query(
      `SELECT * from QKS86401.USERS WHERE email='${email}'`,
      (err, data) => {
        if(err){
          res.json({ message: `Error in connection: ${err}` })
        }
        else{
          let dataJson = JSON.parse(JSON.stringify(data))
          console.log(dataJson[0].PASSWORD.trim().length)
          if(dataJson[0].PASSWORD.trim() === password){
            res.status(201).json({ message: "Access correct", status: true });
          }
          else {
            res.status(403).json({message: 'Contraseña o usuario incorrecto'})
          }
        }
        ibmdb.close();
      }
    );
  });
  
})
/* GET users listing. */
router.post("/newUser", upload.single(), function (req, res) {
  console.log(req.body);
  const {
    id_random = Math.floor(Math.random() * 36000000),
    nombre,
    apellidos,
    email,
    numero,
    username,
    password,
  } = req.body;

  let regexp_password = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
  if(regexp_password.exec(password)!== null){
    res.status(405).json({message: 'La contraseña debera de tener mas de 8 caracteres'})
  }
  else {
    ibmdb.open(connstr, (err, conn) => {
      if (err) return console.log("error in connection: ", err);
  
      conn.query(
        `INSERT INTO QKS86401.USERS VALUES (${id_random}, '${nombre}', '${apellidos}', '${email}', '${numero}', '${username}', '${password}')`,
        (err, data) => {
          err
            ? res.json({ message: `Error in connection: ${err}` })
            : res.json({ message: "New user inserted" });
          ibmdb.close();
        }
      );
    });
  }
});

module.exports = router;
