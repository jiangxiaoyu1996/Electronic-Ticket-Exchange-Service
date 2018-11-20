const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cryptoRandomString = require('crypto-random-string');
const cookieParser = require('cookie-parser');

router.use(cookieParser());
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
            if(event[previous].row_Number != null){
			 location.push([event[i].row_Number, event[i].col_Number, event[i].price])
            }
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

var checkifExist = function(req, res, next){
    var eventname = req.body.event;
    var row = req.body.row;
    var col = req.body.col;
    connection.query('SELECT * FROM ticket WHERE event = ' + mysql.escape(eventname) + ' AND row_Number = ' + mysql.escape(row) + ' AND col_Number = ' + mysql.escape(col) + ' AND status = 0 AND buyer is NULL', function(err, rows, fields){
        if(err){
            res.json({
                type: 'checkifExist',
                result: false
            })
        }
        else if (rows.length > 0){
            next()
        }
        else{
            res.json({
                type: 'checkifExist',
                result: false
            })
        }
    })
}

var authenticate = function(req, res, next){
	var id = req.cookies['session']
	if(typeof id !== undefined){
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
				req.user = {
					username : rows[0].username,
					email : rows[0].email
				}
				next()
			}
		})
	}
	else{
		res.json({
			type: 'authenticate',
			result: false
		})
	}
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

