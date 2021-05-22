// setting up server
const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');
const moment = require('moment');
const PORT = process.env.PORT || 5000;


const conn = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: '',
 database: 'employee'
});
conn.connect();

// logger ex. result: http://localhost:5000/api/members : 2021-05-22T17:48:17+08:00
const logger = (req, res, next) => {
 console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()}`);
 next();
}

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* GET */
// route manual | creating an api that accept members | request & responds
app.get('/api/members', (req, res) => {
 // res.send("<h3>Hello World<h3>");
 // retrieving data form db
 conn.query('SELECT * FROM userdata', (err, rows, fields) => {
  if (err) throw err
  res.json(rows);
 });

});

// details | getting each userdata using the id | passing id as parameter to URL
app.get('/api/members/:id', (req, res) => {
 var id = req.params.id;
 // res.send(id);

 conn.query(`SELECT * FROM userdata WHERE id='${id}'`, (err, rows, fields) => {
  if (err) throw err
  if (rows.length > 0) {
   res.json(rows);
  } else {
   res.status(400).json({ msg: `No user with an id of ${id}` });
  }
 });
});

/* POST */
app.post('/api/members', (req, res) => {
 var fname = req.body.fname;
 var lname = req.body.lname;
 var email = req.body.email;
 var gender = req.body.gender;

 conn.query(`INSERT INTO userdata (first_name,last_name,email,gender) VALUES ('${fname}','${lname}','${email}','${gender}')`, (err, rows, fields) => {
  if (err) throw err
  res.json({ msg: `1 row was inserted successfully.` });
 });
});


// UPDATE
app.put('/api/members', (req, res) => {
 var fname = req.body.fname;
 var lname = req.body.lname;
 var email = req.body.email;
 var gender = req.body.gender;
 var id = req.body.id;

 conn.query(`UPDATE userdata SET first_name='${fname}',last_name='${lname}',email='${email}',gender='${gender}' WHERE id='${id}'`,
  (err, rows, fields) => {
   if (err) throw err
   res.json({ msg: `row has been updated successfully.` });
  });
});


// DELETE 
app.delete('/api/members', (req, res) => {
 var id = req.body.id;
 conn.query(`DELETE FROM userdata WHERE id='${id}'`, (err, rows, fields) => {
  if (err) throw err
  res.json({ msg: `row has been deleted successfully.` });
 });
});


// specifying the directory of a webpage
app.use(express.static(path.join(__dirname, 'public')));


app.listen(5000, () => {
 console.log("Server is running in port ", PORT);
});

