const express = require('express');
const mysql = require('mysql');


//web pages
const main = require('./routes/api/main');
const user = require('./routes/api/user');
const profile = require('./routes/api/profile');

const app = express();

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
	connection.query('DROP TABLE IF EXISTS event', function(err, rows, fields){
	});
}

async function createDb(){
	connection = getMySQLConnection();
	connection.query('CREATE TABLE IF event (event_name VARCHAR(255), event_ID VARCHAR(255), dat VARCHAR(255), location VARCHAR(255), ticket_amount INTEGER, max_rows INTEGER, max_cols INTEGER, description TEXT, PRIMARY KEY (event_name, event_ID))', function(err, rows, fields){
	});
}

async function populateDB(){
	connection = getMySQLConnection();
	connection.query('INSERT INTO `event` (`event_name`, `event_ID`, `date`, `location`, `ticket_amount`, `MAX_ROWS`, `max_cols`, `description`) VALUES
('Bay Area Taco & Beer Festival', '1000', '11/02/2018', 'San Jose,CA', 500, NULL, NULL, 'Guests will experience unlimited pours of craft beer from local and regional breweries as well as unlimited taco tastings from some of the top restaurants & food trucks in California.\r\nIn addition to the free unlimited taco tastings, restaurants & food trucks will be selling additional food and beverage items.\r\nWhile sampling beer and tacos, make sure to stop by our boutique vendors where you can purchase orginal art. There will also be DJ\'s, games, and more!'),
('Los Angeles Lakers vs Golden State Warriors\r\n', '1001', '12/25/2018', 'Oakland,CA', 1000, 100, 20, 'The Golden State Warriors and Los Angeles Lakers are two of the most fun teams to watch in the NBA, and it is always a great game when the two match up. Exciting action on the court, some of the best athletes and players in the world, and an energetic fanbase: these are the things you can count on when the Warriors and Lakers go toe to toe. You can expect a great time at the arena during Warriors vs. Lakers games.'),
('Magnificent Mozart', '1002', '11/03/2018', 'Santa Clara,CA', 200, 20, 20, 'Mission College Chorus joins Mission College Symphony for a spectacular evening of Mozart, set in the beautiful Mission Santa Clara church at Santa Clara University.')', function(err, rows, fields){
	});
}

function setupDB(){
	deleteDb();
	createDb();
}

setupDB();


app.get('/', (req, res) => res.send('Hello there!'));
//Use Routes
app.use('/api/main', main);
app.use('/api/user', user);
app.use('/api/profile', profile);



const port = 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));
