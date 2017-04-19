var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/database-config');


//request to get all users for manage users admin view
router.get('/manageUsers', function(req, res){
  pool.connect( function (err, client, done) {
    client.query('WITH ideas_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS ideas_flags_count FROM ideas_flags JOIN users ON ideas_flags.user_id=users.id GROUP BY users.id),' +
    'comments_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS comments_flags_count FROM comments_flags JOIN users ON comments_flags.user_id=users.id GROUP BY users.id),' +
    ' subflags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS subflags_count FROM subflags JOIN users ON subflags.user_id=users.id GROUP BY users.id)' +
    'SELECT users.name, users.email, users.ward, users.active, users.id, ideas_flags_count, comments_flags_count, subflags_count FROM users LEFT OUTER JOIN ideas_flags_count_temp_table ON ideas_flags_count_temp_table.user_id=users.id LEFT JOIN comments_flags_count_temp_table ON comments_flags_count_temp_table.user_id=users.id LEFT JOIN subflags_count_temp_table ON subflags_count_temp_table.user_id=users.id WHERE ideas_flags_count IS NOT NULL OR comments_flags_count IS NOT NULL OR subflags_count IS NOT NULL;', function(err, result){
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


//function to deactivate user
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

//function to reactivate user
router.put('/reactivateUser/:id', function(req, res) {
  var userToReactivateId = req.params.id;
  pool.connect(function (err, client, done) {
    client.query('UPDATE users SET active=true WHERE id=$1;',[userToReactivateId], function(err, result){
      done();
      if(err){
        ('Error reactivating user', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
        console.log(result.rows);
      }
    });
  });
});

//populates user filter on admin manage users view
router.get('/filterUsers', function (req, res) {
  pool.connect(function (err, client, done) {
    client.query('SELECT * FROM user_filter', function (err, result) {
      done();
      if (err) {
        console.log('Error completing user filter query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
        console.log(result.rows);
      }
    });
  });
});

//queries database for matching users on admin manage users view
router.get('/searchUsers', function (req, res) {
  var userSearch = req.headers
  var newSearchString = "%" + req.headers.searchstring + "%";
  console.log(newSearchString);
  if(req.headers.filter == 'User Name'){
    pool.connect(function (err, client, done) {
      client.query('WITH ideas_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS ideas_flags_count FROM ideas_flags JOIN users ON ideas_flags.user_id=users.id GROUP BY users.id),' +
      'comments_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS comments_flags_count FROM comments_flags JOIN users ON comments_flags.user_id=users.id GROUP BY users.id),' +
      ' subflags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS subflags_count FROM subflags JOIN users ON subflags.user_id=users.id GROUP BY users.id)' +
      'SELECT users.name, users.email, users.ward, users.active, users.id, ideas_flags_count, comments_flags_count, subflags_count FROM users LEFT OUTER JOIN ideas_flags_count_temp_table ON ideas_flags_count_temp_table.user_id=users.id LEFT JOIN comments_flags_count_temp_table ON comments_flags_count_temp_table.user_id=users.id LEFT JOIN subflags_count_temp_table ON subflags_count_temp_table.user_id=users.id WHERE name ILIKE $1;',
      [newSearchString], function (err, result) {
        done();
        if (err) {
          console.log('Error completing user search query', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
          console.log(result.rows);
        }
      });
    });
  } else if(req.headers.filter == 'User Email'){
    pool.connect(function (err, client, done) {
      client.query('WITH ideas_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS ideas_flags_count FROM ideas_flags JOIN users ON ideas_flags.user_id=users.id GROUP BY users.id),' +
      'comments_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS comments_flags_count FROM comments_flags JOIN users ON comments_flags.user_id=users.id GROUP BY users.id),' +
      ' subflags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS subflags_count FROM subflags JOIN users ON subflags.user_id=users.id GROUP BY users.id)' +
      'SELECT users.name, users.email, users.ward, users.active, users.id, ideas_flags_count, comments_flags_count, subflags_count FROM users LEFT OUTER JOIN ideas_flags_count_temp_table ON ideas_flags_count_temp_table.user_id=users.id LEFT JOIN comments_flags_count_temp_table ON comments_flags_count_temp_table.user_id=users.id LEFT JOIN subflags_count_temp_table ON subflags_count_temp_table.user_id=users.id WHERE email ILIKE $1;',
      [newSearchString], function (err, result) {
        done();
        if (err) {
          console.log('Error completing user search query', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
          console.log(result.rows);
        }
      });
    });
  }else{
    pool.connect(function (err, client, done) {
      client.query('WITH ideas_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS ideas_flags_count FROM ideas_flags JOIN users ON ideas_flags.user_id=users.id GROUP BY users.id),' +
      'comments_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS comments_flags_count FROM comments_flags JOIN users ON comments_flags.user_id=users.id GROUP BY users.id),' +
      ' subflags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS subflags_count FROM subflags JOIN users ON subflags.user_id=users.id GROUP BY users.id)' +
      'SELECT users.name, users.email, users.ward, users.active, users.id, ideas_flags_count, comments_flags_count, subflags_count FROM users LEFT OUTER JOIN ideas_flags_count_temp_table ON ideas_flags_count_temp_table.user_id=users.id LEFT JOIN comments_flags_count_temp_table ON comments_flags_count_temp_table.user_id=users.id LEFT JOIN subflags_count_temp_table ON subflags_count_temp_table.user_id=users.id WHERE ward ILIKE $1;',
      [newSearchString], function (err, result) {
        done();
        if (err) {
          console.log('Error completing user search query', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
          console.log(result.rows);
        }
      });
    });
  }
});


module.exports = router;
