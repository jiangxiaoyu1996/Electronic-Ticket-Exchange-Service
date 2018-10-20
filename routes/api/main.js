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


function search(text){
	var filterStr = ""
	for (var key in text){
		filterStr = filterStr + " " + mysql.escapeId(key) + " = " + mysql.escape(text[key]) + " AND"
	}
	filterStr = filterStr.substring(0, filterStr.lastIndexOf(" AND"))
	return filterStr
}


router.get('/updatePopularity', function(req, res){
    var d = new Data();
    var time = d.getTime();
    connection = getMySQLConnection();
    connection.connect();
    connection.query('SELECT * FROM event ', function(err, rows, fields) {
        if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        }
        else {
                for(var i = 0; i < rows.length; i++) {

                    var l = (rows[i].seatSold + rows[i].pageViews / 4) / rows[i].totalSeat;
                    var days =  (time - rows[i].postedTimeInMillisec) / 86400000;
                    var rate = (100 - days) / 100
                    var popularity = l * rate;
                    connection.query('INSERT INTO event (popularity) VALUES (' + mysql.escape(popularity) +  ')', function(err, rows, fields) {
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


        }
    });

    connection.end();
});

router.get('/GetPopularEvents', function(req, res){

    connection = getMySQLConnection();
    connection.connect();
    connection.query('SELECT 5 FROM event ORDER BY popularity', function(err, rows, fields) {
        if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        }



        else {
            res.send({
                type: 'GET',
                success: true
            });
        }
    });
    connection.end();



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
				res.send({
					type: "search",
					result: rows
				});
			}
			else{
				res.send({
					type: "search",
					result: false,
				});
			}
		}
	});
	connection.end();
});

module.exports = router;
