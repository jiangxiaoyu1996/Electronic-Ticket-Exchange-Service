const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');
var user = require('./user')
const cookieParser = require('cookie-parser');

//@route GET api/profile/test
//@desc Test profile route
//@access Public
router.use(cookieParser);
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

var authenticate = function(req, res, next){
	if(req.cookies.name != null){
		next()
	}
	res.json({
		type: 'authenticate',
		result: false
	})
}


function getEmail(id){
	connection.query()
}


router.get('/', function(req, res){
	var id = req.cookie.session
	var email
	connection = getMySQLConnection();
	connection.connect();
	connection.query('SELECT * FROM user WHERE id = ' + mysql.escape(id), function(err, userProfile, fields){
		if(err){
			res.json({
					type: 'profile',
					result: false
				})
		}
		else if (row.length < 0){
			res.json({
					type: 'profile',
					result: false
				})
		}
		else{
			email = userProfile[0].email
			connection.query('SELECT * FROM ticket WHERE buyer = ' + mysql.escape(email) + ' OR buyer = ' + mysql.escape(id) + ' OR seller = ' + mysql.escape(email) + 'OR seller = ' + mysql.escape(id), function(err, transaction, fields){
				if(err){
					res.json({
						type: 'profile',
						result: false
					});
				}
				else{
					res.json({
						type: 'profile',
						purchaseInfo: transaction,
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