const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cryptoRandomString = require('crypto-random-string');


//@route GET api/user/test
//@desc Test user route
//@access Public
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

function getMySQLConnection() {
    return mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'ETES'
    });
}
router.get('/test', (req, res) => res.send({msg: 'User works'}));

router.post('/login', function(req, res){
    const email = req.body.email
    const password = req.body.password
    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    connection = getMySQLConnection();
    connection.connect();
    connection.query('SELECT * FROM user WHERE email = ' + mysql.escape(email) + ' AND password = ' + mysql.escape(hash), function(err, rows, fields) {
        if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        }
        else {
            // Check if the result is found or not
            if(rows.length > 0) {
                res.send({
                    type: 'POST',
                    id: rows[0].id,
                    email: rows[0].email,
                    password: rows[0].password,
                    loggedin: true
                });
            }
            else {
                //Send back data provided, say wrong pass or id
                res.send({
                    type: 'POST',
                    email: email,
                    password: hash,
                    loggedin: false
                });
            }
        }
    });

    connection.end();
});



router.post('/signup', function(req, res){
   // const email = req.body.email
    //const password = req.body.password
    const email = req.body.email;
    const password = req.body.password;
    var id = cryptoRandomString(20);
    connection = getMySQLConnection();
    connection.connect();
    connection.query('INSERT INTO user (id, email, password) VALUES (' + mysql.escape(id) + ', ' + mysql.escape(email) + ', ' + mysql.escape(password) + ')', function(err, rows, fields) {
        if (err) {
            res.send({
            	type:'signup',
            	success: false
            });
        }
        else {
            res.send({
                type: 'signup',
                success: true
            });
        }
    });

    connection.end();
});

module.exports = router;