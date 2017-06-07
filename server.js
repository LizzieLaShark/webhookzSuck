var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var knex = require('knex')
var request = require('request')

require('dotenv').config()

var port = process.env.PORT || 8080

console.log(port)



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.send('Hello World')
})


// var knexConfig = require('./knexfile.js')
//
// var knex = knex(knexConfig[process.env.NODE_ENV || 'development'])
//
// var env = 'production'
// var knexConfig = require('./knexfile.js')
// var knexGenerator = require('knex')
// var knexDbConfig = knexConfig[env]
// global.knex = knexGenerator(knexDbConfig)


////**** QuotaGuardStatic mySQL connection ****\\\\

var mysql = require('mysql2')
var url = require("url")
var SocksConnection = require('socksjs')

var remote_options = {
  host:'50.23.215.146',
  port: 3306
};

var proxy = url.parse(process.env.QUOTAGUARDSTATIC_URL)
var auth = proxy.auth;
var username = auth.split(":")[0]
var pass = auth.split(":")[1]

var sock_options = {
  host: proxy.hostname,
  port: 1080,
  user: username,
  pass: pass
}

var sockConn = new SocksConnection(remote_options, sock_options)


var dbConnection = mysql.createConnection({
user: process.env.DB_USER,
database: process.env.DB_DATABASE,
password: process.env.DB_PASSWORD,
stream: sockConn
})


dbConnection.query('SELECT 1+1 as test1;', function(err, rows, fields) {
    if (err) throw err;

    console.log('Result: ', rows);
    sockConn.dispose();
});


/////***** tests etc *****/////

// dbConnection.query('SELECT * FROM `contacts` WHERE `contact_name` = "Mark & Debi Rush";', function(err, rows, fields) {
//     if (err) throw err;
//
//     console.log('Result: ', rows);
// });


// var test = "Bob Test"
//
// dbConnection.query('INSERT INTO ' + table + ' SET contact_name="' + test + '"', function(err, rows, fields) {
//     if (err) throw err;
//
//     console.log(test, "is now in teh derterberse:  ", rows)
//
//     // sockConn.dispose();
//   })


// app.post('/addContact', function (req, res) {
//
//   payload = req.body.payload.person
//
//   var relevantData = {
//       contact_id: payload.id,
//       contact_name: payload.full_name,
//       position: payload.position,
//       email: payload.email,
//       phone: payload.phone,
//       mobile: payload.mobile,
//       Auto_note: 1,
//       Code_id: 11,
//       Added_by: 46825
// }
// // console.log("relevantData", relevantData)
//
//   dbConnection.query('INSERT INTO ' + table + ' SET ?', relevantData, function(err, rows, fields) {
//     if (err) throw err;
//
//     console.log(payload.full_name, "is now in teh derterberse:  ", rows)
//
//     // sockConn.dispose();
//   })
// })




//TODO: Figure out pooling. Write rest of code. suss correspondence_contact.

// dbConnection.end();



/////***** Relevant Variables and Functions *****/////

var table = 'contacts'




////*** Add New Contact ***\\\


// app.post('/addContact', function (req, res) {
//
//   payload = req.body.payload.person
//
//   var relevantData = {
//       contact_id: payload.id,
//       contact_name: payload.full_name,
//       position: payload.position,
//       email: payload.email,
//       phone: payload.phone,
//       mobile: payload.mobile
//       // Auto_note: 1,
//       // Code_id: 11,
//       // Added_by: 46825
// }
//
// // console.log("relevantData", relevantData)
//
//   dbConnection.query('INSERT INTO ' + table + ' SET ?', relevantData, function(err, rows, fields) {
//     if (err) throw err;
//
//     console.log(payload.full_name, "is now in teh derterberse:  ", rows)
//
//     // sockConn.dispose();
//   })
// })


/////***** Update Contact *****/////



app.post('/updatePerson', function (req, res) {


     payload = req.body.payload.person

  var relevantData = {
      contact_id: payload.id,
      contact_name: payload.full_name,
      position: payload.position,
      email: payload.email,
      phone: payload.phone,
      mobile: payload.mobile
      // Auto_note: 1,
      // Code_id: 11,
      // Added_by: 46825
    }

console.log("relevantData", relevantData)

  // dbConnection.query('UPDATE ' + table + 'WHERE contact_id= '+ payload.id + 'SET ? ', relevantData, function(err, rows, fields) {
  //   if (err) throw err;
  //
  //   console.log(payload.full_name, "is now updated:  ", rows)

    // sockConn.dispose();
  // })
})


// 'UPDATE ' + table + 'WHERE contact_id= '+ payload.id + 'SET ? ', relevantData



app.listen(port)
