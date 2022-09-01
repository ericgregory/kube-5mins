var mysql = require('mysql2');
var fs = require('fs');

const MYSQLPWD = fs.readFileSync("secrets/password", 'utf8');

var con = mysql.createConnection({
    host: "todo-mysql",
    user: "root",
    password: `${MYSQLPWD}`
});

var minutes = 5
var interval = minutes * 60 * 1000;

setInterval(function() {
  console.log("Performing 5 minute check...");
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
}, interval);