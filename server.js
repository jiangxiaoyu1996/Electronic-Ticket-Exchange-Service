const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');

//web pages
const main = require('./routes/api/main');
const user = require('./routes/api/user');
const profile = require('./routes/api/profile');

const app = express();

app.use(function(req,res, next){
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
})

var connection = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : '',
		port     : '3307',
        database : 'ETES'
});

var salt = bcrypt.genSaltSync(10);

var pass1 = bcrypt.hashSync('123',salt);
var pass2 = bcrypt.hashSync('simple',salt);
var pass3 = bcrypt.hashSync('abc1234567',salt);

function deleteDb(){
	connection.query('DROP TABLE IF EXISTS event, user, ticket', function(err, rows, fields){
		createDb();
	});
}

function createDb(){
	connection.query('CREATE TABLE event (event_name VARCHAR(255), event_ID VARCHAR(255), date VARCHAR(255),date_posted VARCHAR(255), location VARCHAR(255), pageviews INTEGER, ticket_amount INTEGER, ticket_amount_available INTEGER, max_rows INTEGER, max_cols INTEGER, pop_index DOUBLE, description TEXT, PRIMARY KEY (event_ID))', function(err, rows, fields){
		connection.query('CREATE TABLE ticket (id VARCHAR(255), event VARCHAR(255), row_Number INTEGER, col_Number INTEGER, buyer VARCHAR(255), seller VARCHAR(255), price INTEGER, status VARCHAR(255), PRIMARY KEY (id, event, row_Number, col_Number, buyer, seller))', function(err, rows, fields){
			connection.query('CREATE TABLE user (id VARCHAR(255), username TEXT, email TEXT, password TEXT, address TEXT, PRIMARY KEY (id))', function(err, rows, fields){
				populateDb();
			});
		});;
	});
}



function populateDb(){
    connection.query('INSERT INTO event (event_name, event_ID, date, date_posted, location, ticket_amount,ticket_amount_available, max_rows, max_cols, description) VALUES (' +
        mysql.escape('Bay Area Taco & Beer Festival') + ', 1000, ' + mysql.escape('11/02/2018') + ', ' + mysql.escape('10/02/2018') + ', ' + mysql.escape('San Jose,CA') + ', 500, 120, 200, 200, ' + mysql.escape('Guests will experience unlimited pours of craft beer from local and regional breweries as well as unlimited taco tastings from some of the top restaurants & food trucks in California. In addition to the free unlimited taco tastings, restaurants & food trucks will be selling additional food and beverage items. While sampling beer and tacos, make sure to stop by our boutique vendors where you can purchase orginal art. There will also be DJs, games, and more!)') +
        '), (' + mysql.escape('Los Angeles Lakers vs Golden State Warriors') + ', 1001, ' + mysql.escape('12/25/2018') + ', ' + mysql.escape('09/22/2018') +  ', ' + mysql.escape('Oakland,CA') + ', 1000, 125,  100, 20, ' + mysql.escape('The Golden State Warriors and Los Angeles Lakers are two of the most fun teams to watch in the NBA, and it is always a great game when the two match up. Exciting action on the court, some of the best athletes and players in the world, and an energetic fanbase: these are the things you can count on when the Warriors and Lakers go toe to toe. You can expect a great time at the arena during Warriors vs. Lakers games.') +
        '), (' + mysql.escape('Magnificent Mozart') + ', 1002, ' + mysql.escape('11/03/2018') + ', ' + mysql.escape('10/22/2018') + ', '  + mysql.escape('Santa Clara,CA') + ', 200,150, 20, 20, ' + mysql.escape('Mission College Chorus joins Mission College Symphony for a spectacular evening of Mozart, set in the beautiful Mission Santa Clara church at Santa Clara University.') + ')', function(err, rows, fields){
    });
	connection.query('INSERT INTO user (id, username, email, password, address) VALUES (1, ' + "'test'" + ', ' + "'test@gmail.com'" + ', ' + "'" + pass1 + "'" + ', ' + "'San Jose'" + '), (2, ' + "'time'" + ', ' + "'user1@gmail.com'" + ', ' + "'" + pass2 + "'" + ', ' + "'San Francisco'" + '), (500, NULL, ' + "'another1@gmail.com'" + ', ' + "'" + pass3 + "'" + ', ' + "'Sacramento'" + ')', function(err, rows, fields){
	});
	connection.query('INSERT INTO ticket (id, event, row_Number, col_Number, buyer, seller, price, status) VALUES (1, ' + mysql.escape('Bay Area Taco & Beer Festival') + ', 1, 1, NULL, ' + "'test@gmail.com'" +
	', 50, 0), (2, ' + mysql.escape('Bay Area Taco & Beer Festival') + ', 20, 15, ' + "'another1@gmail.com'" + ', ' + "'user1@gmail.com'" + ', 32, 1), (3, ' + mysql.escape('Bay Area Taco & Beer Festival') + ', 1, 5, ' + 'NULL' + ', ' + "'user1@gmail.com'" + ', 35, 0), ' 
	+ '(4, ' + mysql.escape('Bay Area Taco & Beer Festival') + ', 27, 29, ' + "'another1@gmail.com'" + ', ' + "'user1@gmail.com'" + ', 28, 0), (5, ' + mysql.escape('Magnificent Mozart') + ', 1, 5, ' + 'NULL' + ', ' + "'test@gmail.com'" + ', 25, 0), (6, ' + mysql.escape('Magnificent Mozart') + ', 50, 50, ' + 'NULL' + ', ' + "'test@gmail.com'" + ', 15, 0)', function(err, rows, fields){
	});
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

module.exports = salt