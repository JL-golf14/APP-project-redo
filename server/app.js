var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder');
var portDecision = process.env.PORT || 3000;

//Serving favicon
var favicon = require('serve-favicon')

//Routes
var admin = require('./routes/admin');
var login = require('./routes/login');
var data = require('./routes/data');
var list_data = require('./routes/list_data');
var reports_graphs = require('./routes/reports_graphs');
// var search = require('./routes/search');

//Serve HTML
app.get('/', function(req, res){
  res.sendFile(path.resolve('./public/views/index.html'));
});

//Serve Static Files
app.use(express.static('public'));
app.use(bodyParser.json());

app.use(favicon(path.join(__dirname, '../public/assets/favicon.ico')));

//Routes
app.use('/admin', admin);
// app.use('/login', login);
// app.use('/data', data);

//Auth
app.use(decoder.token);
/* Whatever is below this is protected by authentication. */

app.use('/login', login);



app.listen(portDecision, function(){
  console.log("Listening on port: ", portDecision);
});
