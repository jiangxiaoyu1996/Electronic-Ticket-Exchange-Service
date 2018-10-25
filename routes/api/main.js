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


router.post('/updatePopularity', function(req, res){
    var d = new Date();

    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDay();
    var lock = 1
    connection = getMySQLConnection();
    connection.connect();
    connection.query('SELECT * FROM event ', function(err, rows, fields) {
        if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        }
        else {
            for(var i = 0; i < rows.length; i++) {

                var _date = rows[i].date_posted;
                var _year = _date.substring(6);
                var _month = _date.substring(0, 2);
                var _day = _date.substring(3, 5);


                var l = (rows[i].ticket_amount - rows[i].ticket_amount_available + rows[i].pageviews / 4) / rows[i].ticket_amount;
                var days =  year * 365 + month * 30 + day - _year * 365 - _month * 30 - _day;
                var rate = (100 - days) / 100
                var popularity = l * rate;      //UPDATE `event` SET `pop_index` = '0.1' WHERE `event`.`event_ID` = '1000'
                //connection.query('UPDATE users SET Name = :Name WHERE UserID = :UserID',
                //                      {UserID: userId, Name: name})

                console.log(rows[i].event_ID);
                /**  connection.query('UPDATE event SET pop_index = 0.2 WHERE event_ID = 1000' , function(err, rows, fields) {
                    lock -= 1
                    if (err) {
                        console.log(err)
                    }
                    }); **/
                connection.query('UPDATE event SET pop_index = ' + mysql.escape(popularity)  + ' WHERE event_ID = ' + mysql.escape(1000 + i)
                    , function(err, rows, fields) {
                        lock -= 1
                        if (err) {
                            console.log(err)
                            res.status(500).json({"status_code": 500,"status_message": "internal server error2"});
                        }
                        else {
                            res.send({
                                type: 'POST',
                                success: true
                            });
                        }
                    });

            }


        }
    });
    if(lock == 0) {
        connection.end();
    }
});

router.post('/GetPopularEvents', function(req, res){

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



});

module.exports = router;
