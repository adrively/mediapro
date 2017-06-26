var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Users = require('./api/models/model'),
  bodyParser = require('body-parser'),
  database_name = "usersdb";

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/' + database_name);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/routes');
routes(app);

app.listen(port);
console.log('APIRest server started on: ' + port);
