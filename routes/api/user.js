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

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

function getMySQLConnection() {
    return mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port     : '3307',
        database : 'ETES'
    });
}
router.get('/test', (req, res) => res.send({msg: 'User works'}));

router.post('/login', function(req, res){
    const email = req.body.email
    const password = req.body.password

    //var hash = bcrypt.hashSync(password, salt);

    connection = getMySQLConnection();
    connection.connect();
    connection.query('SELECT * FROM user WHERE email = ' + mysql.escape(email), function(err, rows, fields) {
        if(err){
            res.json({
                type: 'POST',
                loggedin: false
            });
        }
        else if(rows.length > 0) {
            if(bcrypt.compareSync(password, rows[0].password)){
                res.cookie('session', rows[0].id, {httpOnly: true});
                res.json({
                    type: 'POST',
                    id: rows[0].id,
                    email: rows[0].email,
                    password: rows[0].password,
                    loggedin: true
                });
            }
            else {
                res.json({
                    type: 'POST',
                    loggedin: false
                });
            }
        }
        else {
        res.json({
                type: 'POST',
                loggedin: false
            });
        }
    });

    connection.end();
});



router.post('/signup', function(req, res){
    const email = req.body.email;
    const password = req.body.password;
    var id = cryptoRandomString(20);
    var hash = bcrypt.hashSync(password, salt);
    connection = getMySQLConnection();
    connection.connect();
    connection.query('SELECT * FROM user WHERE email = ' + mysql.escape(email), function(err, rows, fields) {
        if (err) {
            res.json({
                type:'signup',
                email: email,
                success: false
            });
        }
        else if(rows.length > 0) {
            res.json({
                type:'signup',
                email: email,
                success: false
            });

        }
        else {
            connection.query('INSERT INTO user (id, email, password) VALUES (' + mysql.escape(id) + ', ' + mysql.escape(email) + ', ' + mysql.escape(hash) + ')', function(err, rows, fields) {
                if (err) {
                    res.json({
                        type:'signup',
                        email: email,
                        success: false
                    });
                }
                else {

                    res.cookie('session', id, {httpOnly: true});
                    res.json({
                        type: 'signup',
                        email: email,
                        success: true
                    });
                }
            });
        }



    });



    connection.end();
});

router.delete('/logout', function(req, res){
    res.clearCookie('session');
    res.json('Logged out');
})



module.exports = router;
