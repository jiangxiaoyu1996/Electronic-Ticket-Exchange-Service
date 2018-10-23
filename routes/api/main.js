const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//@route GET api/main/test
//@desc Test main route
//@access Public
router.get('/test', (req, res) => res.json({msg: 'Main works'}));


function getMySQLConnection() {
    return mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'ETES'
    });
}

async function deleteDb(){
	connection = getMySQLConnection();
	connection.query('DROP TABLE IF EXISTS ETES', function(err, rows, fields){
		if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        }
	});
}

async function createDb(){
	connection = getMySQLConnection();
	connection.query('CREATE TABLE IF ETES (event_ID VARCHAR(255), data VARCHAR(255), location VARCHAR(255), ticket_amount INTEGER, max_rows INTEGER, max_cols INTEGER, PRIMARY KEY event_ID)', function(err, rows, fields){
		if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        }
	});
}

function setupDB(){
	deleteDb();
	createDb();
}

function search(text){
	var filterStr = ""
	for (var key in text){
		filterStr = filterStr + " " + mysql.escapeId(key) + " = " + mysql.escape(text[key]) + " AND"
	}
	filterStr = filterStr.substring(0, filterStr.lastIndexOf(" AND"))
	return filterStr
}


router.post('/search', function(req, res){
	const index = search(req.body);
	connection = getMySQLConnection();
	connection.query('SELECT * FROM event WHERE' + index, function(err, rows, fields){
		if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        }
        else{
			if(rows.length > 0){
				res.json({
					type: "search",
					result: rows
				});
			}
			else{
				res.json({
					type: "search",
					result: false
				});
			}
		}
	});
	connection.end();
});

module.exports = router;