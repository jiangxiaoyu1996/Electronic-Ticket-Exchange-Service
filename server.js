const express = require('express');
const mysql = require('mysql');
//const async = require('async');


//web pages
const main = require('./routes/api/main');
const user = require('./routes/api/user');
const profile = require('./routes/api/profile');

const app = express();

app.use(function(req,res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

function getMySQLConnection() {
    return mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
		port     : '3307',
        database : 'ETES'
    });
}

function deleteDb(){
	var connection = getMySQLConnection();
	connection.query('DROP TABLE IF EXISTS event, user, ticket', function(err, rows, fields){
		createDb();
	});
	connection.end()
}

function createDb(){
	var connection = getMySQLConnection();
	connection.query('CREATE TABLE event (event_name VARCHAR(255), event_ID VARCHAR(255), date VARCHAR(255), location VARCHAR(255), ticket_amount INTEGER, max_rows INTEGER, max_cols INTEGER, description TEXT, PRIMARY KEY (event_name, event_ID))', function(err, rows, fields){
		connection.query('CREATE TABLE user (id VARCHAR(255), email TEXT, password TEXT, PRIMARY KEY (id))', function(err, rows, fields){
			connection.query('CREATE TABLE ticket (id VARCHAR(255), event VARCHAR(255), row_Number INTEGER, col_Number INTEGER, buyer TEXT, seller TEXT, PRIMARY KEY (id, event, row_Number, col_Number))', function(err, rows, fields){
				populateDb();
			});
		});;
	});
}



function populateDb(){
	var connection = getMySQLConnection();
	var lock = 3
	connection.query('INSERT INTO event (event_name, event_ID, date, location, ticket_amount, max_rows, max_cols, description) VALUES (' +
	mysql.escape('Bay Area Taco & Beer Festival') + ', 1000, ' + mysql.escape('11/02/2018') + ', ' + mysql.escape('San Jose,CA') + ', 500, NULL, NULL, ' + mysql.escape('Guests will experience unlimited pours of craft beer from local and regional breweries as well as unlimited taco tastings from some of the top restaurants & food trucks in California. In addition to the free unlimited taco tastings, restaurants & food trucks will be selling additional food and beverage items. While sampling beer and tacos, make sure to stop by our boutique vendors where you can purchase orginal art. There will also be DJs, games, and more!)') +
	'), (' + mysql.escape('Los Angeles Lakers vs Golden State Warriors') + ', 1001, ' + mysql.escape('12/25/2018') + ', ' + mysql.escape('Oakland,CA') + ', 1000, 100, 20, ' + mysql.escape('The Golden State Warriors and Los Angeles Lakers are two of the most fun teams to watch in the NBA, and it is always a great game when the two match up. Exciting action on the court, some of the best athletes and players in the world, and an energetic fanbase: these are the things you can count on when the Warriors and Lakers go toe to toe. You can expect a great time at the arena during Warriors vs. Lakers games.') +
	'), (' + mysql.escape('Magnificent Mozart') + ', 1002, ' + mysql.escape('11/03/2018') + ', ' + mysql.escape('Santa Clara,CA') + ', 200, 20, 20, ' + mysql.escape('Mission College Chorus joins Mission College Symphony for a spectacular evening of Mozart, set in the beautiful Mission Santa Clara church at Santa Clara University.') + ')', function(err, rows, fields){
	lock -= 1;
	});
	connection.query('INSERT INTO user (id, email, password) VALUES (1, ' + "'test@gmail.com'" + ', 123), (2, ' + "'user1@gmail.com'" + ', password), (500, ' + "'another1@gmail.com'" + ', ' + "'abc123456'" + ')', function(err, rows, fields){
	lock -= 1;
	});
	connection.query('INSERT INTO ticket (id, event, row_Number, col_Number, buyer, seller) VALUES (1, ' + mysql.escape('Bay Area Taco & Beer Festival') + ', 1, 1, NULL, ' + "'test@gmail.com'" +
	'), (1, ' + mysql.escape('Bay Area Taco & Beer Festival') + ', 20, 15, ' + "'another1@gmail.com'" + ', ' + "'user1@gmail.com'" + ')' , function(err, rows, fields){
	if(err){
		console.log(err)
	}
	lock -= 1;
	});
	if(lock == 0){
		connection.end()
	}
}

function setupDb(){
	deleteDb();
}

setupDb();

app.get('/', (req, res) => res.send('Hello there!'));
//Use Routes
app.use('/api/main', main);
app.use('/api/user', user);
app.use('/api/profile', profile);



const port = 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));
