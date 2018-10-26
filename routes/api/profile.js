const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');
var user = require('./user')

//@route GET api/profile/test
//@desc Test profile route
//@access Public
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/test', (req, res) => res.json({msg: 'Profile works'}));

function getMySQLConnection() {
    return mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port     : '3307',
        database : 'ETES'
    });
}



router.post('/', function(req, res){
	connection = getMySQLConnection();
	connection.connect();
	var email = req.body.email
	var username = req.body.username
	connection.query('SELECT * FROM ticket WHERE buyer = ' + mysql.escape(email) + ' OR buyer = ' + mysql.escape(username) + ' OR seller = ' + mysql.escape(email) + 'OR seller = ' + mysql.escape(username), function(err, rows, fields){
		if(err){
			res.json({
					type: 'profile',
					result: false
				})
		}
		else{
			connection.query('SELECT * FROM user WHERE email = ' + mysql.escape(email) + 'AND username = ' + mysql.escape(username), function(err, userProfile, fields){
				if(err){
					res.json({
						type: 'profile',
						result: false
					});
				}
				else{
					res.json({
						type: 'profile',
						purchaseInfo: rows,
						userInfo: userProfile,
						result: true
					});
				}
				connection.end();
			});
		}
	});
});

module.exports = router;