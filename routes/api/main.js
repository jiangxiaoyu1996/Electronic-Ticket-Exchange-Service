const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cryptoRandomString = require('crypto-random-string');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//@route GET api/main/test
//@desc Test main route
//@access Public
router.get('/test', (req, res) => res.json({msg: 'Main works'}));


var connection = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port     : '3307',
        database : 'ETES'
});


async function createArray(event){
	var location = []
	var array = []
	var previous = 0
	var index = 0
	for(var i in event){
		if(event[previous].event_name == event[i].event_name){
			location.push([event[i].row_Number, event[i].col_Number, event[i].price])
			index++
		}
		else{
			array.push([event[previous].event_name, event[previous].date, event[previous].location, event[previous].ticket_amount, event[previous].max_rows, event[previous].max_cols, event[previous].description, location])
			previous = i
			index++
			location = []
			location.push([event[i].row_Number, event[i].col_Number, event[i].price])
		}
	}
	array.push([event[previous].event_name, event[previous].date, event[previous].location, event[previous].ticket_amount, event[previous].max_rows, event[previous].max_cols, event[previous].description, location])
	return array
}

function search(text){
	var filterStr = ""
	for (var key in text){
		filterStr = filterStr + " " + mysql.escapeId(key) + " = " + mysql.escape(text[key]) + " AND"
	}
	filterStr = filterStr.substring(0, filterStr.lastIndexOf(" AND"))
	return filterStr
}

var authenticate = function(req, res, next){
	var id = req.cookies['session']
	if(id != null){
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
				next()
			}
		})
	}
	res.json({
		type: 'authenticate',
		result: false
	})
}

function calcRoute(startX, startY, endX, endY) {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var start = new google.maps.LatLng(startX, startY);
    var end = new google.maps.LatLng(endX, endY);
    var mapOptions = {
        zoom: 14,
        center: start

    }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);
    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function(response, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(response);
        }
    });
}

router.get('/sendEmail', function(req, res){

    const ticket = req.body.ticket; //front end sends ticket id,
	//set up sender email
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ylbtester@gmail.com',  //server email
            pass: 'ylb12345678'
        }
    });
    var mailOptions = {
        from: 'ylbtester@gmail.com',
        to: 'codyyu36@gmail.com',
        subject: 'testing',
        text: 'testing, ticket not found'
    };

    connection.query('SELECT * FROM ticket WHERE id = ' + mysql.escape(ticket), function(err, rows, fields) {
        if (err) {
            res.json({
                type: 'POST',
                loggedin: false
            });
        }

        else{
        	if(rows.length > 0) {
                var buyer_email = rows[0].buyer;
                //var deliver_option = rows[0]...;

                mailOptions = {
                    from: 'youremail@gmail.com',
                    to: buyer_email,
                    subject: 'testing',
                    text: 'testing'
                };
            }
		}
    });
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

});

router.get('/updatePopularity', function(req, res){
    var d = new Date();

    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDay();
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
});

router.post('/GetPopularEvents', function(req, res){

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


});

router.post('/addTicket', function(req, res){
	var id = cryptoRandomString(20);
	var name = req.body.name
	var row = req.body.row
	var col = req.body.col
	var buyer = req.body.buyer
	var seller = req.body.seller
    var price = req.body.price
	connection.query('INSERT INTO ticket (id, event, row_Number, col_Number, buyer, seller, price, status) VALUES (' + mysql.escape(id) + ', ' + "'" + name + "'" + ', ' + mysql.escape(row) + ', ' + mysql.escape(col) + ', NULL, ' + "'" + seller + "'" + ', ' + mysql.escape(price) + ', 0)', function(err, rows, fields){
		if(err){
			res.json({
				type: 'addTicket',
				result: false
			})
		}
		else{
			res.json({
				type: 'addTicket',
				result: true
			})
		}
	})
})

router.post('/addEvent', function(req,res){
	var id = cryptoRandomString(20);
	var name = req.body.name
	var date = req.body.date
	var location = req.body.location
	var row = req.body.row
	var col = req.body.col
	var description = req.body.description
	connection.query('INSERT INTO event (event_name, event_ID, date, location, ticket_amount, max_rows, max_cols, description) VALUES (' + "'" + name + "'" + ', ' + id + ', ' + "'" + date + "'" + ', ' + "'" + location + "'" + ', ' + mysql.escape(ticket_amount) + ', ' + mysql.escape(row) + ', ' + mysql.escape(col) + ', ' + "'" + description + "'" + ')', function(err, rows, fields){
		if(err){
			res.json({
				type: 'addEvent',
				result: false
			})
		}
		else{
			res.json({
				type: 'addEvent',
				result: true
			})
		}
	})
})


router.post('/search', function(req, res){

	const index = search(req.body.keyword);
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
});

router.get('/event', function(req, res){
	connection.query('SELECT event_name, date, location, ticket_amount, max_rows, max_cols, description, row_Number, col_Number, price FROM event,ticket WHERE event_name = event ORDER BY event_name', function(err, event, fields){
		if(err){
			res.json({
				type: 'event',
				result: false
			});
		}
		else if(event.length > 0){
			createArray(event).then(result =>{
				res.json({
					type: 'event',
					result: result
				});
			}).catch(err => {
				res.json({
					type: 'event',
					result: false
				});
			})
		}
		else{
			res.json({
				type: 'event',
				result: false
			});
		}
	});
})


router.post('/lockticket', function(req, res){
    //const ticketid = req.body.t_ID;
    const ticketid = 1; ///////////////////////////////////////////for testing
    var lock = 1;
    connection.query('SELECT * FROM ticket WHERE id = ' + mysql.escape(ticketid), function(err, rows, fields) {
        if (err) {
            console.log(err)
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
            res.json({
                type:'timestamp',
                success: false
            });
        }
        else if(rows.length > 0) {
            connection.query('UPDATE ticket SET status = ' + mysql.escape(1)  + ' WHERE id = ' + mysql.escape(ticketid)
                , function(err, rows, fields) {
                    if (err) {
                        console.log(err)
                        res.status(500).json({"status_code": 500,"status_message": "internal server error"});
                    }
                    else {
                        res.send({
                            type: 'timestamp',
                            success: true
                        });
                    }
                });
        }
        else {
            res.json({
                type:'timestamp',
                success: false,
                msg: 'no such ticket'
            });
        }
    });
});



router.post('/unlockticket', function(req, res){
    //const ticketid = req.body.t_ID;
    const ticketid = 1; ///////////////////////////////////////////for testing
    var lock = 1;
    connection.query('SELECT * FROM ticket WHERE id = ' + mysql.escape(ticketid), function(err, rows, fields) {
        if (err) {
            console.log(err)
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
            res.json({
                type:'timestamp',
                success: false
            });
        }
        else if(rows.length > 0) {
            connection.query('UPDATE ticket SET status = ' + mysql.escape(0)  + ' WHERE id = ' + mysql.escape(ticketid)
                , function(err, rows, fields) {
                    lock -= 1
                    if (err) {
                        console.log(err)
                        res.status(500).json({"status_code": 500,"status_message": "internal server error"});
                    }
                    else {
                        res.send({
                            type: 'timestamp',
                            success: true
                        });
                    }
                });
        }
        else {
            res.json({
                type:'timestamp',
                success: false,
                msg: 'no such ticket'
            });
        }
    });
    if(lock == 0) {
        connection.end();
    }
});

module.exports = router;
