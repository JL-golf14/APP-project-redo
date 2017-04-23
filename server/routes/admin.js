
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
      client.query("SELECT ward, count(ward) FROM users GROUP BY ward ORDER BY ward ASC")
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

//gets all users name and id for idea and idea view
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
router.get('/allFlagszzz', function(req, res){
  console.log("hits all flags");
  pool.connect( function (err, client, done) {
    client.query('SELECT users.id,name,ward,ideas.id as ideas_id,comments.description As comments_description,ideas.user_id as idea_users_id,ideas.title,ideas.description As ideas_description, ideas_flags.user_id as ideas_flags_user_id,comments_flags.comment_id, comments_flags.flag_comment,comments_flags.user_id FROM users full outer join ideas on ideas.user_id = users.id full outer join ideas_flags on ideas_flags.user_id = users.id full outer join comments on comments.user_id = users.id full outer join comments_flags on comments_flags.user_id = users.id where ideas_flags.user_id is not null or comments_flags.user_id is not null;', function(err, result){
      done();
      if(err){
        console.log('Error completing manage users query', err);
        res.sendStatus(501);
      } else {
        res.send(result.rows);
        console.log("this si RRRRREEESSSULT",result.rows);
      }
    });
  });
});

router.delete('/deleteIdeaFlag/:ideas_id/:user_id',function (req, res){
    if(req.decodedToken.admin){
  console.log("this is the idea flag being hit",req.params.ideas_id,"this is the user id...",req.params.user_id);
  var ideasToDelete = req.params.ideas_id;
    var user_id = req.params.user_id;
  // Get a Postgres client from the connection pool
  pool.connect( function (err, client, done) {
    client.query(' DELETE FROM ideas_flags WHERE user_id = $1 AND idea_id=$2;', [user_id,ideasToDelete], function(err, result){
      done();
      if(err){
        ('Error completing manage users query', err);
        res.sendStatus(501);
      } else {
        res.sendStatus(244);
          console.log("this shit worked!!!");
      }
    });
  });
}
});

router.delete('/deleteCommentFlag/:comment_id/:user_id',function (req, res){
  console.log("this is the idea flag hit");
var commentToDelete = req.params.comment_id;
  var user_id = req.params.user_id;

  // Get a Postgres client from the connection pool
  pool.connect( function (err, client, done) {
    client.query(' DELETE FROM comments_flags WHERE user_id = $1 AND comment_id=$2;', [user_id,commentToDelete], function(err, result){
      done();
      if(err){
        ('Error completing manage users query', err);
        res.sendStatus(501);
      } else {
        console.log("this shit worked!!!");
        res.sendStatus(233);
      }
    });
  });

});
router.delete('/deleteIdea/:ideas_id/:user_id',function (req, res){
    if(req.decodedToken.admin){
  console.log("this is the idea flag being hit",req.params.ideas_id,"this is the user id...",req.params.user_id);
  var ideasToDelete = req.params.ideas_id;
    var user_id = req.params.user_id;
  // Get a Postgres client from the connection pool
  pool.connect( function (err, client, done) {
    client.query(' DELETE FROM ideas WHERE user_id = $1 AND subtopics_id=$2;', [user_id,ideasToDelete], function(err, result){
      done();
      if(err){
        ('Error completing manage users query', err);
        res.sendStatus(501);
      } else {
        res.sendStatus(244);
          console.log("this shit worked!!!");
      }
    });
  });
}
});


router.delete('/deleteComment/:comment_id/:user_id',function (req, res){
  console.log("this is the idea flag hit");
var commentToDelete = req.params.comment_id;
  var user_id = req.params.user_id;

  // Get a Postgres client from the connection pool
  pool.connect( function (err, client, done) {
    client.query(' DELETE FROM comments WHERE user_id = $1 AND id=$2;', [user_id,commentToDelete], function(err, result){
      done();
      if(err){
        ('Error completing manage users query', err);
        res.sendStatus(501);
      } else {
        console.log("this shit worked!!!");
        res.sendStatus(233);
      }
    });
  });

});

module.exports = router;
