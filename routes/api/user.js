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
        database : 'ETES',
        port : '3306'
    });
}
router.get('/test', (req, res) => res.send({msg: 'User works'}));
router.get('/search', function(req){

});




router.get('/login', function(req, res){
   // const email = req.body.email
    //const password = req.body.password
    const email = "qwerty@cd.com";
    const password = "123456";
    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);

    var hash = bcrypt.hashSync(password, salt);

    connection = getMySQLConnection();
    connection.connect();
    connection.query('SELECT * FROM user WHERE email = ' + mysql.escape(email), function(err, rows, fields) {
        if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        }
        else {
            // Check if the result is found or not
            if(rows.length > 0) {
                if (bcrypt.compareSync(password, rows[0].password,) == true) {
                    res.send({
                        type: 'POST',
                        id: rows[0].id,
                        email: rows[0].email,
                        password: rows[0].password,
                        loggedin: true
                    });
                }
                else {
                    res.send({
                        COMMET: 'wrong pw'
                    });
                    }





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



router.get('/signup', function(req, res){
   // const email = req.body.email
    //const password = req.body.password
    const email = "qwerty@qw.com";
    const password = "123456";
    var id = cryptoRandomString(20);
    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    connection = getMySQLConnection();
    connection.connect();
    var isEmailExisted = false;


    connection.query('SELECT * FROM user WHERE email = ' + mysql.escape(email) , function(err, rows, fields) {



        if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        }
        else {
            // Check if the result is found or not
            if(rows.length > 0) {
                res.send({
                    COMMET: 'email is already existed, should redirect to login page'
                });
            }
            else {

                isEmailExisted = true;
                res.send({
                    COMMET: 'login page'
                });


            }
        }
    });
    connection.end();
    connection = getMySQLConnection();
    connection.connect();
    if (isEmailExisted == true) {
        connection.query("INSERT INTO user (ID, email, password) VALUES (121,22,32)", function(err, rows, fields) {
            if (err) {
                res.status(500).json({"status_code": 500,"status_message": "internal server error2"});
            }
            else {
                res.send({
                    type: 'GET',
                    success: true
                });
            }
        });
    }


    connection.end();
});

module.exports = router;