var express = require('express');
var router = express.Router();
var pool = require('../modules/database-config');
var pg = require('pg');
var connectionString = require('../modules/database-config');



//request to get all users for manage users admin view
router.get('/manageUsers', function(req, res){
  console.log('manage users route hit');
  // var userEmail = req.decodedToken.email;
  pool.connect( function (err, client, done) {
    client.query('SELECT DISTINCT users.id, name, email, address, ward, active FROM users JOIN ideas_flags ON ideas_flags.user_id=users.id;', function(err, result){
      done();
      if(err){
        ('Error completing manage users query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
        console.log(result.rows);
      }
    });
  });
});

router.put('/deactivateUser/:id', function(req, res) {
  var userToDeactivateId = req.params.id;
  pool.connect( function (err, client, done) {
    client.query('UPDATE users SET active=false WHERE id=$1;',[userToDeactivateId], function(err, result){
      done();
      if(err){
        ('Error deactivating user', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
        console.log(result.rows);
      }
    });
  });
});

module.exports = router;