router.post('/sendEmail', function(req, res){
    var eventname = req.body.event;
    var row = req.body.row;
    var col = req.body.col;
    var type = req.body.delivery;
    var email = req.body.email;

    var tracking = Math.floor(Math.random() * Math.floor(100000));
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ylbtester@gmail.com',  //server email
            pass: 'ylb12345678'
        }
    });
    if(type == 'FedEx') {
        var mailOptions = {

            to: email,
            from: 'ETES Support Team <ylbtester@gmail.com>',
            subject: 'Order Confirmation and Tracking',
            text: 'Thank you for your business! We have received your order and it is currently being processed.' + '\n'
            + 'Your ticket for event,' + eventname + ' has been successfully booked. ' + '\n Your seat is Row: ' + row + ', Column: ' + col +'\n' +
                'Your ticket will be delivered by FedEx. Your tracking number is: fedex' + tracking
        };
    }

    else if (type == 'UPS') {
        var mailOptions = {
            from: 'ETES Support Team <ylbtester@gmail.com>',
            to: email,
            subject: 'Order Confirmation and Tracking',
            text: 'Thank you for your business! We have received your order and it is currently being processed.' + '\n'
                + 'Your ticket for event,' + eventname + ' has been successfully booked. ' + '\n Your seat is Row: ' + row + ', Column: ' + col +'\n' +
                'Your ticket will be delivered by FedEx. Your tracking number is: UPS' + tracking
        };
    }

    else if (type == 'Uber') {
        var mailOptions = {
            from: 'ETES Support Team <ylbtester@gmail.com>',
            to: email,
            subject: 'Order Confirmation and Tracking',
            text: 'Thank you for your business! We have received your order and it is currently being processed.' + '\n'
                + 'Your ticket for event,' + eventname + ' has been successfully booked. ' + '\n Your seat is Row: ' + row + ', Column: ' + col +'\n' +
                'Your ticket will be delivered by FedEx. Your tracking number is: Uber' + tracking
        };

    }
    //e-ticket
    else {
        var mailOptions = {
            from: 'ETES Support Team <ylbtester@gmail.com>',
            to: email,
            subject: 'Order Confirmation and Tracking',
            text: 'Thank you for your business! We have received your order and it is currently being processed.' + '\n'
                + 'Your ticket for event,' + eventname + ' has been successfully booked. ' + '\n Your seat is Row: ' + row + ', Column: ' + col +'\n' +
                'Here is your ticket identification number: ' + tracking +'  (please do not lose this number which will be used for checking in.'
        };
    }


    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } else {
            res.send({
                type: 'Email',
                success: true
            });
            console.log('Email sent: ' + info.response);
        }
    });

    connection.end();

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
	var seller = req.body.seller
    var price = req.body.price
	connection.query('INSERT INTO ticket (id, event, row_Number, col_Number, buyer, seller, price, status) VALUES (' + mysql.escape(id) + ', ' + "'" + name + "'" + ', ' + mysql.escape(row) + ', ' + mysql.escape(col) + ", NULL, " + "'" + seller + "'" + ', ' + mysql.escape(price) + ', 0)', function(err, rows, fields){
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
			connection.query("SELECT * FROM ticket WHERE event = '" + rows[0].event_name + "' and status = 0 and buyer is NULL", function (err, hasTicket, fields){
                if(err){
                    console.log(err)
                    res.json({
                        type: 'search',
                        result: false
                    })
                }
                else if(hasTicket.length > 0){
                    res.json({
                        type: 'search',
                        result: rows
                    })
                }
                else{
                    res.json({
                        type: 'search',
                        result: false
                    })
                }
            })
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
	connection.query('SELECT event_name, date, location, ticket_amount, max_rows, max_cols, description, row_Number, col_Number, price FROM event LEFT OUTER JOIN ticket ON event_name = event ORDER BY event_name', function(err, event, fields){
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

router.get('/event_buying', function(req, res){
    connection.query('SELECT event_name, date, location, ticket_amount, max_rows, max_cols, description, row_Number, col_Number, seller, price FROM event,ticket WHERE event_name = event and buyer is null and status = 0 ORDER BY event_name', function(err, event, fields){
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


router.post('/buyticket', authenticate, function(req, res){
	var id = req.cookies['session'];
	var email = req.user.email;
	var eventname = req.body.event;
    var row = req.body.row;
    var col = req.body.col;
    connection.query('UPDATE ticket SET buyer = ' + mysql.escape(email) + ' WHERE event = ' + mysql.escape(eventname) + ' AND row_Number = ' + mysql.escape(row) + ' AND col_Number = ' + mysql.escape(col), function(err, rows, fields){
        if(err){
            res.json({
                type: 'buyTicket',
                result: false
            })
        }
        else{
            res.json({
                type: 'buyTicket',
                result: true
            })
        }
    })
})


router.post('/lockticket', authenticate, checkifExist, function(req, res){
    var eventname = req.body.event;
    var row = req.body.row;
    var col = req.body.col;
    //const ticketid = 1;
    connection.query('UPDATE ticket SET status = ' + mysql.escape(1)  + ' WHERE event = ' + mysql.escape(eventname) + ' AND row_Number = ' + mysql.escape(row) + ' AND col_Number = ' + mysql.escape(col)
                , function(err, rows, fields) {
        if (err) {
            res.send({
                type: 'timestamp',
                success: false
            });
        }
        else {
            res.send({
                type: 'timestamp',
                success: true
            });
        }
    });
});



router.post('/unlockticket', function(req, res){
    var eventname = req.body.event;
    var row = req.body.row;
    var col = req.body.col;
    //const ticketid = 1;
    connection.query('UPDATE ticket SET status = ' + mysql.escape(0)  + ' WHERE event = ' + mysql.escape(eventname) + ' AND row_Number = ' + mysql.escape(row) + ' AND col_Number = ' + mysql.escape(col)
                , function(err, rows, fields) {
        if (err) {
            res.json({
                type:'timestamp',
                success: false
          		});
            }
        else {
            res.send({
                type: 'timestamp',
                success: true
            });
        }
    });
});


router.post('/getSeller', function(req, res){
    var eventname = req.body.event;
    var row = req.body.row;
    var col = req.body.col;
    connection.query('SELECT * FROM ticket WHERE event = ' + mysql.escape(eventname) + ' AND row_Number = ' + mysql.escape(row) + ' AND col_Number = ' + mysql.escape(col), function(err, event, fields) {
        if (err) {
            res.json({
                type: 'getSeller',
                result: false
                });
            }
        else if(event.length > 0){
            connection.query("SELECT * FROM user WHERE username = '" + event[0].seller + "' OR email = '" + event[0].seller + "'", function(err, user, fields){
                if (err){
                    res.json({
                        type: 'getSeller',
                        result: false
                    })
                }
                else if (user.length > 0){
                    res.json({
                        type: 'getSeller',
                        result: user[0].address
                    })
                }
                else{
                    res.json({
                        type: 'getSeller',
                        result: false
                    })
                }
            })
        }
        else {
            res.send({
                type: 'getSeller',
                result: false
            });
        }
    });
})

module.exports = router;
