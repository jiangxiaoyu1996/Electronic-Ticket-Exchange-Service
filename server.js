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
	connection.query('CREATE TABLE IF event (event_name VARCHAR(255), event_ID VARCHAR(255), data VARCHAR(255), location VARCHAR(255), ticket_amount INTEGER, max_rows INTEGER, max_cols INTEGER, description TEXT, PRIMARY KEY (event_name, event_ID))', function(err, rows, fields){
	});
}

async function populateDB(){
	connection = getMySQLConnection();
	connection.query('INSERT INTO event (' +
		'event_name VARCHAR(255), event_ID VARCHAR(255), data VARCHAR(255), location VARCHAR(255), ticket_amount INTEGER, max_rows INTEGER, max_cols INTEGER, description TEXT)' +
		'', function(err, rows, fields){
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
