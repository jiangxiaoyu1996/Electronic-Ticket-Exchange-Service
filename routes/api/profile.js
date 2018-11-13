const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');
var user = require('./user')
const cookieParser = require('cookie-parser');

//@route GET api/profile/test
//@desc Test profile route
//@access Public
router.use(cookieParser());
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
	if(req.cookies['session'] != null){
		next()
	}
	res.json({
		type: 'authenticate',
		result: false
	})
}

async function purchaseInfo(ticket, event){
	var array = ticket
	var names = []
	for(var i in event){
		names.push(event[i].event_name)
	}
	for(var i in ticket){
		var index = names.indexOf(ticket[i].event)
		array[i].date = event[index].date
		array[i].location = event[index].location
	}
	return array
}


router.get('/', function(req, res){
	var id = req.cookies['session']
	connection = getMySQLConnection();
	connection.connect();
	connection.query('SELECT * FROM user WHERE id = ' + mysql.escape(id), function(err, userProfile, fields){
		if(err){
			res.json({
					type: 'profile',
					result: false
				})
		}
		else if (userProfile.length <= 0){
			res.json({
					type: 'profile',
					result: false
				})
		}
		else{
			connection.query('SELECT * FROM ticket WHERE buyer = ' + mysql.escape(userProfile[0].email) + ' OR buyer = ' + mysql.escape(id) + ' OR seller = ' + mysql.escape(userProfile[0].email) + 'OR seller = ' + mysql.escape(id), function(err, transaction, fields){
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
			});
		}
	});
	connection.end()
});

module.exports = router;
