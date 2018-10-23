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
