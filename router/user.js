var express = require("express");
var router = express.Router();
const ibmdb = require("ibm_db");
const connstr =
  "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-14.services.dal.bluemix.net;PORT=50001;PROTOCOL=TCPIP;UID=qks86401;PWD=0j2z3xk+rxg9hn5x;Security=SSL;";

/* GET users listing. */
router.post("/newUser", function (req, res) {
  const {
    id_random = Math.floor(Math.random() * 36000000),
    nombre,
    apellidos,
    username,
    password,
  } = req.body;

  ibmdb.open(connstr, (err, conn) => {
    if (err) return console.log("error in connection: ", err);

    conn.query(
      `INSERT INTO QKS86401.USERS (id_random, nombre, apellidos, username, password) VALUES ('${id_random}', '${nombre}', '${apellidos}', '${username}', '${password}')`,
      (err, data) => {
        err
          ? res.json({ message: `Error in connection: ${err}` })
          : res.json({ message: "New user inserted" });
        ibmdb.close();
      }
    );
  });
});

module.exports = router;
