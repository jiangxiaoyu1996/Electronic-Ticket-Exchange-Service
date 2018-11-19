const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cryptoRandomString = require('crypto-random-string');
const bcrypt = require('bcryptjs');
const salt = require('../../server.js').salt;
const cookieParser = require('cookie-parser');

//@route GET api/user/test
//@desc Test user routeb
//@access Public
router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port     : '3307',
        database : 'ETES'
});

var authenticate = function(req, res, next){
    var id = req.cookies['session']
    if(typeof id !== undefined){
        connection.query("SELECT * FROM user WHERE id = '" + id + "'", function(err, rows, fields){
            if(err){
                res.json({
                    type: 'authenticate',
                    result: false
                })
            }
            else if (rows <= 0){
                res.json({
                    type: 'authenticate',
                    result: false
                })
            }
            else{
                req.user = {
                    username : rows[0].username,
                    email : rows[0].email
                }
                next()
            }
        })
    }
    else{
        res.json({
            type: 'authenticate',
            result: false
        })
    }
}

router.get('/test', (req, res) => res.send({msg: 'User works'}));


router.post('/updateAddress', authenticate, function(req, res){
    const address = req.body.address
    connection.query('UPDATE user SET address = ' + mysql.escape(address) + "WHERE id = '" + req.cookies['session'] + "'", function(err, rows, fields){
        if(err){
            res.json({
                type: 'updateAddress',
                result: false
            })
        }
        else{
            res.json({
                type: 'updateAddress',
                result: true
            })
        }
    })
})

router.post('/updateUsername', authenticate, function(req, res){
    const username = req.body.username
    connection.query('UPDATE user SET username = ' + mysql.escape(username) + "WHERE id = '" + req.cookies['session'] + "'", function(err, rows, fields){
        if(err){
            res.json({
                type: 'updateUsername',
                result: false
            })
        }
        else{
            res.json({
                type: 'updateUsername',
                result: true
            })
        }
    })
})


router.post('/login', function(req, res){
    const email = req.body.email
    const password = req.body.password

    var hash = bcrypt.hashSync(password, salt);
    connection.query('SELECT * FROM user WHERE email = ' + mysql.escape(email), function(err, rows, fields) {
        if(err){
            res.json({
                type: 'POST',
                loggedin: false
            });
        }
        else if(rows.length > 0) {
            if(bcrypt.compareSync(password, rows[0].password)){
                res.cookie('session', rows[0].id, {httpOnly: true, encode: String});
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
});

router.post('/signup', function(req, res){
    const email = req.body.email;
    const password = req.body.password;
    var id = cryptoRandomString(20);
    var hash = bcrypt.hashSync(password, salt);
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

                    res.cookie('session', id, {httpOnly: true, encode: String});
                    res.json({
                        type: 'signup',
                        email: email,
                        success: true
                    });
                }
            });
        }
    });
});

router.delete('/logout', function(req, res){
    res.clearCookie('session');
    res.json('Logged out');
})

module.exports = router;
