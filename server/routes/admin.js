
var express = require('express');
var router = express.Router();
var pool = require('../modules/database-config');

//**********************************************//
//                                              //
//               ADMIN REPORTS VIEW             //
//                                              //
//**********************************************//
//Finds the number of users in a ward to display on admin view.
router.get('/userChart', function (req, res) {
  if(req.decodedToken.admin){
    pool.connect()
    .then(function (client) {
      client.query("SELECT ward, count(ward) FROM users GROUP BY ward")
      .then(function (result) {
        client.release();
        res.send(result.rows);
      })
      .catch(function (err) {
        console.log('error on SELECT', err);
        res.sendStatus(500);
      });
    });//end of .then
  }
});//end of router.get

//gets all users name and id for idea and comment view
router.get('/ideaChart', function (req, res) {
  if(req.decodedToken.admin){
    pool.connect()
    .then(function (client) {
      client.query("SELECT ward, count(ward) FROM users GROUP BY ward")
      .then(function (result) {
        client.release();
        res.send(result.rows);
      })
      .catch(function (err) {
        console.log('error on SELECT', err);
        res.sendStatus(500);
      });
    });//end of .then
  }
});//end of router.get

//**********************************************//
//                                              //
//              ADMIN MANAGE USERS              //
//                                              //
//**********************************************//
//**********************************************//
//       GET ALL USERS TO DISPLAY ON VIEW       //
//**********************************************//
router.get('/manageUsers', function(req, res){
  if(req.decodedToken.admin){
    pool.connect( function (err, client, done) {
      client.query('WITH ideas_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS ideas_flags_count FROM ideas_flags JOIN users ON ideas_flags.user_id=users.id GROUP BY users.id),' +
      'comments_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS comments_flags_count FROM comments_flags JOIN users ON comments_flags.user_id=users.id GROUP BY users.id),' +
      ' subflags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS subflags_count FROM subflags JOIN users ON subflags.user_id=users.id GROUP BY users.id)' +
      'SELECT users.name, users.email, users.ward, users.active, users.id, ideas_flags_count, comments_flags_count, subflags_count FROM users LEFT OUTER JOIN ideas_flags_count_temp_table ON ideas_flags_count_temp_table.user_id=users.id LEFT JOIN comments_flags_count_temp_table ON comments_flags_count_temp_table.user_id=users.id LEFT JOIN subflags_count_temp_table ON subflags_count_temp_table.user_id=users.id WHERE ideas_flags_count IS NOT NULL OR comments_flags_count IS NOT NULL OR subflags_count IS NOT NULL;', function(err, result){
        done();
        if(err){
          console.log('Error completing manage users query', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
          console.log(result.rows);
        }
      });
    });
  }
});
//**********************************************//
//         USER ACTIVATION/DEACTIVATION         //
//**********************************************//
//Deactivate user
router.put('/deactivateUser/:id', function(req, res) {
  if(req.decodedToken.admin){
    var userToDeactivateId = req.params.id;
    pool.connect( function (err, client, done) {
      client.query('UPDATE users SET active=false WHERE id=$1;',[userToDeactivateId], function(err, result){
        done();
        if(err){
          console.log('Error deactivating user', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
          console.log(result.rows);
        }
      });
    });
  }
});

//Reactivate user
router.put('/reactivateUser/:id', function(req, res) {
  if(req.decodedToken.admin){
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
  }
});
//**********************************************//
//                 USER FILTER                  //
//**********************************************//
//populates user filter on admin manage users view
router.get('/filterUsers', function (req, res) {
  if(req.decodedToken.admin){
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
  }
});
//**********************************************//
//        LOGIC FOR WHAT THE FILTER DOES        //
//**********************************************//
//queries database for matching users on admin manage users view
router.get('/searchUsers', function (req, res) {
  if(req.decodedToken.admin){
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
  }
});


router.get('/allFlags', function(req, res){
  // if(req.decodedToken.admin){
  pool.connect( function (err, client, done) {
    client.query('SELECT users.id,name,ward,ideas.id as ideas_id,comments.description As '+ 'comments_description,ideas.user_id,ideas.title,ideas.description As ideas_description ,'+
    'ideas_flags.user_id,comments_flags.comment_id ,'+
    'comments_flags.flag_comment,comments_flags.user_id FROM users '+
    'full outer join ideas on ideas.user_id = users.id '+
    'full outer join ideas_flags on ideas_flags.user_id = users.id '+
    'full outer join comments on comments.user_id = users.id '+
    'full outer join comments_flags on comments_flags.user_id = users.id '+
    'where ideas_flags.user_id is not null or comments_flags.user_id is not null;;', function(err, result){
      done();
      if(err){
        ('Error completing manage users query', err);
        res.sendStatus(501);
      } else {
        res.send(result.rows);
      }
    });
  });
// }  //closes if
});


router.get('/toFlagComments', function (req, res) {
  var flagObject = req.headers;
  pool.connect()
  .then(function (client) {
    client.query("SELECT * FROM comments WHERE id = $1",[flagObject.user_id])
    .then(function (result) {
      client.release();
      // console.log(result.rows[0]);
      res.send(result.rows[0]);
    })
    .catch(function (err) {
      console.log('error on SELECT', err);
      res.sendStatus(500);
    });
  });//end of .then
});//end of router.get


//function to deactivate user
router.post('/flagReport', function(req, res) {
  var flagData = req.body;
  // console.log('newIdea: ', newIdea);
  pool.connect()
  .then(function (client) {
    client.query('INSERT INTO comments_flags (user_id,comment_id,flag_comment) VALUES ($1,$2,$3)',[flagData.$routeParams.user_id,flagData.$routeParams.id,flagData.flagObject.description])
    .then(function (result) {
      client.release();
      res.sendStatus(201);
    })
    .catch(function (err) {
      console.log('error on INSERT', err);
      res.sendStatus(500);
    });
  });//end of .then
});//end of router.post

module.exports = router;
