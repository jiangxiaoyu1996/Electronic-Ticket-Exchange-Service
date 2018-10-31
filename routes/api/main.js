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
		port     : '3307',
        database : 'ETES'
    });
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
		if(err){
			res.json({
				type: 'search',
				result: false
			});
		}
		else if(rows.length > 0){
			res.json({
				type: 'search',
				result: rows
			});
		}
		else{
			res.json({
				type: 'search',
				result: false
			});
		}
	});
	connection.end()
});

router.post('/event', function(req, res){
	const name = req.body.name;
	var events = [];
	connection = getMySQLConnection();
	connection.query('SELECT * FROM event WHERE event_name = ' + "'" + name + "'", function(err, rows, fields){
		if(err){
			res.json({
				type: 'event',
				result: false
			});
		}
		else if(rows.length > 0){
			for(i = 0; i < rows.length; i++){
				events.push(rows[i]);
			}
			res.json({
				type: 'event',
				result: events
			})
		}
		else{
			res.json({
				type: 'event',
				result: false
			});
		}
	});
	connection.end()
})

module.exports = router;
