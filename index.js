//==========express=============
const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const data = require('./data.js');

// Global variable to store the NHL data
let nhlData;


// Load the NHL data for when client's first connect
data.getData_nhl().then((result) => {
  nhlData = result;
});

// Route created at the root of the site "/"
// The result of the route returns HTML file: index.html
/*
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
*/

/***** The following code for serving static files
       supersedes the route code above *****/

// Serve all static files in 'public' directory
app.use(express.static('public'));

// Listen at http://localhost:3000/
http.listen(3000, function() {
  console.log('HTTP server started on port 3000');
});


io.on('connection', function(socket) {
  console.log('Client connection received');

  // When clients connect, send the data for each league
  socket.emit('nhl-data', nhlData);
  socket.emit('nba-data', nbaData);
  socket.emit('nfl-data', nflData);
  socket.emit('mlb-data', mlbData);

  // socket.on('receivedFromClient', function(data) {
  //   console.log(data);
  // });
});