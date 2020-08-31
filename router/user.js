var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "images" });
const ibmdb = require("ibm_db");
const connstr =
  "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-14.services.dal.bluemix.net;PORT=50001;PROTOCOL=TCPIP;UID=qks86401;PWD=0j2z3xk+rxg9hn5x;Security=SSL;";


router.get('/courses', (rew, res) => {
  ibmdb.open(connstr, (err, conn) => {
    if (err) return console.log("error in connection: ", err);

    conn.query(
      `SELECT * FROM QKS86401.CURSOS`,
      (err, data) => {
        err
          ? res.json({ message: `Error in connection: ${err}` })
          : res.json({ message: "New user inserted", data });
        ibmdb.close();
        conn.close()
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
          conn.close()
        }
      );
    });
  }
});

module.exports = router;
