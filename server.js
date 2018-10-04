const express = require('express');
const mysql = require('mysql');

//web pages
const main = require('./routes/api/main');
const user = require('./routes/api/user');
const profile = require('./routes/api/profile');

const app = express();
//Test
//Database Config
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ETES',
    port: 8080
});
//Database Connection
db.connect((err) => {
    if(err) throw err;
    console.log('MySQL Connected')
});


app.get('/', (req, res) => res.send('Hello there!'));
//Use Routes
app.use('/api/main', main);
app.use('/api/user', user);
app.use('/api/profile', profile);


const port = 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));
