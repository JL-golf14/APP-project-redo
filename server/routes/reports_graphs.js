var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/database-config');



router.get('/graph1', function(req, res){
  pg.connect(connectionString, function (err, client, done) {
    client.query('SELECT * FROM users;', function(err, result){
      done();
      if(err){
        ('Error completing get causes on page load query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
      }
    });
  });
});
//
