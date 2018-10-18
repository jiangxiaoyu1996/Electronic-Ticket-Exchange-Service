const express = require('express');
const router = express.Router();

//@route GET api/main/test
//@desc Test main route
//@access Public
router.get('/test', (req, res) => res.json({msg: 'Main works'}));

module.exports = router;


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

